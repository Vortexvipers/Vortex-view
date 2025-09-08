import { nanoid } from 'nanoid';
import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { code, language, title } = req.body;

  if (!code || !language || !title) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Inisialisasi KV client
    const kv = createClient({
      url: process.env.KV_URL,
    });

    // Generate ID unik
    const id = nanoid(8);
    const snippet = {
      id,
      code,
      language,
      title,
      createdAt: new Date().toISOString(),
    };

    // Simpan di KV
    await kv.set(`snippet:${id}`, snippet);
    
    return res.status(201).json({ id });
  } catch (error) {
    console.error('Error creating snippet:', error);
    return res.status(500).json({ error: 'Failed to create snippet' });
  }
}
