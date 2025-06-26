import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db/client';
import { generateBullets } from '@/services/generate';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method !== 'POST' || typeof id !== 'string') {
    return res.status(405).end();
  }

  const resume = await prisma.resume.findUnique({ where: { id } });
  if (!resume) return res.status(404).json({ error: 'Resume not found' });

  const bullets = await generateBullets(resume.rawText);

  const updated = await prisma.resume.update({
    where: { id },
    data: {
      bullets: {
        create: bullets.map(b => ({ content: b })),
      },
    },
    include: { bullets: true },
  });  

  return res.status(200).json({ bullets: updated.bullets });
}
