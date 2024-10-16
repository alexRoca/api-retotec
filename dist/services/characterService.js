"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CharacterService = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const characterModel_1 = require("../models/characterModel");
const logger_1 = require("../utils/logger");
const httpClient_1 = require("../utils/httpClient");
const dynamoDb = new aws_sdk_1.default.DynamoDB.DocumentClient({ region: 'us-east-1' });
class CharacterService {
    constructor() {
        this.tableName = 'StarWarsTable';
    }
    getCharacter(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const getResult = yield dynamoDb.get({
                    TableName: this.tableName,
                    Key: { id },
                }).promise();
                if (getResult.Item) {
                    return new characterModel_1.CharacterModel(getResult.Item.id, getResult.Item.nombre, getResult.Item.altura, getResult.Item.peso, getResult.Item.genero);
                }
                const swapiResult = yield (0, httpClient_1.getCharacterFromSWAPI)(id);
                if (swapiResult) {
                    const newCharacter = new characterModel_1.CharacterModel(id, swapiResult.name, swapiResult.height, swapiResult.mass, swapiResult.gender);
                    yield dynamoDb.put({
                        TableName: this.tableName,
                        Item: newCharacter,
                    }).promise();
                    return newCharacter;
                }
                return null;
            }
            catch (error) {
                (0, logger_1.logError)('Error fetching character from DynamoDB or SWAPI', error);
                throw new Error('Error fetching character');
            }
        });
    }
    getAllCharacters() {
        return __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const scanResult = yield dynamoDb.scan({
                    TableName: this.tableName,
                }).promise();
                return ((_a = scanResult.Items) === null || _a === void 0 ? void 0 : _a.map(item => new characterModel_1.CharacterModel(item.id, item.nombre, item.altura, item.peso, item.genero))) || [];
            }
            catch (error) {
                (0, logger_1.logError)('Error fetching all characters from DynamoDB', error);
                throw new Error('Error fetching all characters');
            }
        });
    }
    createCharacter(character) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield dynamoDb.put({
                    TableName: this.tableName,
                    Item: character,
                }).promise();
                return character;
            }
            catch (error) {
                (0, logger_1.logError)('Error saving character to DynamoDB', error);
                throw new Error('Error saving character');
            }
        });
    }
    updateCharacter(id, field, value) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const character = yield this.getCharacter(id);
            if (!character)
                return null;
            try {
                const params = {
                    TableName: this.tableName,
                    Key: { id },
                    UpdateExpression: `set ${field} = :value`,
                    ExpressionAttributeValues: { ':value': value },
                    ReturnValues: 'UPDATED_NEW',
                };
                const result = yield dynamoDb.update(params).promise();
                return new characterModel_1.CharacterModel(id, ((_a = result.Attributes) === null || _a === void 0 ? void 0 : _a.nombre) || character.nombre, ((_b = result.Attributes) === null || _b === void 0 ? void 0 : _b.altura) || character.altura, ((_c = result.Attributes) === null || _c === void 0 ? void 0 : _c.peso) || character.peso, ((_d = result.Attributes) === null || _d === void 0 ? void 0 : _d.genero) || character.genero);
            }
            catch (error) {
                (0, logger_1.logError)('Error updating character in DynamoDB', error);
                throw new Error('Error updating character');
            }
        });
    }
}
exports.CharacterService = CharacterService;
