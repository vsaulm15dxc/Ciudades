import fetchOpenMeteo from './fetchOpenMeteo';

describe('fetchOpenMeteo', () => {
  it('debería devolver los datos climáticos cuando la respuesta es exitosa', async () => {
    // Simular una respuesta exitosa
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ hourly: { weathercode: [1, 2, 3] } }),
      })
    );

    const latitude = 12.3456;
    const longitude = 78.9012;

    const result = await fetchOpenMeteo(latitude, longitude);

    expect(result).toEqual([1, 2, 3]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&forecast_days=1`
    );
  });

  it('debería lanzar un error cuando la respuesta no es exitosa', async () => {
    // Simular una respuesta no exitosa
    global.fetch = jest.fn(() => Promise.resolve({ ok: false }));

    const latitude = 12.3456;
    const longitude = 78.9012;

    await expect(fetchOpenMeteo(latitude, longitude)).rejects.toThrowError(
      'No se pudo obtener la información climática.'
    );

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=weathercode&forecast_days=1`
    );
  });
});
