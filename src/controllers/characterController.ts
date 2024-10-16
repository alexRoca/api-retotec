import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { CharacterService } from '../services/characterService';
import { CharacterModel } from '../models/characterModel';
import { successResponse, errorResponse } from '../utils/httpResponses';

const characterService = new CharacterService();

export const getCharacterById = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const { id } = event.pathParameters || {};

  if (!id) {
    return errorResponse("ID no proporcionado", 400);
  }

  try {
    const character = await characterService.getCharacter(id);
    if (character) {
      return successResponse(character);
    } else {
      return errorResponse("Personaje no encontrado", 404);
    }
  } catch (error) {
    console.error('Error al obtener el personaje:', error);
    return errorResponse("Error al obtener el personaje", 500);
  }
};

export const getAllCharacters = async (): Promise<APIGatewayProxyResult> => {
  try {
    const characters = await characterService.getAllCharacters();
    return successResponse(characters);
  } catch (error) {
    console.error('Error al obtener todos los personajes:', error);
    return errorResponse("Error al obtener todos los personajes", 500);
  }
};

export const createCharacter = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  try {
    const { id, nombre, altura, peso, genero } = JSON.parse(event.body || "{}");

    if (!id || !nombre) {
      return errorResponse("Faltan parámetros necesarios", 400);
    }

    const newCharacter = new CharacterModel(id, nombre, altura, peso, genero);
    const savedCharacter = await characterService.createCharacter(newCharacter);
    return successResponse(savedCharacter);
  } catch (error) {
    console.error('Error al registrar el personaje:', error);
    return errorResponse("Error al registrar el personaje", 500);
  }
};
