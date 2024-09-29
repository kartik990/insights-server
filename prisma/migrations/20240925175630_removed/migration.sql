/*
  Warnings:

  - You are about to drop the column `downLikes` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `upLikes` on the `Post` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "downLikes",
DROP COLUMN "upLikes";
