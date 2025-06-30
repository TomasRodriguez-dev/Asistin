/*
  Warnings:

  - A unique constraint covering the columns `[iduser,idsubject,date,type]` on the table `Attendance` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Attendance_iduser_idsubject_date_key";

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_iduser_idsubject_date_type_key" ON "Attendance"("iduser", "idsubject", "date", "type");
