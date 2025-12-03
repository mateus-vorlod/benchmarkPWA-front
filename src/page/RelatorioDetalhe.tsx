import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { RELATORIOS_MOCK } from '../data/relatoriosMock';
import type { RelatorioPWA } from '../types/relatorio';
import './Relatorios.scss';

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

export function RelatorioDetalhePage() {
  const { id } = useParams<{ id: string }>();

  const relatorio = useMemo<RelatorioPWA | undefined>(
    () => RELATORIOS_MOCK.find((r) => r._id === id),
    [id],
  );

  if (!relatorio) {
    return (
      <main className="relatorios-page">
        <section className="relatorios-empty">
          <h1>Relatório não encontrado</h1>
          <p>Verifique o link ou selecione um relatório na lista.</p>
          <Link to="/relatorios" className="relatorios-list__link">
            Voltar para lista
          </Link>
        </section>
      </main>
    );
  }

  const { url, geradoEm, lighthouseVersion, scores, metrics, improvements } = relatorio;

  return (
    <main className="relatorios-page">
      <section className="section relatorios-header">
        <div className="relatorios-header__top">
          <div>
            <h1>Detalhes do relatório</h1>
            <p className="relatorios-header__subtitle">
              Resultados detalhados da execução do Lighthouse.
            </p>
          </div>
          <Link to="/relatorios" className="relatorios-list__link relatorios-header__back">
            ← Voltar para lista
          </Link>
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
