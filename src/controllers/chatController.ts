import { Request, Response } from "express";
import { createConversation } from "../services/chat/createConverstion";
import getPrismaClient from "../services/getPrismaClient";

const prisma = getPrismaClient();

const createChatRoom = async (req: Request, res: Response) => {
  const { email1, email2 } = req.body;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [{ email: email1 }, { email: email2 }],
      },
    });

    await createConversation(users[0].id, users[1].id);

    res.json({ message: "created" });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
};

const getChatRooms = async (req: Request, res: Response) => {
  const id = req.params.id;

  const conversations = await prisma.conversation.findMany({
    where: {
      users: {
        some: {
          user: {
            id: +id,
          },
        },
      },
    },
    orderBy: {
      updatedAt: "asc",
    },
    select: {
      id: true,
      updatedAt: true,
      users: {
        select: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              profileUrl: true,
            },
          },
        },
      },
    },
  });

  res.json({ chats: conversations });
};

const getOldMessages = async (req: Request, res: Response) => {
  const conversationId = req.params.id;
  const { page, size }: { page?: number; size?: number } = req.query;

  try {
    const conversation = await prisma.conversation.findUnique({
      where: {
        id: +conversationId,
      },

      select: {
        _count: {
          select: { messages: true },
        },

        messages: {
          select: {
            content: true,
            senderId: true,
          },
          skip: ((page || 1) - 1) * 20,
          take: size || 20,
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });

    res.json({
      metaData: {
        page: page || 1,
        totalMessages: conversation?._count.messages,
        pageSize: size || 20,
      },
      messages: conversation?.messages,
    });
  } catch (err) {
    console.log(err);
    res.json({ message: "something went wrong" });
  }
};

const chatController = {
  createChatRoom,
  getChatRooms,
  getOldMessages,
};

export default chatController;
