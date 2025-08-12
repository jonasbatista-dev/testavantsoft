import React, { createContext, ReactNode, useContext } from 'react';
import axios from 'axios';

import { v4 as uuidv4 } from 'uuid';

// Simulação de API com axios
axios.interceptors.response.use((response) => {
  return response;
});

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id?: string;
};

interface mainContextProps {
  getTasks: () => Promise<tasksType[]>;
  addTask: (task: tasksType) => Promise<tasksType>;
  updateTask: (id: string, updateTask: tasksType) => Promise<tasksType>;
  deleteTask: (id: string) => Promise<tasksType>;
}

const ServiceContext = createContext<mainContextProps | undefined>(undefined);

export const ServiceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const tasks =
    JSON.parse(window.localStorage.getItem('tasks')) ?? ([] as tasksType[]);

  const getTasks = async () => {
    try {
      const response = await fetch('/tasks.json');
      await response.json();
      return tasks;
    } catch (error) {
      return error;
    }
  };

  const addTask = async (newTask: tasksType) => {
    try {
      const response = await axios.post('/tasks.json', newTask, {
        data: tasks,
      });
      const newTasks = tasks;

      newTasks.push({ ...newTask, id: uuidv4() });
      window.localStorage.setItem('tasks', JSON.stringify(newTasks));

      return response.data;
    } catch (error) {
      console.error({ content: 'Erro ao adicionar tarefa' });
    }
  };

  const updateTask = async (id: string, updatedTask: tasksType) => {
    try {
      const resp = await axios.put(`./tasks.json`, updatedTask);
      const newTasks = tasks.map((task) =>
        task.id === id ? { ...task, ...updatedTask } : task,
      );

      window.localStorage.setItem('tasks', JSON.stringify(newTasks));
      return resp.data;
    } catch (error) {
      console.error(`Erro ao atualizar a tarefa`, error);
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const response = await axios.delete(`/tasks.json`, {
        data: tasks,
      });
      const newList = tasks.filter((task) => task.id !== id);
      window.localStorage.setItem('tasks', JSON.stringify(newList));
      return response.data;
    } catch (error) {
      console.error(`Erro ao deletar a tarefa`, error);
    }
  };

  return (
    <ServiceContext.Provider
      value={{ getTasks, updateTask, deleteTask, addTask }}
    >
      {children}
    </ServiceContext.Provider>
  );
};

export const useService = () => {
  const context = useContext(ServiceContext);
  if (!context) {
    throw new Error('error');
  }
  return context;
};
