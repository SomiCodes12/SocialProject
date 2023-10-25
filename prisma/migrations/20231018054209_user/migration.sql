/*
  Warnings:

  - You are about to drop the column `userName` on the `userModel` table. All the data in the column will be lost.
  - Added the required column `name` to the `userModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "userModel" DROP COLUMN "userName",
ADD COLUMN     "accepted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "name" TEXT NOT NULL;
