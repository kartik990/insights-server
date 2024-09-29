import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            profileUrl: true,
          },
        },
        postInteractions: {
          select: {
            liked: true,
            userId: true,
          },
        },
      },
    });
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getPostById = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const post = await prisma.post.findFirst({
      where: {
        id: +id,
      },
    });

    res.json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error creating user" });
  }
};

const createPost = async (req: Request, res: Response) => {
  try {
    const post = await prisma.post.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        imgUrl: req.body.imgUrl,
        user: {
          connect: {
            id: req.body.userId,
          },
        },
      },
    });

    console.log(post);
    res.status(201).json({ data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const updatePost = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.body);

  try {
    const post = await prisma.post.update({
      where: { id: +id },
      data: req.body,
    });
    console.log(post);
    res.status(204).json({ data: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const postInteraction = async (req: Request, res: Response) => {
  const {
    postId,
    userId,
    type,
  }: { postId: string; userId: string; type: string } = req.body;

  try {
    const interaction = await prisma.postInteraction.upsert({
      where: {
        userId_postId: {
          postId: +postId,
          userId: +userId,
        },
      },
      update: {
        liked: type == "like",
      },
      create: {
        liked: type == "like",
        user: {
          connect: {
            id: +userId,
          },
        },
        post: {
          connect: {
            id: +postId,
          },
        },
      },
    });

    console.log(interaction);
    res.status(204).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const addComment = async (req: Request, res: Response) => {
  const {
    postId,
    userId,
    comment: text,
  } = req.body as { postId: string; userId: string; comment: string };

  console.log(req.body);

  try {
    const comment = await prisma.comment.create({
      data: {
        post: {
          connect: {
            id: +postId,
          },
        },
        user: {
          connect: {
            id: +userId,
          },
        },
        text: text,
      },
    });

    console.log(comment);
    res.status(201).json({ success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const getComments = async (req: Request, res: Response) => {
  const postId = req.params.id;
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId: +postId,
      },
      select: {
        text: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            profileUrl: true,
          },
        },
      },
    });
    console.log(comments);
    res.status(200).json({ comments });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const postController = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  postInteraction,
  getComments,
  addComment,
};

export default postController;
