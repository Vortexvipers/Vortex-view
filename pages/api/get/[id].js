import { createClient } from '@vercel/kv';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  try {
    // Inisialisasi KV client
    const kv = createClient({
      url: process.env.KV_URL,
    });

    // Ambil data dari KV
    const snippet = await kv.get(`snippet:${id}`);

    if (!snippet) {
      return res.status(404).json({ error: 'Snippet not found' });
    }

    return res.status(200).json(snippet);
  } catch (error) {
    console.error('Error fetching snippet:', error);
    return res.status(500).json({ error: 'Failed to fetch snippet' });
  }
}
