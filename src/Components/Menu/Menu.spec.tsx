import { fireEvent, render, screen } from '@testing-library/react';
import Menu from './';
import { ThemeProvider } from '../../Layout/ThemeContext';
import { BrowserRouter } from 'react-router-dom';

const renderComponent = () => {
  render(
    <ThemeProvider>
      <BrowserRouter>
        <Menu />
      </BrowserRouter>
    </ThemeProvider>,
  );
};

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Menu', () => {
  it('Should render correct', () => {
    renderComponent();

    expect(screen.getByText('To Do List')).toBeInTheDocument();
    expect(screen.getByText('Nova Tarefa')).toBeInTheDocument();
    expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Relatórios')).toBeInTheDocument();
  });

  it('should call navigate when hits the item Nova Tarefa', () => {
    renderComponent();

    const itemMenu = screen.getByText('Nova Tarefa');
    fireEvent.click(itemMenu);

    expect(mockNavigate).toHaveBeenCalledWith('/form');
  });

  it('should call navigate when hits the item Lista de Tarefas', () => {
    renderComponent();

    const itemMenu = screen.getByText('Lista de Tarefas');
    fireEvent.click(itemMenu);

    expect(mockNavigate).toHaveBeenCalledWith('/list');
  });

  it('should call navigate when hits the item Relatórios', () => {
    renderComponent();

    const itemMenu = screen.getByText('Relatórios');
    fireEvent.click(itemMenu);

    expect(mockNavigate).toHaveBeenCalledWith('/report');
  });
});
