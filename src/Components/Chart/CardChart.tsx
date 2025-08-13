import React from 'react';
import './Chart.scss';

type Props = {
  title: string;
  content?: string;
  client?: string;
  color?: 'purple-dark' | 'purple-light' | 'slate-blue';
  currency?: boolean;
};

const ChartCard: React.FC<Props> = ({
  title,
  content,
  color = 'slate-blue',
  client,
  currency,
}) => {
  return (
    <div className={`cardChart ${color}`}>
      <div className="title">{title}</div>

      <div className="infos">
        <div className="client">{client ?? '--'}</div>
        <span>{currency ? `R$ ${content}` : (content ?? '--')}</span>
      </div>
    </div>
  );
};

export default ChartCard;
