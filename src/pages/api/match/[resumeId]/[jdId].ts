import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db/client';

function cosineSimilarity(a: number[], b: number[]): number {
  const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
  const normA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
  const normB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
  return dotProduct / (normA * normB);
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { resumeId, jdId } = req.query;

  if (!resumeId || !jdId || typeof resumeId !== 'string' || typeof jdId !== 'string') {
    return res.status(400).json({ error: 'Invalid IDs' });
  }

  try {
    const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
    const jobDescription = await prisma.jobDescription.findUnique({ where: { id: jdId } });

    if (!resume || !jobDescription) {
      return res.status(404).json({ error: 'Resume or Job Description not found' });
    }

    const score = cosineSimilarity(resume.embedding as number[], jobDescription.embedding as number[]);

    const matchResult = await prisma.matchResult.create({
      data: {
        resumeId,
        jobDescriptionId: jdId,
        score,
      },
    });

    return res.status(200).json({ matchResult });
  } catch (error) {
    console.error('Match error:', error);
    return res.status(500).json({ error: 'Failed to compute match' });
  }
}
