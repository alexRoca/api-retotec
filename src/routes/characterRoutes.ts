import { getCharacterById, getAllCharacters, createCharacter } from '../controllers/characterController';

export const routes = [
  {
    path: '/personaje/{id}',
    method: 'get',
    handler: getCharacterById,
  },
  {
    path: '/personajes',
    method: 'get',
    handler: getAllCharacters,
  },
  {
    path: '/personaje',
    method: 'post',
    handler: createCharacter,
  },
];

export { 
  getCharacterById, 
  getAllCharacters, 
  createCharacter 
};