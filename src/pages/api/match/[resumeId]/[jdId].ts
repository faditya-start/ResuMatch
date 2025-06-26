import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db/client';
import { cosineSimilarity } from '@/lib/cosine';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { resumeId, jdId } = req.query;

  if (req.method !== 'POST' || typeof resumeId !== 'string' || typeof jdId !== 'string') {
    return res.status(405).end();
  }

  const resume = await prisma.resume.findUnique({ where: { id: resumeId } });
  const jobdesc = await prisma.jobDescription.findUnique({ where: { id: jdId } });

  if (!resume || !jobdesc || !resume.embedding || !jobdesc.embedding) {
    return res.status(404).json({ error: 'Data not found or incomplete' });
  }

  const score = cosineSimilarity(resume.embedding, jobdesc.embedding);

  const result = await prisma.matchResult.create({
    data: {
      resumeId,
      jobDescriptionId: jdId,
      score,
    },
  });

  return res.status(200).json({ score: result.score, id: result.id });
}
