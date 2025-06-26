export async function generateBullets(text: string): Promise<string[]> {
    try {
      const res = await fetch('http://localhost:8000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });
  
      if (!res.ok) throw new Error();
  
      const data = await res.json();
      return data.bullets;
    } catch {
      // Fallback jika server tidak aktif
      return text
        .split('.')
        .map(line => line.trim())
        .filter(Boolean)
        .map(line => `• ${line}`);
    }
  }
  