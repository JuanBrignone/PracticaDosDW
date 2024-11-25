import fetch from 'node-fetch';

export const fetchPlanets = async () => {
  try {
    const response = await fetch('http://192.168.1.9:3000/planets');
    console.log('Response received:', response);
    if (!response.ok) {
      throw new Error('error');
    }
    const data = await response.json();
    console.log('Data received:', data);
    return data;
  } catch (error) {
    console.error('Error obteniendo planetas:', error);
    throw error;
  }
};

export const deletePlanet = async (id) => {
  try {
    const response = await fetch(`http://192.168.1.9:3000/planets/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('error');
    }
  } catch (error) {
    console.error('Error eliminando planeta:', error);
    throw error;
  }
};

export const addPlanet = async (planet) => {
  try {
    const response = await fetch('http://192.168.1.9:3000/planets', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planet),
    });
    if (!response.ok) {
      throw new Error('error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error añadiendo planetas:', error);
    throw error;
  }
};

export const updatePlanet = async (id, updatedPlanet) => {
  try {
    const response = await fetch(`http://192.168.1.9:3000/planets/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlanet),
    });
    if (!response.ok) {
      throw new Error('error');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error actualizando planeta:', error);
    throw error;
  }
};