"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const DEFAULT_TTL = '1h';
function generateToken(email) {
    const secret = process.env.JWT_SECRET || 'dev-local-secret-do-not-use-in-production';
    const payload = { email };
    // Sign using HS256 and set a short expiration for safety by default
    const token = jsonwebtoken_1.default.sign(payload, secret, { algorithm: 'HS256', expiresIn: DEFAULT_TTL });
    return token;
}
