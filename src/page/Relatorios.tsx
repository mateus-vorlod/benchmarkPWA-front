import { useMemo } from 'react';
import type { RelatorioPWA } from '../types/relatorio';
import './Relatorios.scss';

const MOCK_RELATORIOS: RelatorioPWA[] = [
  {
    _id: '692c7d23c9423fdc3357cd64',
    url: 'http://localhost:5173/',
    geradoEm: '2025-11-30T17:21:39.802Z',
    lighthouseVersion: '13.0.1',
    scores: {
      performance: 0.64,
      accessibility: 0.97,
      bestPractices: 1,
      seo: 0.92,
    },
    metrics: {
      firstContentfulPaint: 4666.63325,
      largestContentfulPaint: 7826.6132,
      speedIndex: 4666.63325,
      totalBlockingTime: 0,
      cumulativeLayoutShift: 0,
    },
    improvements: [
      {
        id: 'first-contentful-paint',
        title: 'First Contentful Paint',
        score: 0.13,
        displayValue: '4.7 s',
        description:
          'First Contentful Paint marks the time at which the first text or image is painted.',
      },
      {
        id: 'largest-contentful-paint',
        title: 'Largest Contentful Paint',
        score: 0.03,
        displayValue: '7.8 s',
        description:
          'Largest Contentful Paint marks the time at which the largest text or image is painted.',
      },
      {
        id: 'speed-index',
        title: 'Speed Index',
        score: 0.69,
        displayValue: '4.7 s',
        description:
          'Speed Index shows how quickly the contents of a page are visibly populated.',
      },
      {
        id: 'interactive',
        title: 'Time to Interactive',
        score: 0.44,
        displayValue: '7.8 s',
        description:
          'Time to Interactive is the amount of time it takes for the page to become fully interactive.',
      },
      {
        id: 'landmark-one-main',
        title: 'Document does not have a main landmark.',
        score: 0,
        displayValue: null,
        description:
          'One main landmark helps screen reader users navigate a web page.',
      },
      {
        id: 'robots-txt',
        title: 'robots.txt is not valid',
        score: 0,
        displayValue: '28 errors found',
        description:
          'If your robots.txt file is malformed, crawlers may not be able to understand how you want your website to be crawled or indexed.',
      },
      {
        id: 'bf-cache',
        title: 'Page prevented back/forward cache restoration',
        score: 0,
        displayValue: '1 failure reason',
        description:
          'The back/forward cache (bfcache) can speed up return navigations.',
      },
      {
        id: 'network-dependency-tree-insight',
        title: 'Network dependency tree',
        score: 0,
        displayValue: null,
        description:
          'Avoid chaining critical requests para melhorar o carregamento.',
      },
    ],
    runWarnings: [],
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
}

function formatMsToSeconds(ms: number) {
  const seconds = ms / 1000;
  return `${seconds.toFixed(1)} s`;
}

function formatScore(score: number) {
  return Math.round(score * 100);
}

function getScoreClass(score: number | null | undefined) {
  if (score === null || score === undefined) return 'score-pill score-pill--unknown';
  if (score >= 0.9) return 'score-pill score-pill--good';
  if (score >= 0.5) return 'score-pill score-pill--medium';
  return 'score-pill score-pill--bad';
}

export function RelatoriosPage() {
  // depois você troca MOCK_RELATORIOS por dados do backend
  const relatorios = MOCK_RELATORIOS;

  const ultimoRelatorio = useMemo(
    () => (relatorios.length ? relatorios[0] : null),
    [relatorios],
  );

  if (!ultimoRelatorio) {
    return (
      <main className="relatorios-page">
        <section className="relatorios-empty">
          <h1>Relatórios Lighthouse</h1>
          <p>Ainda não há relatórios salvos. Execute um benchmark para começar.</p>
        </section>
      </main>
    );
  }

  const {
    url,
    geradoEm,
    lighthouseVersion,
    scores,
    metrics,
    improvements,
  } = ultimoRelatorio;

  return (
    <main className="relatorios-page">
      {/* Cabeçalho do relatório */}
      <section className="relatorios-header section">
        <div>
          <h1>Relatórios Lighthouse</h1>
          <p className="relatorios-header__subtitle">
            Visualização dos resultados salvos a partir das execuções de benchmark.
          </p>
        </div>
        <div className="relatorios-header__info">
          <div>
            <span className="label">URL</span>
            <span className="value">{url}</span>
          </div>
          <div>
            <span className="label">Gerado em</span>
            <span className="value">{formatDate(geradoEm)}</span>
          </div>
          <div>
            <span className="label">Lighthouse</span>
            <span className="value">v{lighthouseVersion}</span>
          </div>
        </div>
      </section>

      {/* Scores principais */}
      <section className="section relatorios-scores">
        <h2>Scores por categoria</h2>
        <div className="relatorios-scores__grid">
          <div className="relatorios-scores__item">
            <span className="label">Performance</span>
            <span className={getScoreClass(scores.performance)}>
              {formatScore(scores.performance)}
            </span>
          </div>
          <div className="relatorios-scores__item">
            <span className="label">Acessibilidade</span>
            <span className={getScoreClass(scores.accessibility)}>
              {formatScore(scores.accessibility)}
            </span>
          </div>
          <div className="relatorios-scores__item">
            <span className="label">Boas práticas</span>
            <span className={getScoreClass(scores.bestPractices)}>
              {formatScore(scores.bestPractices)}
            </span>
          </div>
          <div className="relatorios-scores__item">
            <span className="label">SEO</span>
            <span className={getScoreClass(scores.seo)}>
              {formatScore(scores.seo)}
            </span>
          </div>
        </div>
      </section>

      {/* Métricas essenciais */}
      <section className="section relatorios-metrics">
        <h2>Métricas essenciais</h2>
        <div className="relatorios-metrics__grid">
          <div className="metric-card">
            <span className="metric-label">First Contentful Paint</span>
            <span className="metric-value">
              {formatMsToSeconds(metrics.firstContentfulPaint)}
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Largest Contentful Paint</span>
            <span className="metric-value">
              {formatMsToSeconds(metrics.largestContentfulPaint)}
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Speed Index</span>
            <span className="metric-value">
              {formatMsToSeconds(metrics.speedIndex)}
            </span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Total Blocking Time</span>
            <span className="metric-value">{metrics.totalBlockingTime} ms</span>
          </div>
          <div className="metric-card">
            <span className="metric-label">Cumulative Layout Shift</span>
            <span className="metric-value">{metrics.cumulativeLayoutShift}</span>
          </div>
        </div>
      </section>

      {/* Tabela de melhorias */}
      <section className="section relatorios-improvements">
        <h2>Pontos de melhoria</h2>
        <p className="relatorios-improvements__hint">
          Itens com menor score representam oportunidades mais relevantes de otimização.
        </p>
        <div className="relatorios-improvements__table-wrapper">
          <table className="relatorios-improvements__table">
            <thead>
              <tr>
                <th>Auditoria</th>
                <th>Score</th>
                <th>Valor</th>
                <th>Descrição</th>
              </tr>
            </thead>
            <tbody>
              {improvements.map((imp) => (
                <tr key={imp.id}>
                  <td className="imp-title">{imp.title}</td>
                  <td>
                    {imp.score !== null ? (
                      <span className={getScoreClass(imp.score)}>
                        {formatScore(imp.score)}
                      </span>
                    ) : (
                      <span className="score-pill score-pill--unknown">—</span>
                    )}
                  </td>
                  <td className="imp-value">{imp.displayValue ?? '—'}</td>
                  <td className="imp-description">{imp.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
