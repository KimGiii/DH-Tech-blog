/*
  Warnings:

  - You are about to drop the `PostReaction` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PostReaction` DROP FOREIGN KEY `PostReaction_postId_fkey`;

-- DropForeignKey
ALTER TABLE `PostReaction` DROP FOREIGN KEY `PostReaction_userId_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `dislikeCount` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `likeCount` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `PostReaction`;
