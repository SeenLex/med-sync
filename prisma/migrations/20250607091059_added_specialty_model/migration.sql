/*
  Warnings:

  - You are about to drop the column `specialtyId` on the `Doctor` table. All the data in the column will be lost.
  - You are about to drop the `Specialty` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `specialization` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Doctor" DROP CONSTRAINT "Doctor_specialtyId_fkey";

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialtyId",
ADD COLUMN     "specialization" TEXT NOT NULL;

-- DropTable
DROP TABLE "Specialty";
