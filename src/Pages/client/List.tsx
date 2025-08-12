import { typesClients } from '@/Utils/type';
import Card from '../../Components/Card';
import Content from '../../Components/Content';
import PageHeader from '../../Components/PageHeader';

import { App, Col, Row, Skeleton, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { api } from '@/Service/Api';

const ListTasks: React.FC = () => {
  const { message } = App.useApp();
  const [loading, setLoading] = useState(true);

  const [clients, setClients] = useState<typesClients[]>([]);

  useEffect(() => {
    api.get('/clientes').then(({ data }) => {
      setClients(data.data.clientes);
      setLoading(false);
    });
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
              {clients?.map(({ info }, index) => {
                return (
                  <Card
                    index={index}
                    key={index}
                    client={{
                      name: info?.nomeCompleto,
                      email: info?.detalhes?.email,
                      birthday: info?.detalhes?.nascimento,
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
