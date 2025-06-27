import { prisma } from '@/db/client';
import Link from 'next/link';

export default async function MatchesPage() {
  const matches = await prisma.matchResult.findMany({
    include: {
      Resume: true,
      JobDescription: true,
    },
    orderBy: { createdAt: 'desc' },
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Match Results</h1>
      <div className="space-y-4">
        {matches.map((match) => (
          <div
            key={match.id}
            className="border p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-start md:items-center"
          >
            <div>
              <p className="text-lg font-medium">
                Resume: <span className="text-blue-600">{match.Resume.id}</span>
              </p>
              <p className="text-sm text-gray-500">
                Job: <span className="text-green-600">{match.JobDescription.id}</span>
              </p>
            </div>
            <div className="mt-2 md:mt-0">
              <p className="text-sm">Score: <span className="font-semibold">{match.score.toFixed(2)}</span></p>
              <Link href={`/dashboard/matches/${match.id}`} className="text-blue-500 underline mt-2 block">
                Detail
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
