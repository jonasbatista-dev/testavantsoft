import Card from '../../Components/Card';
import Content from '../../Components/Content';
import PageHeader from '../../Components/PageHeader';
import { useService } from '../../Api/ApiServiceContext';
import { CheckOutlined } from '@ant-design/icons';

import { DragDropContext, Droppable } from '@hello-pangea/dnd';

import { App, Button, Col, Row, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

const ListTasks: React.FC = () => {
  const [data, setData] = useState<tasksType[]>();
  const { getTasks } = useService();
  const [filter, setFilter] = useState('all');
  const { message } = App.useApp();

  const handleData = (filter) => {
    getTasks()
      .then((resp: tasksType[]) => {
        let sortResult = [] as tasksType[];
        if (resp.length) {
          sortResult = resp?.sort((a, b) => a.order - b.order);
        }

        if (filter === 'pendente') {
          const data = sortResult?.filter((item) => !item?.completed);
          return setData(data);
        }
        if (filter === 'completed') {
          const data = sortResult?.filter((item) => item?.completed);
          return setData(data);
        }

        return setData(sortResult);
      })
      .catch(() => message.error({ content: 'Houve um erro inesperado.' }));
  };

  useEffect(() => {
    handleData('all');
  }, []);

  function reorder<T>(list: T[], startIndex: number, endIndex: number) {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  }

  const onDragEnd = (result: any) => {
    if (!result.destination) return result;
    const tasksOrder = [];
    const tasks = reorder(data, result.source.index, result.destination.index);

    tasks?.map((item, index) => tasksOrder.push({ ...item, order: index + 1 }));
    setData(tasks);
    window.localStorage.setItem('tasks', JSON.stringify(tasksOrder));
    window.location.reload();
  };

  return (
    <>
      <PageHeader title="Lista de Tarefas" />
      <Content type="transparent">
        <Row>
          <Col>
            <Button
              onClick={() => {
                if (filter === 'all') {
                  return;
                } else {
                  setFilter('all');
                  handleData('all');
                }
              }}
              icon={filter === 'all' ? <CheckOutlined /> : null}
              type="text"
            >
              Todas
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (filter === 'completed') {
                  return;
                } else {
                  setFilter('completed');
                  handleData('completed');
                }
              }}
              icon={filter === 'completed' ? <CheckOutlined /> : null}
              type="text"
            >
              Feitas
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => {
                if (filter === 'pendente') {
                  return;
                } else {
                  setFilter('pendente');
                  handleData('pendente');
                }
              }}
              icon={filter === 'pendente' ? <CheckOutlined /> : null}
              type="text"
            >
              Pendentes
            </Button>
          </Col>
        </Row>
        <br />
        <div>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={'tasks'} type="list" direction="vertical">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {data?.length ? (
                    <>
                      {data?.map((item, index) => {
                        return (
                          <Card
                            disabled={filter !== 'all' ? true : false}
                            index={index}
                            key={index}
                            task={item}
                          />
                        );
                      })}
                    </>
                  ) : (
                    <div className="card">
                      <Row>
                        <Col>
                          <Typography.Text>Nada encontrado...</Typography.Text>
                        </Col>
                      </Row>
                    </div>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </Content>
    </>
  );
};

export default ListTasks;
