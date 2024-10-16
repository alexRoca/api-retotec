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
exports.getSwagger = void 0;
const swaggerService_1 = require("../services/swaggerService");
const swaggerService = new swaggerService_1.SwaggerService();
const getSwagger = (event) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const yamlContent = swaggerService.getSwaggerDocumentation();
        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/x-yaml',
            },
            body: yamlContent,
        };
    }
    catch (error) {
        console.error('Error serving Swagger documentation:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error al servir la documentación' }),
        };
    }
});
exports.getSwagger = getSwagger;
