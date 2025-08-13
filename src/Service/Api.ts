import axios from 'axios';

export const api = axios.create({
  baseURL: '/api',
});

export async function getClients() {
  const res = await api.get('/clientes');
  return res.data;
}

export async function createClient(
  nomeCompleto: string,
  email: string,
  nascimento: string,
) {
  const res = await api.post('/clientes', { nomeCompleto, email, nascimento });
  return res.data;
}

export async function addVenda(clienteId: string, data: string, valor: number) {
  const res = await api.post(`/clientes/${clienteId}/vendas`, { data, valor });
  return res.data;
}

export async function getEstatisticas() {
  const res = await api.get('/estatisticas');
  return res.data;
}

export default api;
