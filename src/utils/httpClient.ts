import axios from 'axios';

export const httpClient = axios.create({
  baseURL: 'https://swapi.dev/api/',
});

export const getCharacterFromSWAPI = async (id: string) => {
  const response = await httpClient.get(`people/${id}/`);
  return response.data;
};