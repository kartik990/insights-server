import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

export const getPosts = async (_: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({});
    res.json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching users" });
  }
};

export const getPostById = async (req: Request, res: Response) => {
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

const postController = {
  getPosts,
  getPostById,
};

export default postController;
