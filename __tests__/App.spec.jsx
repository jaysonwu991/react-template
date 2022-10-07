import React from 'react';
import { render, screen } from '@testing-library/react';

import App from '../src/App';

describe('App', () => {
  test('Matches the snapshot', () => {
    const { asFragment } = render(<App />);
    expect(asFragment()).toMatchSnapshot();
  });
  test('has correct welcome text', () => {
    render(<App />);
    const content = screen.getByText(/Hello World!/);
    expect(content).toBeTruthy();
  });
});
