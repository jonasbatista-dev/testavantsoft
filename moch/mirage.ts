import { createServer, Model, Factory, Response } from 'miragejs';
import { faker } from '@faker-js/faker';

type Venda = {
  data: string;
  valor: number;
};

type Cliente = {
  id: string;
  info: {
    nomeCompleto: string;
    detalhes: {
      email: string;
      nascimento: string;
    };
  };
  estatisticas: {
    vendas: Venda[];
  };
  duplicado?: {
    nomeCompleto: string;
  };
};

export function makeServer({ environment = 'development' } = {}) {
  return createServer({
    environment,

    models: {
      cliente: Model.extend<Partial<Cliente>>({}),
    },

    factories: {
      cliente: Factory.extend({
        info() {
          const nome = faker.person.fullName();
          return {
            nomeCompleto: nome,
            detalhes: {
              email: faker.internet.email(),
              nascimento: faker.date
                .birthdate({ min: 18, max: 70, mode: 'age' })
                .toISOString()
                .split('T')[0],
            },
          };
        },
        estatisticas() {
          return {
            vendas: Array.from(
              { length: faker.number.int({ min: 0, max: 5 }) },
              () => ({
                data: faker.date
                  .recent({ days: 30 })
                  .toISOString()
                  .split('T')[0],
                valor: faker.number.int({ min: 10, max: 300 }),
              }),
            ),
          };
        },
      }),
    },

    seeds(server) {
      server.create('cliente', {
        info: {
          nomeCompleto: 'Ana Beatriz',
          detalhes: { email: 'ana.b@example.com', nascimento: '1992-05-01' },
        },
        estatisticas: {
          vendas: [
            { data: '2024-01-01', valor: 150 },
            { data: '2024-01-02', valor: 50 },
          ],
        },
      });

      server.create('cliente', {
        info: {
          nomeCompleto: 'Carlos Eduardo',
          detalhes: { email: 'cadu@example.com', nascimento: '1987-08-15' },
        },
        duplicado: { nomeCompleto: 'Carlos Eduardo' },
        estatisticas: { vendas: [] },
      });
    },

    routes() {
      this.namespace = 'api';

      this.get('/clientes', (schema) => {
        const clientes = schema.all('cliente').models.map((c) => ({
          id: c.id,
          ...c.attrs,
        }));

        return {
          data: {
            clientes,
          },
          meta: {
            registroTotal: clientes.length,
            pagina: 1,
          },
          redundante: {
            status: 'ok',
          },
        };
      });

      this.post('/clientes', (schema, request) => {
        const attrs = JSON.parse(request.requestBody);
        const novo = schema.create('cliente', {
          info: {
            nomeCompleto: attrs.nomeCompleto,
            detalhes: {
              email: attrs.email,
              nascimento: attrs.nascimento,
            },
          },
          estatisticas: { vendas: [] },
        });
        return { id: novo.id, ...novo.attrs };
      });

      this.post('/vendas', (schema, request) => {
        const { clienteId, data, valor } = JSON.parse(request.requestBody);
        const cliente: any = schema.find('cliente', clienteId);

        if (!cliente) {
          return new Response(404, {}, { error: 'Cliente não encontrado' });
        }

        cliente.attrs.estatisticas.vendas.push({ data, valor });
        cliente.save();
        return { id: cliente.id, ...cliente.attrs };
      });

      this.get('/estatisticas', (schema) => {
        const clientes: any[] = schema.all('cliente').models;

        const vendasPorDia: Record<string, number> = {};
        let maiorVolume = { cliente: null as any, total: 0 };
        let maiorMedia = { cliente: null as any, media: 0 };
        let maiorFrequencia = { cliente: null as any, quantidade: 0 };

        clientes.forEach((c) => {
          const vendas = c.attrs.estatisticas.vendas;
          const total = vendas.reduce((sum, v) => sum + v.valor, 0);
          const media = vendas.length > 0 ? total / vendas.length : 0;
          const freq = vendas.length;

          vendas.forEach((v) => {
            vendasPorDia[v.data] = (vendasPorDia[v.data] || 0) + v.valor;
          });

          if (total > maiorVolume.total) {
            maiorVolume = { cliente: c.attrs.info.nomeCompleto, total };
          }

          if (media > maiorMedia.media) {
            maiorMedia = { cliente: c.attrs.info.nomeCompleto, media };
          }

          if (freq > maiorFrequencia.quantidade) {
            maiorFrequencia = {
              cliente: c.attrs.info.nomeCompleto,
              quantidade: freq,
            };
          }
        });

        return {
          vendasPorDia,
          destaques: {
            maiorVolume,
            maiorMedia,
            maiorFrequencia,
          },
        };
      });
    },
  });
}
