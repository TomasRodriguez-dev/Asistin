/*
  Warnings:

  - You are about to drop the column `genderId` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_genderId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "genderId",
ADD COLUMN     "idgender" INTEGER;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idgender_fkey" FOREIGN KEY ("idgender") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
