import { APIGatewayProxyEvent } from 'aws-lambda';
import { getCharacterById } from '../controllers/characterController';
import { CharacterService } from '../services/characterService';
import { successResponse, errorResponse } from '../utils/httpResponses';

jest.mock('../services/characterService');

describe('getCharacterById', () => {
  let mockEvent: Partial<APIGatewayProxyEvent>;
  const mockGetCharacter = jest.spyOn(CharacterService.prototype, 'getCharacter');

  beforeEach(() => {
    mockEvent = {
      pathParameters: { id: '1' },
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return character data when found', async () => {
    const mockCharacter = { id: '1', nombre: 'Luke Skywalker', altura: '172', peso: '77', genero: 'male' };
    mockGetCharacter.mockResolvedValue(mockCharacter);

    const result = await getCharacterById(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(successResponse(mockCharacter));
    expect(mockGetCharacter).toHaveBeenCalledWith('1');
  });

  it('should return 404 when character not found', async () => {
    mockGetCharacter.mockResolvedValue(null);

    const result = await getCharacterById(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(errorResponse('Personaje no encontrado', 404));
  });

  it('should return 400 if ID is not provided', async () => {
    mockEvent.pathParameters = {};

    const result = await getCharacterById(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(errorResponse('ID no proporcionado', 400));
  });

  it('should return 500 when an error occurs', async () => {
    mockGetCharacter.mockRejectedValue(new Error('DynamoDB error'));

    const result = await getCharacterById(mockEvent as APIGatewayProxyEvent);

    expect(result).toEqual(errorResponse('Error al obtener el personaje', 500));
  });
});
