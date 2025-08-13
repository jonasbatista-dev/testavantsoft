import { Column } from '@ant-design/plots';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

type Props = {
  data: any;
};

const DemoDefaultTooltip: React.FC<Props> = ({ data }) => {
  const [currentData, setCurrentData] = useState([]);

  useEffect(() => {
    const newDate = [];
    if (data) {
      Object.keys(data).forEach((key) => {
        newDate.push({
          dia: dayjs(key).format('DD/MM/YYYY'),
          total: data[key],
        });
      });
    }
    setCurrentData(newDate);
  }, [data]);

  const config = {
    data: currentData,
    xField: 'dia',
    yField: 'total',
    onReady: ({ chart }) => {
      try {
        const { height } = chart._container.getBoundingClientRect();
        const tooltipItem = data[Math.floor(Math.random() * data.length)];
        chart.on(
          'afterrender',
          () => {
            chart.emit('tooltip:show', {
              data: {
                data: tooltipItem,
              },
              offsetY: height / 2 - 60,
            });
          },
          true,
        );
      } catch (e) {
        console.error(e);
      }
    },
  };
  return <Column {...config} />;
};

export default DemoDefaultTooltip;
