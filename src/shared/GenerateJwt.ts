import jwt from 'jsonwebtoken';

const DEFAULT_TTL = '1h';

export function generateToken(email: string): string {
	const secret = process.env.JWT_SECRET || 'dev-local-secret-do-not-use-in-production';
	const payload = { email };

	// Sign using HS256 and set a short expiration for safety by default
	const token = jwt.sign(payload, secret, { algorithm: 'HS256', expiresIn: DEFAULT_TTL });
	return token;
}