import React from 'react';
import { render, screen } from '@testing-library/react';
import Settings, {ObjectsSize, Pallete} from './Settings';

test('check if settings panel renders correctly', () => {
    const settings = {
        
    }
    render(<Settings settings={{
        newObjectsPerClick: 10,
        elasticity: 0.6,
        objectsColor: Pallete.Red,
        objectsSize: ObjectsSize.Large,
    }}></Settings>)

    const objectsPerClick = screen.getByTestId('objects-per-click')
    const objectsSize = screen.getByTestId('objects-size')
    const objectsColor = screen.getByTestId('objects-color')
    const elasticity = screen.getByTestId('elasticity')

    expect(objectsPerClick).toBeInTheDocument()
    expect(objectsSize).toBeInTheDocument()
    expect(objectsColor).toBeInTheDocument()
    expect(elasticity).toBeInTheDocument()
});
