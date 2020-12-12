import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

import 'jest-canvas-mock'

test('renders learn react link', () => {
  render(<App />);
  const settingsButton = screen.getByText(/settings/i)
  const gotoDocs = screen.getByText(/docs/i)

  expect(settingsButton).toBeInTheDocument();
  expect(gotoDocs).toBeInTheDocument()
});
