"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCharacter = exports.getAllCharacters = exports.getCharacterById = exports.routes = void 0;
const characterController_1 = require("../controllers/characterController");
Object.defineProperty(exports, "getCharacterById", { enumerable: true, get: function () { return characterController_1.getCharacterById; } });
Object.defineProperty(exports, "getAllCharacters", { enumerable: true, get: function () { return characterController_1.getAllCharacters; } });
Object.defineProperty(exports, "createCharacter", { enumerable: true, get: function () { return characterController_1.createCharacter; } });
exports.routes = [
    {
        path: '/personaje/{id}',
        method: 'get',
        handler: characterController_1.getCharacterById,
    },
    {
        path: '/personajes',
        method: 'get',
        handler: characterController_1.getAllCharacters,
    },
    {
        path: '/personaje',
        method: 'post',
        handler: characterController_1.createCharacter,
    },
];
