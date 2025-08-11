import { render, screen } from '@testing-library/react';
import Content from './';
import '@testing-library/jest-dom';

describe('Content Component', () => {
  it('should render children correctly', () => {
    render(<Content>Test Child</Content>);
    const childElement = screen.getByText('Test Child');
    expect(childElement).toBeInTheDocument();
  });

  it('should apply the default class when no type is provided', () => {
    const { container } = render(<Content>Default Type</Content>);
    expect(container.querySelector('.default')).toBeInTheDocument();
  });

  it('should apply the chart class when type is "chart"', () => {
    const { container } = render(<Content type="chart">Chart Content</Content>);
    expect(container.querySelector('.chart')).toBeInTheDocument();
  });

  it('should apply the transparent class when type is "transparent"', () => {
    const { container } = render(
      <Content type="transparent">Transparent Content</Content>,
    );
    expect(container.querySelector('.transparent')).toBeInTheDocument();
  });
});
