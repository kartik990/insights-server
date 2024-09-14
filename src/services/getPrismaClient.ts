import { PrismaClient } from "@prisma/client";

let prisma: PrismaClient;

const getPrismaClient = () => {
  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }
  return prisma;
};

export default getPrismaClient;
