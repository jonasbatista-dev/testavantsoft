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
        <Content type="chart">
          <Row align={'middle'} gutter={[16, 20]}>
            <Col span={24}>
              {data?.vendasPorDia ? (
                <Chart data={data?.vendasPorDia} />
              ) : (
                <Empty description="Sem dados! Cadastre novas tarefas." />
              )}
            </Col>
          </Row>
        </Content>
      )}
    </>
  );
};

export default Report;
