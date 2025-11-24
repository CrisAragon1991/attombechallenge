"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateId = generateId;
function generateId() {
    const uuid = crypto.randomUUID();
    return uuid;
}
