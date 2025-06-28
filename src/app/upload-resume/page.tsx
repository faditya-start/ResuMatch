'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return alert('Pilih file resume terlebih dahulu.');

    setLoading(true);
    const form = new FormData();
    form.append('resume', file);

    const res = await fetch('/api/resume/upload', {
      method: 'POST',
      body: form,
    });

    setLoading(false);
    if (res.ok) {
      const { id } = await res.json();
      router.push(`/resume/${id}`); // arahkan ke halaman detail resume (nanti kita buat)
    } else {
      alert('Upload gagal');
    }
  };

  return (
    <main className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Your Resume</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="file" accept=".pdf,.docx" onChange={handleFileChange} />
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {loading ? 'Uploading...' : 'Upload Resume'}
        </button>
      </form>
    </main>
  );
}
