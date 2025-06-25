export async function generateBullets(text: string): Promise<string[]> {
    const res = await fetch('http://localhost:8000/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });
  
    if (!res.ok) {
      throw new Error('Failed to generate bullets');
    }
  
    const data = await res.json();
    return data.bullets;
  }
  