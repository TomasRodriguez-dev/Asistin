/*
  Warnings:

  - You are about to drop the column `gender` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "genderId" INTEGER;

-- DropEnum
DROP TYPE "Gender";

-- CreateTable
CREATE TABLE "Gender" (
    "id" SERIAL NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Gender_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_genderId_fkey" FOREIGN KEY ("genderId") REFERENCES "Gender"("id") ON DELETE SET NULL ON UPDATE CASCADE;
