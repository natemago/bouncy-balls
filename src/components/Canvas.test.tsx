import React from 'react';
import { render, screen } from '@testing-library/react';
import Canvas from './Canvas';
import {Canvas2DrawingProvider} from '../bouncyballs/drawables'

import 'jest-canvas-mock'

test('Check if canvas is rendered properly', () => {

  const drawingProvider = {
    setCanvas: (...args:any) => {},
  } as Canvas2DrawingProvider

  const setCanvas = jest.spyOn(drawingProvider, 'setCanvas')
  render(<Canvas  drawingProvider={drawingProvider}/>);
  const canvas = screen.getByTestId('canvas')

  expect(canvas).toBeInTheDocument()
  expect(setCanvas).toHaveBeenCalled()
});
