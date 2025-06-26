import { NextApiRequest, NextApiResponse } from 'next';
import { pdf } from '@react-pdf/renderer';
import { ResumeDocument } from '@/components/pdf/ResumeDocument';
import { prisma } from '@/db/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid resume ID' });
  }

  try {
    const resume = await prisma.resume.findUnique({
      where: { id },
      select: {
        id: true,
        generatedBullets: true,
      },
    });

    if (!resume) {
      return res.status(404).json({ error: 'Resume not found' });
    }

    const pdfBuffer = await pdf(<ResumeDocument bullets={resume.generatedBullets} />).toBuffer();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename=resume.pdf');
    res.send(pdfBuffer);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ error: 'Failed to generate PDF' });
  }
}
