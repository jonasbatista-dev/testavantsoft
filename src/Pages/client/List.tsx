import { typesClients } from '@/Utils/type';
import Card from '../../Components/Card';
import Content from '../../Components/Content';
import PageHeader from '../../Components/PageHeader';

import {
  Button,
  Col,
  Form,
  Input,
  Modal,
  Row,
  Skeleton,
  Typography,
  message,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { getClients, addVenda } from '@/Service/Api';
import dayjs from 'dayjs';

import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

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
      id: c?.id,
    };
  });
};

const ListClients: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currentClient, setCurrentClient] = useState<any>();

  const [clients, setClients] = useState<any[]>([]);

  const registerSales = async (submit) => {
    try {
      await addVenda(submit?.id, submit?.date, submit?.value);
      setCurrentClient(null);
      return message.success({ content: 'Venda cadastrada com sucesso!' });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const resolveClients = async () => {
      try {
        const { data } = await getClients();
        if (data?.clientes?.length) {
          const clients = normalize(data?.clientes);
          console.log(clients);
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
                const current = {
                  name: client?.nomeCompleto,
                  email: client?.email,
                  birthday: client?.nascimento,
                  id: client?.id,
                };
                return (
                  <Card
                    index={index}
                    key={index}
                    client={current}
                    onClick={() => setCurrentClient(current)}
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
          {currentClient && (
            <Modal
              onCancel={() => setCurrentClient(null)}
              open
              footer={null}
              title={currentClient?.name}
            >
              <hr />
              <br />

              <Form
                onFinish={(submit: any) => {
                  console.log(submit);
                  submit.id = currentClient?.id;
                  submit.value = Number(submit.value);
                  submit.date = dayjs(submit.date, 'DD/MM/YYYY').format(
                    'YYYY-MM-DD',
                  );
                  console.log(submit.date);
                  registerSales(submit);
                }}
                layout="vertical"
              >
                <Row gutter={16} justify={'center'}>
                  <Col span={24} md={12}>
                    <Form.Item
                      label="Valor"
                      name={'value'}
                      normalize={(value) => value.replace(/\D/g, '')}
                    >
                      <Input size="large" prefix={'R$'} />
                    </Form.Item>
                  </Col>
                  <Col span={24} md={12}>
                    <Form.Item
                      rules={[{ required: true, message: 'Campo obrigatório' }]}
                      name={'date'}
                      label="Data da venda"
                      normalize={(value: string) => {
                        if (!value) return '';

                        const onlyNums = value.replace(/\D/g, '');

                        const limited = onlyNums.slice(0, 8);

                        if (limited.length <= 2) return limited;
                        if (limited.length <= 4)
                          return `${limited.slice(0, 2)}/${limited.slice(2)}`;
                        return `${limited.slice(0, 2)}/${limited.slice(2, 4)}/${limited.slice(4)}`;
                      }}
                    >
                      <Input
                        size="large"
                        placeholder="__/__/___"
                        inputMode="numeric"
                        maxLength={10}
                      />
                    </Form.Item>
                  </Col>
                  <Col lg={12} span={24}>
                    <Button size="large" htmlType="submit" type="primary">
                      Criar Venda
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button onClick={() => setCurrentClient(null)} size="large">
                      Cancelar
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Modal>
          )}
        </Content>
      )}
    </>
  );
};

export default ListClients;
