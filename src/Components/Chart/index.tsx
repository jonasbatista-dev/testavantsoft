import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface Task {
  title: string;
  order: number;
  completed: boolean;
}

interface TaskChartProps {
  tasks: Task[];
}

const TaskChart: React.FC<TaskChartProps> = ({ tasks }) => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.filter((task) => !task.completed).length;
  const totalTasks = tasks.length;

  const data = {
    labels: ['Tarefas'],
    datasets: [
      {
        label: 'Feita',
        data: [completedTasks],
        backgroundColor: 'green',
      },
      {
        label: 'Por Fazer',
        data: [pendingTasks],
        backgroundColor: 'red',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Status das Tarefas',
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            const value = context.raw;
            const percentage = ((value / totalTasks) * 100).toFixed(2);
            return `${context.dataset.label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
};

export default TaskChart;
