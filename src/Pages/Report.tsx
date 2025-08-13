import ChartCard from '@/Components/Chart/CardChart';
import Chart from '../Components/Chart';
import Content from '../Components/Content';
import PageHeader from '../Components/PageHeader';
import { getEstatisticas } from '@/Service/Api';

import { App, Col, Empty, Row, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';

const Report: React.FC = () => {
  const [data, setData] = useState<any>();
  const [loading, setLoading] = useState<any>(true);

  const { message } = App.useApp();

  const handleData = () => {
    getEstatisticas()
      .then((resp: any) => {
        console.log(resp);
        setData(resp);
        setLoading(false);
      })
      .catch(() => message.error({ content: 'Houve um erro inesperado.' }));
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <>
      <PageHeader title="Relatórios" />
      {loading ? (
        <Content>
          <Skeleton />
        </Content>
      ) : (
        <>
          <Row className="report" gutter={[16, 20]}>
            <Col span={24} md={8}>
              <ChartCard
                color="purple-dark"
                title="Maior volume de vendas"
                content={data?.destaques?.maiorVolume?.total}
                client={data?.destaques?.maiorVolume?.cliente}
                currency
              />
            </Col>
            <Col span={24} md={8}>
              <ChartCard
                color="purple-light"
                title="Maior média de valor por venda"
                content={data?.destaques?.maiorMedia?.media}
                client={data?.destaques?.maiorMedia?.cliente}
                currency
              />
            </Col>
            <Col span={24} md={8}>
              <ChartCard
                title="Frequência de compra"
                content={data?.destaques?.maiorFrequencia?.quantidade}
                client={data?.destaques?.maiorFrequencia?.cliente}
              />
            </Col>
          </Row>

          <Content type="chart">
            <Row align={'middle'} gutter={[16, 20]}>
              <Col>
                <strong>Vendas totais por dia</strong>
              </Col>
              <Col span={24}>
                {data?.vendasPorDia ? (
                  <Chart data={data?.vendasPorDia} />
                ) : (
                  <Empty description="Sem dados! Cadastre novas vendas." />
                )}
              </Col>
            </Row>
          </Content>
        </>
      )}
    </>
  );
};

export default Report;
