import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "invalid credentials" });
  }

  try {
    const user = await prisma.user.findFirst({ where: { email: email } });

    console.log("-----log in--");

    if (!user) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const isPasswordValid = bcrypt.compare(password, user?.password!);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "invalid credentials" });
    }

    const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");

    return (
      // .cookie("access_token", token, {
      //   httpOnly: true,
      //   sameSite: "none",
      //   secure: process.env.NODE_ENV === "production",
      // })
      res.status(200).json({ name: user.name, email: user.email })
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error fetching users" });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    console.log("-------hit----");

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET as string);

    // .cookie("access_token", token, {
    //   httpOnly: true,
    //   sameSite: "none",
    //   secure: process.env.NODE_ENV === "production",
    // })
    res.json({ name: user.name, email: user.email });

    res.status(201).json({ name: user.name, email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users" });
  }
};

const logout = (_: Request, res: Response) => {
  res.clearCookie("access_token");
  res.status(200).json({ message: "Logout successful" });
};

const authController = { login, signUp, logout };

export default authController;
