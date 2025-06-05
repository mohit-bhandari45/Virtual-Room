/*
  Warnings:

  - Added the required column `active` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `Room` table without a default value. This is not possible if the table is not empty.
  - Added the required column `public` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "active" BOOLEAN NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "public" BOOLEAN NOT NULL;
