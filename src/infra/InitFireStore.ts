
import admin from 'firebase-admin';
import fs from 'fs';

export class InitFireStore {

    private serviceAccount;

    constructor() {
        const localFilePath = require('path').resolve(__dirname, '../../atomchatchallengecredentials.json');
        if (
            fs.existsSync(localFilePath) ||
            process.env.USELOCALFILE === 'true'
            
        ) {
            const serviceAccountLocal = require(localFilePath);
            this.serviceAccount = serviceAccountLocal;
        } else {
            this.serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT as string);
        }
        try {
            this.serviceAccount.private_key = this.serviceAccount.private_key.replace(/\\n/g, '\n');
            admin.initializeApp({
                credential: admin.credential.cert(this.serviceAccount),
            });
        } catch (err) {
            if (err && String(err).includes('already exists')) {
            } else {
                throw new Error(
                    'Failed to initialize firebase-admin. Set GOOGLE_APPLICATION_CREDENTIALS for local dev or ensure Cloud Run has a service account with Firestore access.'
                );
            }
        }
    }
}