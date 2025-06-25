// Remember to restart the TypeScript server after making changes to type declarations or tsconfig.json
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { Fields, Files } from 'formidable';
import fs from 'fs';
import pdfParse from 'pdf-parse';
import mammoth from 'mammoth';
import { prisma } from '@/db/client';

// Add custom type declarations for formidable and pdf-parse if needed

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const form = formidable({ multiples: false });

  form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
    if (err || !files.resume) return res.status(400).json({ error: 'Resume upload failed' });

    const file = Array.isArray(files.resume) ? files.resume[0] : files.resume;
    const filePath = file.filepath;

    let rawText = '';

    if (file.mimetype === 'application/pdf') {
      const buffer = fs.readFileSync(filePath);
      const data = await pdfParse(buffer);
      rawText = data.text;
    } else if (
      file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ) {
      const buffer = fs.readFileSync(filePath);
      const result = await mammoth.extractRawText({ buffer });
      rawText = result.value;
    } else {
      return res.status(415).json({ error: 'Unsupported file type' });
    }

    const saved = await prisma.resume.create({
      data: {
        userId: 'demo-user', // Ganti nanti dengan id dari session user
        rawText,
      },
    });

    return res.status(200).json({ id: saved.id });
  });
}
