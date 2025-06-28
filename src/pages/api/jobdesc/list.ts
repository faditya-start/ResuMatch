import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/db/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }
  const list = await prisma.jobDescription.findMany({ orderBy: { createdAt: 'desc' } });
  res.status(200).json(list);
}
