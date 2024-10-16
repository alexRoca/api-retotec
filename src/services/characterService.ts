import AWS from 'aws-sdk';
import axios from 'axios';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { CharacterModel } from '../models/characterModel';
import { logError } from '../utils/logger';
import { getCharacterFromSWAPI } from '../utils/httpClient';

const dynamoDb = new AWS.DynamoDB.DocumentClient({ region: 'us-east-1' });

export class CharacterService {
  private tableName = 'StarWarsTable';

  async getCharacter(id: string): Promise<CharacterModel | null> {
    try {
      const getResult = await dynamoDb.get({
        TableName: this.tableName,
        Key: { id },
      }).promise();

      if (getResult.Item) {
        return new CharacterModel(
          getResult.Item.id,
          getResult.Item.nombre,
          getResult.Item.altura,
          getResult.Item.peso,
          getResult.Item.genero
        );
      }

      const swapiResult = await getCharacterFromSWAPI(id);
      if (swapiResult) {
        const newCharacter = new CharacterModel(
          id,
          swapiResult.name,
          swapiResult.height,
          swapiResult.mass,
          swapiResult.gender
        );

        await dynamoDb.put({
          TableName: this.tableName,
          Item: newCharacter,
        }).promise();

        return newCharacter;
      }

      return null;
    } catch (error) {
      logError('Error fetching character from DynamoDB or SWAPI', error);
      throw new Error('Error fetching character');
    }
  }

  async getAllCharacters(): Promise<CharacterModel[]> {
    try {
      const scanResult = await dynamoDb.scan({
        TableName: this.tableName,
      }).promise();

      return scanResult.Items?.map(item => new CharacterModel(
        item.id,
        item.nombre,
        item.altura,
        item.peso,
        item.genero
      )) || [];
    } catch (error) {
      logError('Error fetching all characters from DynamoDB', error);
      throw new Error('Error fetching all characters');
    }
  }

  async createCharacter(character: CharacterModel): Promise<CharacterModel> {
    try {
      await dynamoDb.put({
        TableName: this.tableName,
        Item: character,
      }).promise();
      return character;
    } catch (error) {
      logError('Error saving character to DynamoDB', error);
      throw new Error('Error saving character');
    }
  }

  async updateCharacter(id: string, field: string, value: any): Promise<CharacterModel | null> {
    const character = await this.getCharacter(id);
    if (!character) return null;

    try {
      const params = {
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: `set ${field} = :value`,
        ExpressionAttributeValues: { ':value': value },
        ReturnValues: 'UPDATED_NEW',
      };

      const result = await dynamoDb.update(params).promise();
      return new CharacterModel(
        id,
        result.Attributes?.nombre || character.nombre,
        result.Attributes?.altura || character.altura,
        result.Attributes?.peso || character.peso,
        result.Attributes?.genero || character.genero
      );
    } catch (error) {
      logError('Error updating character in DynamoDB', error);
      throw new Error('Error updating character');
    }
  }
}
