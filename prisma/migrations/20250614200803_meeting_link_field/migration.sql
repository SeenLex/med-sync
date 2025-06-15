/*
  Warnings:

  - You are about to drop the column `googleMeetLink` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "googleMeetLink",
ADD COLUMN     "meetingLink" TEXT;
