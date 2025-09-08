export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ error: 'Missing ID' });
  }

  // Simulasi pengambilan data (dalam proyek nyata gunakan database)
  // Contoh: const snippet = await kv.get(`snippet:${id}`);
  
  // Simulasi data
  const snippet = {
    id,
    title: 'Contoh Fungsi JavaScript',
    language: 'javascript',
    code: `function greet(name) {\n  return \`Hello, \${name}!\`;\n}\n\nconsole.log(greet('World'));`,
    createdAt: new Date().toISOString(),
  };

  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' });
  }

  return res.status(200).json(snippet);
}
