import { Link } from 'react-router-dom';
import { RELATORIOS_MOCK } from '../data/relatoriosMock';
import type { RelatorioPWA } from '../types/relatorio';
import './Relatorios.scss';

function formatDate(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  });
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

export function RelatoriosListPage() {
  // depois: buscar da API e ordenar por data desc
  const relatorios: RelatorioPWA[] = [...RELATORIOS_MOCK].sort(
    (a, b) => new Date(b.geradoEm).getTime() - new Date(a.geradoEm).getTime(),
  );

  if (!relatorios.length) {
    return (
      <main className="relatorios-page">
        <section className="relatorios-empty">
          <h1>Relatórios Lighthouse</h1>
          <p>Ainda não há relatórios salvos. Execute um benchmark para começar.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="relatorios-page">
      <section className="section relatorios-list">
        <div className="relatorios-list__header">
          <div>
            <h1>Relatórios Lighthouse</h1>
            <p className="relatorios-list__subtitle">
              Histórico de execuções de benchmark com Lighthouse.
            </p>
          </div>
        </div>

        <div className="relatorios-list__table-wrapper">
          <table className="relatorios-list__table">
            <thead>
              <tr>
                <th>Data</th>
                <th>URL</th>
                <th>Performance</th>
                <th>Acessibilidade</th>
                <th>Boas práticas</th>
                <th>SEO</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {relatorios.map((relatorio) => (
                <tr key={relatorio._id}>
                  <td className="col-data">{formatDate(relatorio.geradoEm)}</td>
                  <td className="col-url">{relatorio.url}</td>
                  <td>
                    <span className={getScoreClass(relatorio.scores.performance)}>
                      {formatScore(relatorio.scores.performance)}
                    </span>
                  </td>
                  <td>
                    <span className={getScoreClass(relatorio.scores.accessibility)}>
                      {formatScore(relatorio.scores.accessibility)}
                    </span>
                  </td>
                  <td>
                    <span className={getScoreClass(relatorio.scores.bestPractices)}>
                      {formatScore(relatorio.scores.bestPractices)}
                    </span>
                  </td>
                  <td>
                    <span className={getScoreClass(relatorio.scores.seo)}>
                      {formatScore(relatorio.scores.seo)}
                    </span>
                  </td>
                  <td className="col-acao">
                    <Link
                      to={`/relatorios/${relatorio._id}`}
                      className="relatorios-list__link"
                    >
                      Ver detalhes
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
