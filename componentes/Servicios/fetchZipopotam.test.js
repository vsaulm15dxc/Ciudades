import fetchZipopotam from './fetchZipopotam';

describe('fetchZipopotam', () => {
  it('debería devolver los datos de ubicación cuando la respuesta es exitosa', async () => {
    // Simular una respuesta exitosa
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            places: [
              {
                'place name': 'City Name',
                latitude: 12.3456,
                longitude: 78.9012,
                state: 'State',
                state_abbreviation: 'ST',
              },
            ],
          }),
      })
    );

    const code = '08130';

    const result = await fetchZipopotam(code);

    expect(result).toEqual({
      placeName: 'City Name',
      latitude: 41.5333,
      longitude:  2.1833,
      region: 'State',
      regionAbbreviation: 'ST',
    });
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://api.zippopotam.us/es/${code}`);
  });

  it('debería lanzar un error cuando la respuesta no es exitosa', async () => {
    // Simular una respuesta no exitosa
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    const code = '12345';

    await expect(fetchZipopotam(code)).rejects.toThrowError(
      'El codigo introducido no está asociado a alguna ciudad.'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://api.zippopotam.us/es/${code}`);
  });

  it('debería lanzar un error cuando no se encuentra información para el código postal', async () => {
    // Simular una respuesta exitosa sin información de ubicación
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ places: [] }),
      })
    );

    const code = '12345';

    await expect(fetchZipopotam(code)).rejects.toThrowError(
      'No se encontró información para el código postal ingresado.'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://api.zippopotam.us/es/${code}`);
  });
});
