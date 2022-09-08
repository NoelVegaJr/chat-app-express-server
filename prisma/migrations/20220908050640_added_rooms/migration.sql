/*
  Warnings:

  - The primary key for the `Namespace` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Namespace` table. All the data in the column will be lost.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Room` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_namespaceId_fkey";

-- AlterTable
ALTER TABLE "Namespace" DROP CONSTRAINT "Namespace_pkey",
DROP COLUMN "id",
ADD COLUMN     "namespaceId" SERIAL NOT NULL,
ADD CONSTRAINT "Namespace_pkey" PRIMARY KEY ("namespaceId");

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "id",
ADD COLUMN     "roomId" SERIAL NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("roomId");

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_namespaceId_fkey" FOREIGN KEY ("namespaceId") REFERENCES "Namespace"("namespaceId") ON DELETE RESTRICT ON UPDATE CASCADE;
