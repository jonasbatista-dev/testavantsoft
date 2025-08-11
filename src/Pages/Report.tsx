import Chart from '../Components/Chart';
import Content from '../Components/Content';
import PageHeader from '../Components/PageHeader';
import { useService } from '../Api/ApiServiceContext';

import { App, Col, Empty, Row } from 'antd';
import React, { useEffect, useState } from 'react';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

const Report: React.FC = () => {
  const [data, setData] = useState<tasksType[]>([]);
  const { getTasks } = useService();
  const { message } = App.useApp();

  const handleData = () => {
    getTasks()
      .then((resp: tasksType[]) => {
        return setData(resp);
      })
      .catch(() => message.error({ content: 'Houve um erro inesperado.' }));
  };

  useEffect(() => {
    handleData();
  }, []);
  return (
    <>
      <PageHeader title="Relatórios" />
      <Content type="chart">
        <Row align={'middle'} gutter={[16, 20]}>
          <Col span={24}>
            {data?.length ? (
              <Chart tasks={data} />
            ) : (
              <Empty description="Sem dados! Cadastre novas tarefas." />
            )}
          </Col>
        </Row>
      </Content>
    </>
  );
};

export default Report;
