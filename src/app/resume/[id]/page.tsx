'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function ResumeDetailPage() {
  const params = useParams();
  const idParam = params?.id;
  const id = Array.isArray(idParam) ? idParam[0] : idParam;
  const router = useRouter();

  const [rawText, setRawText] = useState<string>('');
  const [bullets, setBullets] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/resume/${id}`)
      .then((res) => res.json())
      .then((data) => setRawText(data.rawText))
      .catch(() => setRawText('Error loading resume'));
  }, [id]);

  const handleGenerate = async () => {
    if (!id) return;
    setLoading(true);
    const res = await fetch(`/api/resume/${id}/generate`, { method: 'POST' });
    setLoading(false);
    if (res.ok) {
      const { bullets } = await res.json();
      setBullets(bullets);
    } else {
      alert('Generate bullets gagal');
    }
  };

  if (!id) {
    return <p className="p-6">Invalid resume ID.</p>;
  }

  return (
    <main className="max-w-2xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Resume Detail</h1>

      <section>
        <h2 className="font-semibold mb-2">Raw Text</h2>
        <pre className="bg-gray-100 p-4 rounded whitespace-pre-wrap text-sm">{rawText}</pre>
      </section>

      <button
        onClick={handleGenerate}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {loading ? 'Generating...' : 'Generate Bullets'}
      </button>

      {bullets.length > 0 && (
        <section>
          <h2 className="font-semibold mb-2">Generated Bullets</h2>
          <ul className="list-disc list-inside space-y-1">
            {bullets.map((b, i) => (
              <li key={i}>{b}</li>
            ))}
          </ul>
        </section>
      )}
    </main>
  );
}
