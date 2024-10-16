import { APIGatewayProxyEvent } from 'aws-lambda';
import { createCharacter } from '../controllers/characterController';
import { CharacterService } from '../services/characterService';
import { CharacterModel } from '../models/characterModel';
import { successResponse, errorResponse } from '../utils/httpResponses';

jest.mock('../services/characterService');

describe('createCharacter', () => {
  const mockCreateCharacter = jest.spyOn(CharacterService.prototype, 'createCharacter');

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create and return the character', async () => {
    const mockCharacter = new CharacterModel('4', 'Darth Vader', '202', '136', 'male');
    mockCreateCharacter.mockResolvedValue(mockCharacter);

    const mockEvent = {
      body: JSON.stringify({
        id: '4',
        nombre: 'Darth Vader',
        altura: '202',
        peso: '136',
        genero: 'male',
      }),
    } as Partial<APIGatewayProxyEvent>;

    const result = await createCharacter(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(successResponse(mockCharacter));
    expect(mockCreateCharacter).toHaveBeenCalled();
  });

  it('should return 400 if missing required parameters', async () => {
    const mockEvent = {
      body: JSON.stringify({}),
    } as Partial<APIGatewayProxyEvent>;

    const result = await createCharacter(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(errorResponse('Faltan parámetros necesarios', 400));
  });

  it('should return 500 if there is an error', async () => {
    mockCreateCharacter.mockRejectedValue(new Error('DynamoDB error'));

    const mockEvent = {
      body: JSON.stringify({
        id: '4',
        nombre: 'Darth Vader',
      }),
    } as Partial<APIGatewayProxyEvent>;

    const result = await createCharacter(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(errorResponse('Error al registrar el personaje', 500));
  });
});
