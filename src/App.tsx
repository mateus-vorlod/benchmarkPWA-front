import './App.scss';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { http } from './services/http';

function App() {
  const navigate = useNavigate();

  const [url, setUrl] = useState('https://google.com');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function rodarBenchmark() {
    const value = url.trim();

    if (!value) {
      setError('Informe uma URL.');
      setMsg(null);
      return;
    }

    setLoading(true);
    setError(null);
    setMsg(null);

    try {
      await http.post('/webhook/gerar-relatorio', { url: value });

      // Se chegou aqui sem exception, deu certo
      setMsg('Relatório gerado com sucesso!');
    } catch (e: any) {
      setError('Erro ao executar o benchmark. Verifique a URL ou o serviço.');
    } finally {
      setLoading(false);
    }
  }

  return (
      <div className="app">
        <header className="app-header">
          <div className="logo">
            <span className="logo-badge">PWA</span>
            <span className="logo-text">React PWA Starter</span>
          </div>
        </header>

        <main className="app-main">
          <section className="hero">
            <div className="hero-text">
              <h1>Seu ponto de partida para PWAs com React</h1>
              <p className="hero-subtitle">
                Use este projeto para criar, testar e estudar Progressive Web Apps,
                desde o básico de instalação até testes com Lighthouse.
              </p>

              {/* NOVO: campo de URL + botão */}
              <div className="hero-actions" style={{ alignItems: 'flex-start' }}>
                <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                  <input
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://google.com"
                      style={{
                        minWidth: 320,
                        padding: '10px 12px',
                        borderRadius: 10,
                        border: '1px solid rgba(255,255,255,0.15)',
                        background: 'rgba(255,255,255,0.06)',
                        color: 'inherit',
                        outline: 'none',
                      }}
                  />

                  <button className="btn primary" onClick={rodarBenchmark} disabled={loading}>
                    {loading ? 'Gerando...' : 'Rodar benchmark'}
                  </button>

                  <button className="btn secondary" onClick={() => navigate('/relatorios')}>
                    Relatórios
                  </button>
                </div>

                {(msg || error) && (
                    <div style={{ marginTop: 10 }}>
                      {msg && <div style={{ opacity: 0.9 }}>{msg}</div>}
                      {error && <div style={{ opacity: 0.9 }}>{error}</div>}
                    </div>
                )}
              </div>
            </div>

            <div className="hero-card">
              <h2>Status do PWA</h2>
              <ul>
                <li>
                  <span>Manifest</span>
                  <strong>OK</strong>
                </li>
                <li>
                  <span>Service worker</span>
                  <strong>Ativo</strong>
                </li>
                <li>
                  <span>Instalação</span>
                  <strong>Disponível</strong>
                </li>
              </ul>
            </div>
          </section>

          <section id="como-testar" className="section">
            <h2>Como testar este app como PWA</h2>
            <ol className="steps">
              <li>
                Rode <code>npm run build</code> e depois <code>npm run preview</code>.
              </li>
              <li>Acesse a URL de preview (ex.: <code>http://localhost:4173</code>).</li>
              <li>
                No Chrome DevTools, vá em <strong>Application &gt; Manifest</strong>.
              </li>
              <li>
                Verifique se o app está marcado como <strong>Installable</strong>.
              </li>
              <li>
                Use a aba <strong>Lighthouse</strong> para gerar o relatório.
              </li>
            </ol>
          </section>
        </main>

        <footer className="app-footer">
          <span>React PWA Starter</span>
          <span>
          Feito com Vite + React
        </span>
        </footer>
      </div>
  );
}

export default App;
