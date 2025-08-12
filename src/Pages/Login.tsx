import Content from '@/Components/Content';
import PageHeader from '@/Components/PageHeader';
import { Button, Col, Form, Input, Row } from 'antd';
import React, { useState } from 'react';
import { useAuth } from '@/Api/AuthContext';

const Pages: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { login } = useAuth();
  const onFinish = ({ email, password }: any) => {
    setSubmitting(true);

    setTimeout(async () => {
      const logged = await login(email, password);
      setSubmitting(!!logged);
    }, 1000);
  };

  return (
    <>
      <PageHeader title="Faça seu Login" />
      <Row justify="center">
        <Col span={24} md={8}>
          <Content>
            <Form onFinish={onFinish} layout="vertical">
              <Row justify={'center'}>
                <Col span={24}>
                  <Form.Item
                    name="email"
                    label="E-mail"
                    required
                    rules={[{ required: true, message: 'Campo obrigatório' }]}
                  >
                    <Input size="large" />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    name="password"
                    label="Senha"
                    required
                    rules={[{ required: true, message: 'Campo obrigatório' }]}
                  >
                    <Input.Password size="large" />
                  </Form.Item>
                </Col>
                <Col md={12} lg={10} span={24}>
                  <Button
                    loading={submitting}
                    size="large"
                    htmlType="submit"
                    type="primary"
                  >
                    Enviar
                  </Button>
                </Col>
              </Row>
            </Form>
          </Content>
        </Col>
      </Row>
    </>
  );
};

export default Pages;
