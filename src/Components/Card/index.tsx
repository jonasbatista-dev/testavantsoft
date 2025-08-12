import './Card.scss';
import { EditFilled } from '@ant-design/icons';
import { Button, Col, Row } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';

import { useMemo } from 'react';

export function useMissingAlphabetLetter(fullName) {
  return useMemo(() => {
    if (!fullName) return '-';

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    const lettersInName = new Set(
      fullName
        .toLowerCase()
        .normalize('NFD')
        .replace(/[^a-z]/g, ''),
    );

    for (const letter of alphabet) {
      if (!lettersInName.has(letter)) {
        return letter;
      }
    }

    return '-';
  }, [fullName]);
}

type clientType = {
  name: string;
  email: string;
  birthday: string;
  id: string;
};

interface Props {
  client: clientType;
  index?: number;
  disabled?: boolean;
}

const Card: React.FC<Props> = ({ client }) => {
  const navigate = useNavigate();
  return (
    <div className={`card`}>
      <Row justify={'space-between'} align={'middle'} gutter={16}>
        <Col span={24}>{client?.name}</Col>
        <Col span={24}>{client?.email}</Col>
        <Col span={24}>
          {`Nascimento: ${dayjs(client?.birthday).format('DD/MM/YYYY')}`}
        </Col>
        <Col span={24}>
          {`Primeira letra ausente:`}&nbsp;
          <strong>
            {useMissingAlphabetLetter(client?.name).toUpperCase()}
          </strong>
        </Col>

        <Button
          onClick={() => {
            navigate(`/client/add/${client?.id}`);
          }}
          icon={<EditFilled />}
          type="link"
        />
      </Row>
    </div>
  );
};

export default Card;
