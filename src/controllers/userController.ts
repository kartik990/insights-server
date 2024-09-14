import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const prisma = new PrismaClient();

const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const getUserByID = async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const user = await prisma.user.findFirst({ where: { id: +id } });
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
  getUserByID,
  createUser,
  updateUser,
  deleteUser,
};

export default userController;
