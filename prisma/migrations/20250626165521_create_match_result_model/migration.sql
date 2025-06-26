-- AlterTable
ALTER TABLE "Resume" ADD COLUMN     "embedding" DOUBLE PRECISION[];

-- CreateTable
CREATE TABLE "MatchResult" (
    "id" TEXT NOT NULL,
    "resumeId" TEXT NOT NULL,
    "jobDescriptionId" TEXT NOT NULL,
    "score" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_resumeId_fkey" FOREIGN KEY ("resumeId") REFERENCES "Resume"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_jobDescriptionId_fkey" FOREIGN KEY ("jobDescriptionId") REFERENCES "JobDescription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
