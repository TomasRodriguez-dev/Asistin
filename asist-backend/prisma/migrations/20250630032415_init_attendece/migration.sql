-- AlterTable
ALTER TABLE "User" ADD COLUMN     "idrole" INTEGER;

-- CreateTable
CREATE TABLE "Role" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Subject" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Subject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClassSchedule" (
    "id" SERIAL NOT NULL,
    "dayOfWeek" INTEGER NOT NULL,
    "startTime" TEXT NOT NULL,
    "endTime" TEXT NOT NULL,
    "idsubject" INTEGER NOT NULL,
    "idlocation" INTEGER NOT NULL,

    CONSTRAINT "ClassSchedule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ValidLocation" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "radius" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "ValidLocation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectProfessor" (
    "id" SERIAL NOT NULL,
    "idsubject" INTEGER NOT NULL,
    "idprofessor" INTEGER NOT NULL,

    CONSTRAINT "SubjectProfessor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SubjectStudent" (
    "id" SERIAL NOT NULL,
    "idsubject" INTEGER NOT NULL,
    "idstudent" INTEGER NOT NULL,

    CONSTRAINT "SubjectStudent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" SERIAL NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "time" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "photoUrl" TEXT NOT NULL,
    "inRange" BOOLEAN NOT NULL,
    "inTime" BOOLEAN NOT NULL,
    "iduser" INTEGER NOT NULL,
    "idsubject" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Attendance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectProfessor_idsubject_idprofessor_key" ON "SubjectProfessor"("idsubject", "idprofessor");

-- CreateIndex
CREATE UNIQUE INDEX "SubjectStudent_idsubject_idstudent_key" ON "SubjectStudent"("idsubject", "idstudent");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_iduser_idsubject_date_key" ON "Attendance"("iduser", "idsubject", "date");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_idrole_fkey" FOREIGN KEY ("idrole") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_idsubject_fkey" FOREIGN KEY ("idsubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClassSchedule" ADD CONSTRAINT "ClassSchedule_idlocation_fkey" FOREIGN KEY ("idlocation") REFERENCES "ValidLocation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectProfessor" ADD CONSTRAINT "SubjectProfessor_idsubject_fkey" FOREIGN KEY ("idsubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectProfessor" ADD CONSTRAINT "SubjectProfessor_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectStudent" ADD CONSTRAINT "SubjectStudent_idsubject_fkey" FOREIGN KEY ("idsubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SubjectStudent" ADD CONSTRAINT "SubjectStudent_idstudent_fkey" FOREIGN KEY ("idstudent") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_iduser_fkey" FOREIGN KEY ("iduser") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Attendance" ADD CONSTRAINT "Attendance_idsubject_fkey" FOREIGN KEY ("idsubject") REFERENCES "Subject"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
