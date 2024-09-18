/*
  Warnings:

  - You are about to drop the `_UserChats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `chat` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `message` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `_UserChats` DROP FOREIGN KEY `_UserChats_A_fkey`;

-- DropForeignKey
ALTER TABLE `_UserChats` DROP FOREIGN KEY `_UserChats_B_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_chatId_fkey`;

-- DropForeignKey
ALTER TABLE `message` DROP FOREIGN KEY `message_senderId_fkey`;

-- DropTable
DROP TABLE `_UserChats`;

-- DropTable
DROP TABLE `chat`;

-- DropTable
DROP TABLE `message`;
