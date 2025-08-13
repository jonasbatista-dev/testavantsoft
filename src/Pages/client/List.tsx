import { typesClients } from '@/Utils/type';
import Card from '../../Components/Card';
import Content from '../../Components/Content';
import PageHeader from '../../Components/PageHeader';

import { App, Col, Row, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { getClients } from '@/Service/Api';

const normalize = (clients: typesClients[]) => {
  return clients?.map((c) => {
    const nome =
      c.info?.nomeCompleto || c.duplicado?.nomeCompleto || 'Nome não informado';

    const email = c.info?.detalhes?.email || 'Sem e-mail';
    const nascimento = c.info?.detalhes?.nascimento || '';
    const vendas = c.estatisticas?.vendas || [];

    return {
      nomeCompleto: nome,
      email,
      nascimento,
      vendas,
    };
  });
};

const ListTasks: React.FC = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState<any[]>([]);

  useEffect(() => {
    const resolveClients = async () => {
      try {
        const { data } = await getClients();
        if (data?.clientes?.length) {
          const clients = normalize(data?.clientes);
          setClients(clients);
        }
        setLoading(false);
      } catch (error) {
        message.error({ content: 'Algo deu errado!' });
      }
    };

    resolveClients();
  }, []);

  return (
    <>
      <PageHeader title="Lista de Clientes" />

      {loading ? (
        <Content>
          <Skeleton />
        </Content>
      ) : (
        <Content type="transparent">
          {clients?.length ? (
            <>
              {clients?.map((client, index) => {
                return (
                  <Card
                    index={index}
                    key={index}
                    client={{
                      name: client?.nomeCompleto,
                      email: client?.email,
                      birthday: client?.nascimento,
                      id: '',
                    }}
                  />
                );
              })}
            </>
          ) : (
            <div className="card">
              <Row>
                <Col>
                  <Typography.Text>Nada encontrado...</Typography.Text>
                </Col>
              </Row>
            </div>
          )}
        </Content>
      )}
    </>
  );
};

export default ListTasks;
