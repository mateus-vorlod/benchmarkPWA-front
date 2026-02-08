import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { RelatorioPWA } from '../types/relatorio';
import { http } from '../services/http';
import './Relatorios.scss';

type BuscarRelatoriosResponse = {
  ok: boolean;
  total: number;
  data: RelatorioPWA[];
};

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
  const [relatorios, setRelatorios] = useState<RelatorioPWA[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  useEffect(() => {
    async function carregar() {
      try {
        const { data } = await http.get<BuscarRelatoriosResponse>(
            import.meta.env.VITE_N8N_BUSCAR_URL_PATH,
        );

        if (!data?.ok) {
          throw new Error('Resposta inválida do servidor ao buscar relatórios.');
        }

        setTotal(data.total ?? (data.data?.length ?? 0));

        const ordenado = [...(data.data ?? [])].sort(
            (a, b) => new Date(b.geradoEm).getTime() - new Date(a.geradoEm).getTime(),
        );

        setRelatorios(ordenado);
      } catch (e: any) {
        setErro(e?.message ?? 'Erro ao buscar relatórios');
      } finally {
        setLoading(false);
      }
    }

    carregar();
  }, []);

  if (loading) {
    return (
        <main className="relatorios-page">
          <section className="relatorios-empty">
            <h1>Relatórios Lighthouse</h1>
            <p>Carregando relatórios...</p>
          </section>
        </main>
    );
  }

  if (erro) {
    return (
        <main className="relatorios-page">
          <section className="relatorios-empty">
            <h1>Relatórios Lighthouse</h1>
            <p>{erro}</p>
          </section>
        </main>
    );
  }

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
                Histórico de execuções de benchmark com Lighthouse. Total: {total}
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
                      <Link to={`/relatorios/${relatorio._id}`} className="relatorios-list__link">
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
