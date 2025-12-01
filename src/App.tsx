import './App.scss';

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <div className="logo">
          <span className="logo-badge">PWA</span>
          <span className="logo-text">React PWA Starter</span>
        </div>
      </header>

      <main className="app-main">
        {/* HERO SIMPLES */}
        <section className="hero">
          <div className="hero-text">
            <h1>Seu ponto de partida para PWAs com React</h1>
            <p className="hero-subtitle">
              Use este projeto para criar, testar e estudar Progressive Web Apps,
              desde o básico de instalação até testes com Lighthouse.
            </p>

            <div className="hero-actions">
              <button
                className="btn primary"
                onClick={() =>
                  window.alert('Aqui você pode integrar a ação de rodar o Lighthouse / benchmark.')
                }
              >
                Rodar benchmark
              </button>

              <button
                className="btn secondary"
                onClick={() =>
                  document
                    .getElementById('como-testar')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                Como testar como PWA
              </button>
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

        {/* SEÇÃO PASSOS BEM OBJETIVA */}
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
          Feito com <span className="heart">♥</span> em Vite + React
        </span>
      </footer>
    </div>
  );
}

export default App;
