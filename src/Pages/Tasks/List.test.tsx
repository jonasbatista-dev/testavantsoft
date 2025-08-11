// __tests__/List.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { useService } from '../../Api/ApiServiceContext';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import List from './List';
import { ThemeProvider } from '../../Layout/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const renderComponents = () => {
  render(
    <ThemeProvider>
      <BrowserRouter>
        <List />
      </BrowserRouter>
    </ThemeProvider>,
  );
};

jest.mock('../../Api/ApiServiceContext', () => ({
  useService: jest.fn(),
}));

const mockTasks = [
  { title: 'Task 1', order: 1, completed: false, id: '1' },
  { title: 'Task 2', order: 2, completed: true, id: '2' },
  { title: 'Task 3', order: 3, completed: false, id: '3' },
];

describe('List Page', () => {
  beforeEach(() => {
    (useService as jest.Mock).mockReturnValue({
      getTasks: jest.fn().mockResolvedValue(mockTasks),
    });
  });

  test('should renders tasks and  filters correctly', async () => {
    renderComponents();

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
    });

    const completedButton = screen.getByText('Feitas');
    userEvent.click(completedButton);

    await waitFor(() => {
      expect(screen.getByText('Task 2')).toBeInTheDocument();
      expect(screen.queryByText('Task 1')).not.toBeInTheDocument();
      expect(screen.queryByText('Task 3')).not.toBeInTheDocument();
    });

    const pendingButton = screen.getByText('Pendentes');
    userEvent.click(pendingButton);

    await waitFor(() => {
      expect(screen.getByText('Task 1')).toBeInTheDocument();
      expect(screen.getByText('Task 3')).toBeInTheDocument();
      expect(screen.queryByText('Task 2')).not.toBeInTheDocument();
    });
  });
});
