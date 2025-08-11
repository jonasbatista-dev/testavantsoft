import { render, screen, fireEvent } from '@testing-library/react';

import { useNavigate } from 'react-router-dom';

import Card from './';
import { useService } from '../../Api/ApiServiceContext';

type tasksType = {
  title: string;
  order: number;
  completed: boolean;
  id: string;
};

jest.mock('../../Api/ApiServiceContext', () => ({
  useService: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}));

jest.mock('@hello-pangea/dnd', () => ({
  Draggable: ({ children }: { children: (provided: any) => JSX.Element }) =>
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: jest.fn(),
    }),
}));

describe('Card Component', () => {
  const mockDeleteTask = jest.fn();
  const mockUpdateTask = jest.fn();
  const mockNavigate = jest.fn();

  const task: tasksType = {
    title: 'Task 1',
    order: 1,
    completed: false,
    id: '1',
  };

  beforeEach(() => {
    (useService as jest.Mock).mockReturnValue({
      deleteTask: mockDeleteTask,
      updateTask: mockUpdateTask,
    });

    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    mockDeleteTask.mockClear();
    mockUpdateTask.mockClear();
    mockNavigate.mockClear();
  });

  it('should render the task title', () => {
    render(<Card task={task} index={0} />);

    expect(screen.getByText('Task 1')).toBeInTheDocument();
  });

  it('should check checkbox when task is completed', () => {
    render(<Card task={{ ...task, completed: true }} index={0} />);

    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  it('should call updateTask when checkbox is clicked', async () => {
    render(<Card task={task} index={0} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    await screen.findByRole('checkbox');

    expect(mockUpdateTask).toHaveBeenCalledWith('1', {
      ...task,
      completed: true,
    });
  });

  it('should navigate to edit form when Edit button is clicked', () => {
    render(<Card task={task} index={0} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(mockNavigate).toHaveBeenCalledWith('/form/1');
  });

  it('should call deleteTask when Delete button is clicked', () => {
    render(<Card task={task} index={0} />);

    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);

    expect(mockDeleteTask).toHaveBeenCalledWith('1');
  });

  it('should disable buttons if task is completed', () => {
    render(<Card task={{ ...task, completed: true }} index={0} />);

    const editButton = screen.getByRole('button', { name: /edit/i });
    const deleteButton = screen.getByRole('button', { name: /delete/i });

    expect(editButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });
});
