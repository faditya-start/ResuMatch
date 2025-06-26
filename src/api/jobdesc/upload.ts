import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db/client';
import { generateEmbedding } from '@/services/embed';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content required' });
  }

  const embedding = await generateEmbedding(content);

  const saved = await prisma.jobDescription.create({
    data: {
      userId: 'demo-user',
      title,
      content,
      embedding,
    },
  });

  return res.status(200).json({ id: saved.id });
}
