import { Request, Response } from "express";
import getPrismaClient from "../services/getPrismaClient";

const prisma = getPrismaClient();

const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        profileUrl: true,
        coverUrl: true,
      },
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserById = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.findFirst({
      where: { id: +id },
      select: {
        name: true,
        email: true,
        about: true,
        coverUrl: true,
        profileUrl: true,
        posts: {
          select: {
            id: true,
            comments: true,
            postInteractions: true,
            imgUrl: true,
            content: true,
            title: true,
            createdAt: true,
          },
        },
      },
    });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await prisma.user.create({
      data: req.body,
    });

    console.log(user);
    res.status(201).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.id;
  console.log(req.body);

  try {
    const user = await prisma.user.update({
      where: { id: +id },
      data: req.body,
    });
    console.log(user);
    res.status(204).json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const user = await prisma.user.delete({ where: { id: +id } });
    console.log(user);
    res.status(204).json({ message: "Delete Successful!" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Something Went Wrong!" });
  }
};

const userController = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
