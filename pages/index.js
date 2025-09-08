import { useState } from 'react';
import { useRouter } from 'next/router';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

export default function Home() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language, title }),
      });

      if (response.ok) {
        const { id } = await response.json();
        router.push(`/s/${id}`);
      } else {
        alert('Gagal membuat snippet!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan!');
    } finally {
      setLoading(false);
    }
  };

  const sampleCode = `// Contoh kode JavaScript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`;

  return (
    <div className="container">
      <h1>🚀 Code Share</h1>
      <p className="subtitle">Bagikan kode JavaScript, Node.js, dan bahasa lainnya dengan mudah</p>
      
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Judul:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: Fungsi JavaScript"
              required
            />
          </div>
          
          <div className="form-group">
            <label>Bahasa:</label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            >
              <option value="javascript">JavaScript</option>
              <option value="typescript">TypeScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="csharp">C#</option>
              <option value="php">PHP</option>
              <option value="ruby">Ruby</option>
              <option value="go">Go</option>
              <option value="rust">Rust</option>
              <option value="swift">Swift</option>
              <option value="kotlin">Kotlin</option>
              <option value="html">HTML</option>
              <option value="css">CSS</option>
              <option value="sql">SQL</option>
              <option value="json">JSON</option>
              <option value="xml">XML</option>
              <option value="yaml">YAML</option>
              <option value="bash">Bash</option>
              <option value="markdown">Markdown</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Kode:</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Tempel kode Anda di sini..."
              rows={12}
              required
            />
          </div>
          
          <button type="submit" disabled={loading}>
            {loading ? 'Membuat...' : 'Bagikan Kode'}
          </button>
        </form>
      </div>
      
      <div className="sample-section">
        <h2>Contoh Kode</h2>
        <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
          {sampleCode}
        </SyntaxHighlighter>
      </div>
      
      <footer>
        <p>Dibuat dengan Next.js & Vercel • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
    }
