export async function generateEmbedding(text: string): Promise<number[]> {
    try {
      const res = await fetch('http://localhost:8001/embed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
  
      if (!res.ok) throw new Error();
      const data = await res.json();
      return data.embedding;
    } catch {
      // Fallback dummy vector (384 dimensi misalnya)
      return Array(384).fill(0).map(() => Math.random());
    }
  }
  