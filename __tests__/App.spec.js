import React from 'react';
import { create } from 'react-test-renderer';
import { render, screen } from '@testing-library/react';


import App from '../src/App';

describe('App', () => {
  test('Matches the snapshot', () => {
    const app = create(<App />);
    expect(app.toJSON()).toMatchSnapshot();
  });
  test('has correct welcome text', () => {
    render(<App />);
    const content = screen.getByText(/Hello World!/);
    expect(content).toBeTruthy();
  });
});
