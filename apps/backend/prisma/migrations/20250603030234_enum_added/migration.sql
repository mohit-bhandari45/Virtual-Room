/*
  Warnings:

  - The `role` column on the `RoomParticipant` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "ParticipantRole" AS ENUM ('owner', 'member', 'moderator');

-- AlterTable
ALTER TABLE "RoomParticipant" DROP COLUMN "role",
ADD COLUMN     "role" "ParticipantRole" NOT NULL DEFAULT 'member';
