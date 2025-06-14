/*
  Warnings:

  - You are about to drop the column `specialization` on the `Doctor` table. All the data in the column will be lost.
  - Added the required column `specialtyId` to the `Doctor` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialization",
ADD COLUMN     "specialtyId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Specialty" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Specialty_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Specialty_name_key" ON "Specialty"("name");

-- AddForeignKey
ALTER TABLE "Doctor" ADD CONSTRAINT "Doctor_specialtyId_fkey" FOREIGN KEY ("specialtyId") REFERENCES "Specialty"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
