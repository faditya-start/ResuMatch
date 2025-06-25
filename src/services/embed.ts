export async function generateEmbedding(text: string): Promise<number[]> {
  const res = await fetch('http://localhost:8001/embed', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
  });

  if (!res.ok) {
    throw new Error('Failed to generate embedding');
  }

  const data = await res.json();
  return data.embedding;
}
