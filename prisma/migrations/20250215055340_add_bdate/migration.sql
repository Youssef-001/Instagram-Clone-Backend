/*
  Warnings:

  - Added the required column `bdate` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "bdate" TIMESTAMP(3) NOT NULL;
