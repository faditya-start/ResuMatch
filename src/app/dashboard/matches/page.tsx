// src/app/dashboard/matches/page.tsx
import { prisma } from '@/db/client';

export default async function MatchDashboard() {
  const results = await prisma.matchResult.findMany({
    include: {
      Resume: true,
      JobDescription: true,
    },
    orderBy: { score: 'desc' },
  });

  return (
    <main className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Match Results</h1>
      <div className="space-y-4">
        {results.map((result) => (
          <div key={result.id} className="border p-4 rounded shadow">
            <h2 className="text-lg font-semibold">
              {result.JobDescription.title} — {result.Resume.userId}
            </h2>
            <p className="text-gray-600">Score: {(result.score * 100).toFixed(2)}%</p>
          </div>
        ))}
      </div>
    </main>
  );
}
