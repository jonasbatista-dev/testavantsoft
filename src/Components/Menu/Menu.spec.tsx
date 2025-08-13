import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { act } from 'react';
import Menu from './';
import { ThemeProvider } from '../../Layout/ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../../Service/AuthContext';

const renderComponent = () => {
  render(
    <ThemeProvider>
      <BrowserRouter>
        <AuthProvider>
          <Menu />
        </AuthProvider>
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
  it('Should render correct', async () => {
    renderComponent();
    expect(await screen.findByText('Novo Cliente')).toBeInTheDocument();
    expect(await screen.findByText('Lista de Clientes')).toBeInTheDocument();
    expect(await screen.findByText('Relatórios')).toBeInTheDocument();
  });

  it('should call navigate when hits the item Nova Tarefa', async () => {
    renderComponent();

    const itemMenu = await screen.findByText('Novo Cliente');
    await act(async () => {
      fireEvent.click(itemMenu);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/client/add');
    });
  });

  it('should call navigate when hits the item Lista de Clientes', async () => {
    renderComponent();

    const itemMenu = await screen.findByText('Lista de Clientes');
    await act(async () => {
      fireEvent.click(itemMenu);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/client/list');
    });
  });

  it('should call navigate when hits the item Relatórios', async () => {
    renderComponent();

    const itemMenu = await screen.findByText('Relatórios');
    await act(async () => {
      fireEvent.click(itemMenu);
    });

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/report');
    });
  });
});
