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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacter = exports.getAllCharacters = exports.getCharacterById = void 0;
const characterService_1 = require("../services/characterService");
const characterModel_1 = require("../models/characterModel");
const httpResponses_1 = require("../utils/httpResponses");
const characterService = new characterService_1.CharacterService();
const getCharacterById = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = event.pathParameters || {};
    if (!id) {
        return (0, httpResponses_1.errorResponse)("ID no proporcionado", 400);
    }
    try {
        const character = yield characterService.getCharacter(id);
        if (character) {
            return (0, httpResponses_1.successResponse)(character);
        }
        else {
            return (0, httpResponses_1.errorResponse)("Personaje no encontrado", 404);
        }
    }
    catch (error) {
        console.error('Error al obtener el personaje:', error);
        return (0, httpResponses_1.errorResponse)("Error al obtener el personaje", 500);
    }
});
exports.getCharacterById = getCharacterById;
const getAllCharacters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const characters = yield characterService.getAllCharacters();
        return (0, httpResponses_1.successResponse)(characters);
    }
    catch (error) {
        console.error('Error al obtener todos los personajes:', error);
        return (0, httpResponses_1.errorResponse)("Error al obtener todos los personajes", 500);
    }
});
exports.getAllCharacters = getAllCharacters;
const createCharacter = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, nombre, altura, peso, genero } = JSON.parse(event.body || "{}");
        if (!id || !nombre) {
            return (0, httpResponses_1.errorResponse)("Faltan parámetros necesarios", 400);
        }
        const newCharacter = new characterModel_1.CharacterModel(id, nombre, altura, peso, genero);
        const savedCharacter = yield characterService.createCharacter(newCharacter);
        return (0, httpResponses_1.successResponse)(savedCharacter);
    }
    catch (error) {
        console.error('Error al registrar el personaje:', error);
        return (0, httpResponses_1.errorResponse)("Error al registrar el personaje", 500);
    }
});
exports.createCharacter = createCharacter;
