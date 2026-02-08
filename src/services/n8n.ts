import { http } from "./http";
import type { RelatorioPWA } from "../types/relatorio";

export async function gerarRelatorio(url: string) {
    const path = import.meta.env.VITE_N8N_GERAR_PATH as string;
    // POST /gerar-relatorio com body.url
    const { data } = await http.post(path, { url });
    return data;
}

export async function buscarRelatorios() {
    const path = import.meta.env.VITE_N8N_BUSCAR_URL_PATH as string; // mantém o mesmo env
    const { data } = await http.get<RelatorioPWA[]>(path);
    console.log("RETORNO:" + data)// sem params
    return data;
}

export async function buscarPorId(id: string) {
    const path = import.meta.env.VITE_N8N_BUSCAR_ID_PATH as string;
    // GET /buscar/id?id=...
    const { data } = await http.get<RelatorioPWA | { ok: false; message: string }>(path, {
        params: { id },
    });

    // no seu workflow, quando não encontra, volta { ok:false, message:... }
    if ((data as any)?.ok === false) return null;

    return data as RelatorioPWA;
}
