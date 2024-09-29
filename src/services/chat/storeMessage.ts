import getPrismaClient from "../getPrismaClient";

const prisma = getPrismaClient();

export async function storeMessage(
  fromMail: string,
  toMail: string,
  content: string
) {
  try {
    const conversation = await prisma.conversation.findFirst({
      where: {
        AND: [
          {
            users: {
              some: {
                user: {
                  email: fromMail,
                },
              },
            },
          },
          {
            users: {
              some: {
                user: {
                  email: toMail,
                },
              },
            },
          },
        ],
      },
    });

    if (!conversation) {
      throw new Error("Conversation not found between these users.");
    }

    const message = await prisma.message.create({
      data: {
        content,
        conversation: {
          connect: { id: conversation.id },
        },
        sender: {
          connect: { email: fromMail },
        },
      },
    });

    await prisma.conversation.update({
      where: {
        id: conversation.id,
      },
      data: {
        updatedAt: new Date(),
      },
    });

    return message;
  } catch (error) {
    console.error("Error storing message:", error);
    throw new Error("Could not store message.");
  }
}
