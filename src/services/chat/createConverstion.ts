import getPrismaClient from "../getPrismaClient";

const prisma = getPrismaClient();

export async function createConversation(userId1: number, userId2: number) {
  try {
    const conversation = await prisma.conversation.create({
      data: {
        users: {
          create: [
            {
              user: {
                connect: { id: userId1 },
              },
            },
            {
              user: {
                connect: { id: userId2 },
              },
            },
          ],
        },
      },
      include: {
        users: true, // Optionally include the users in the response
      },
    });

    return conversation;
  } catch (error) {
    console.error("Error creating conversation:", error);
    throw new Error("Could not create conversation.");
  }
}
