import { render, screen, cleanup } from '@testing-library/react';

import App from './App';
jest.mock("./store")

describe("App", () => {
  afterEach(cleanup)

  test('renders search header with title and search input', () => {
    render(<App/>);
    const headerElement = screen.getByText(/Station Finder/i);
    expect(headerElement).toBeInTheDocument();

    const inputElement = screen.getByPlaceholderText("Station");
    expect(inputElement).toBeInTheDocument();
  });

  test('renders selected station live detail', () => {
    render(<App/>);
    const headerElement = screen.queryAllByText(/London Liverpool Street/i);
    expect(headerElement[0]).toBeInTheDocument();
    expect(headerElement[0].tagName).toBe("SPAN");
  });
})

