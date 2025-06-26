-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "generatedBullets" TEXT[] DEFAULT ARRAY[]::TEXT[];
