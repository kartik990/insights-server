import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const func = async () => {
  await prisma.user.create({
    data: {
      email: "mmmkartsdvsdik99@gmddail.com",
      name: "mmmm",
      password: "password",
    },
  });

  await prisma.user.findMany({});
};

func();

// db
// orm types schema etc
// server resolver and functions
// routing graphql
