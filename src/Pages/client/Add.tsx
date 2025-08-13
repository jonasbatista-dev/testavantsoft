import Content from '@/Components/Content';
import PageHeader from '@/Components/PageHeader';

import { App, Button, Col, Form, Input, Row } from 'antd';
import dayjs from 'dayjs';
import { createClient } from '@/Service/Api';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const AddClient: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { message } = App.useApp();
  const [submitting, setSubmitting] = useState(false);

  const { id } = useParams<{ id?: string }>();

  const onFinish = async ({ nomeCompleto, nascimento, email }: any) => {
    setSubmitting(true);
    try {
      await id;

      await createClient(
        nomeCompleto,
        email,
        dayjs(nascimento).format('YYYY-MM-DD'),
      );
      navigate('/client/list');
      setSubmitting(false);
    } catch (error) {
      message.error({ content: 'Hove um erro inesperado' });
    }
  };
  return (
    <>
      <PageHeader title="Novo Cliente" />
      <Content>
        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row align={'middle'} justify={'center'} gutter={[16, 0]}>
            <Col span={24}>
              <Form.Item
                name={'nomeCompleto'}
                label="Descrição da tarefa"
                required
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col md={14} lg={18} span={24}>
              <Form.Item
                name={'email'}
                label="E-mail"
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Input size="large" />
              </Form.Item>
            </Col>
            <Col md={10} lg={6} span={24}>
              <Form.Item
                rules={[{ required: true, message: 'Campo obrigatório' }]}
                name={'nascimento'}
                label="Data de Nascimento"
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
            <Col md={8} lg={4} span={24}>
              <Button
                loading={submitting}
                size="large"
                htmlType="submit"
                type="primary"
              >
                Salvar
              </Button>
            </Col>
          </Row>
        </Form>
      </Content>
    </>
  );
};

export default AddClient;
