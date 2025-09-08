import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function SnippetPage() {
  const [snippet, setSnippet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (!id) return;

    const fetchSnippet = async () => {
      try {
        const response = await fetch(`/api/get/${id}`);
        
        if (response.ok) {
          const data = await response.json();
          setSnippet(data);
        } else {
          setError('Snippet tidak ditemukan');
        }
      } catch (err) {
        console.error('Error fetching snippet:', err);
        setError('Gagal memuat snippet');
      } finally {
        setLoading(false);
      }
    };

    fetchSnippet();
  }, [id]);

  if (loading) return <div className="container">Memuat...</div>;
  if (error) return <div className="container error">{error}</div>;
  if (!snippet) return <div className="container">Snippet tidak ditemukan</div>;

  return (
    <div className="container">
      <div className="snippet-header">
        <h1>{snippet.title}</h1>
        <div className="meta">
          <span className="language">{snippet.language}</span>
          <span className="date">{new Date(snippet.createdAt).toLocaleString()}</span>
        </div>
      </div>
      
      <div className="code-container">
        <SyntaxHighlighter 
          language={snippet.language} 
          style={vscDarkPlus}
          showLineNumbers
          wrapLines
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>
      
      <div className="actions">
        <button onClick={() => navigator.clipboard.writeText(snippet.code)}>
          Salin Kode
        </button>
        <button onClick={() => window.open(`https://github.com`, '_blank')}>
          Buka di GitHub
        </button>
      </div>
      
      <footer>
        <p>Dibuat dengan Next.js & Vercel • {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
    }
