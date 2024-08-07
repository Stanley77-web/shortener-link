/*
  Warnings:

  - You are about to drop the column `long_url` on the `url_shortener` table. All the data in the column will be lost.
  - You are about to drop the column `short_url` on the `url_shortener` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[short_id]` on the table `url_shortener` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `short_id` to the `url_shortener` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `url_shortener` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "url_shortener_short_url_key";

-- AlterTable
ALTER TABLE "url_shortener" DROP COLUMN "long_url",
DROP COLUMN "short_url",
ADD COLUMN     "number_of_visits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "short_id" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "url_shortener_short_id_key" ON "url_shortener"("short_id");
