import { fireEvent, render, screen } from '@testing-library/react';
import PageHeader from './';
import { useTheme } from '../../Layout/ThemeContext';

const renderComponent = () => {
  render(<PageHeader title="Test" />);
};

jest.mock('../../Layout/ThemeContext', () => ({
  useTheme: jest.fn(),
}));
describe('PageHeader', () => {
  const mockToggleTheme = jest.fn();
  beforeEach(() => {
    (useTheme as jest.Mock).mockReturnValue({
      toggleTheme: mockToggleTheme,
    });
  });

  it('should render children corectly', () => {
    renderComponent();

    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should change theme', () => {
    renderComponent();

    const buttonChange = screen.getByRole('switch');
    fireEvent.click(buttonChange);

    expect(mockToggleTheme);
  });
});
