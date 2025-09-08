import { nanoid } from 'nanoid';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language, title } = req.body;

  if (!code || !language || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // Simulasi penyimpanan (dalam proyek nyata gunakan database)
  const id = nanoid(8);
  const snippet = {
    id,
    code,
    language,
    title,
    createdAt: new Date().toISOString(),
  };

  // Simpan di Vercel KV atau database
  // Contoh: await kv.set(`snippet:${id}`, snippet);

  // Simulasi respons
  console.log('Snippet created:', snippet);
  
  return res.status(201).json({ id });
}
