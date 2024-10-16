"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logError = logError;
function logError(message, error) {
    console.error(`[ERROR] ${message}`, error);
}
