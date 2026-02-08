import axios from "axios";

export const http = axios.create({
    baseURL: import.meta.env.VITE_N8N_BASE_URL,
    timeout: 120_000,
    headers: { "Content-Type": "application/json" },
});
