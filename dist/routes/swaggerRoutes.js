"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSwagger = exports.routes = void 0;
const swaggerController_1 = require("../controllers/swaggerController");
Object.defineProperty(exports, "getSwagger", { enumerable: true, get: function () { return swaggerController_1.getSwagger; } });
exports.routes = [
    {
        path: '/docs',
        method: 'get',
        handler: swaggerController_1.getSwagger,
    },
];
