/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "contactNumber",
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profileImage" TEXT;
