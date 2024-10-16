"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwaggerService = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class SwaggerService {
    constructor() {
        this.filePath = (0, path_1.join)(__dirname, '../openapi.yaml');
    }
    getSwaggerDocumentation() {
        try {
            return (0, fs_1.readFileSync)(this.filePath, 'utf-8');
        }
        catch (error) {
            console.error('Error reading Swagger file:', error);
            throw new Error('Error reading Swagger file');
        }
    }
}
exports.SwaggerService = SwaggerService;
