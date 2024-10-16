"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorResponse = exports.successResponse = void 0;
const successResponse = (data) => ({
    statusCode: 200,
    body: JSON.stringify(data),
});
exports.successResponse = successResponse;
const errorResponse = (message, statusCode) => ({
    statusCode,
    body: JSON.stringify({ error: message }),
});
exports.errorResponse = errorResponse;
