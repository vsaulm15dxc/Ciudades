import React from 'react';
import { render, screen } from '@testing-library/react';
import GeographicalCard from './GeographicalCard';

describe('GeographicalCard', () => {
  let mockOpen;

  beforeEach(() => {
    mockOpen = jest.fn();
    global.open = mockOpen;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('debería abrirse en Google Maps con el enlace correcto al hacer clic en el botón', () => {
    const mockData = {
      latitude: 12.0000,
      longitude: 45.6900,
    };

    render(<GeographicalCard data={mockData} />);

    const button = screen.getByRole('button');
    button.click();

    const expectedUrl = `https://www.google.com/maps/@${mockData.latitude},${mockData.longitude},12z`;
    expect(mockOpen).toHaveBeenCalledWith(expectedUrl, '_blank');
  });
});
