import getPrismaClient from "../getPrismaClient";

const prisma = getPrismaClient();

export async function storeMessage(
  conversationId: string,
  senderId: number,
  content: string
) {
  try {
    // Create a new message
    const message = await prisma.message.create({
      data: {
        content,
        conversation: {
          connect: { id: conversationId },
        },
        sender: {
          connect: { id: senderId },
        },
      },
    });

    return message;
  } catch (error) {
    console.error("Error storing message:", error);
    throw new Error("Could not store message.");
  }
}
