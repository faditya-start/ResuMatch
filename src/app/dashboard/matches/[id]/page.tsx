import { prisma } from '@/db/client';
import { notFound } from 'next/navigation';

interface MatchDetailPageProps {
  params: { id: string };
}

export default async function MatchDetailPage({ params }: MatchDetailPageProps) {
  const match = await prisma.matchResult.findUnique({
    where: { id: params.id },
    include: {
      Resume: true,
      JobDescription: true,
    },
  });

  if (!match) return notFound();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Match Detail</h1>

      <div className="mb-6">
        <p className="text-sm text-gray-500">Score:</p>
        <p className="text-xl font-semibold">{match.score.toFixed(2)}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-bold mb-2">Resume</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
            {match.Resume.rawText}
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-bold mb-2">Job Description</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
            {match.JobDescription.content}
          </pre>
        </div>
      </div>
    </div>
  );
}
