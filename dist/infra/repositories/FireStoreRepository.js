"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FireStoreRepository = void 0;
const Todo_1 = require("../../domain/todo/Todo");
const tsyringe_1 = require("tsyringe");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let FireStoreRepository = class FireStoreRepository {
    constructor() {
        this.collectionName = 'todos';
        this.inicialized = false;
        // In production (Cloud Run) the runtime will have Application Default
        // Credentials when the service account is attached to the service. In CI
        // we authenticate earlier in the workflow (credentials_json) so calling
        // initializeApp without params uses ADC. For local dev you can set
        // GOOGLE_APPLICATION_CREDENTIALS to point to your JSON file.
        try {
            firebase_admin_1.default.initializeApp();
            this.inicialized = true;
        }
        catch (err) {
            if (err && String(err).includes('already exists')) {
                this.inicialized = true;
            }
            else {
                throw new Error('Failed to initialize firebase-admin. Set GOOGLE_APPLICATION_CREDENTIALS for local dev or ensure Cloud Run has a service account with Firestore access.');
            }
        }
    }
    collection() {
        return firebase_admin_1.default.firestore().collection(this.collectionName);
    }
    async save(todo) {
        const firestore = firebase_admin_1.default.firestore();
        const data = {
            name: todo.name,
            description: todo.description ?? null,
            createdAt: firebase_admin_1.default.firestore.Timestamp.fromDate(todo.createdAt),
            updatedAt: firebase_admin_1.default.firestore.Timestamp.fromDate(todo.updatedAt),
            stateId: todo.stateId,
        };
        await this.collection().doc(todo.id).set(data, { merge: true });
    }
    async findById(id) {
        const doc = await this.collection().doc(id).get();
        if (!doc.exists)
            return null;
        const data = doc.data();
        return new Todo_1.Todo({
            id: doc.id,
            name: data.name,
            description: data.description ?? undefined,
            createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
            updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : new Date(data.updatedAt),
            stateId: data.stateId,
        });
    }
    async findAll() {
        const snap = await this.collection().get();
        const result = [];
        snap.forEach(doc => {
            const data = doc.data();
            result.push(new Todo_1.Todo({
                id: doc.id,
                name: data.name,
                description: data.description ?? undefined,
                createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
                updatedAt: data.updatedAt && typeof data.updatedAt.toDate === 'function' ? data.updatedAt.toDate() : new Date(data.updatedAt),
                stateId: data.stateId,
            }));
        });
        return result;
    }
    async update(todo) {
        // Keep semantics simple: reuse save which does a merge
        await this.save(todo);
    }
    async delete(id) {
        await this.collection().doc(id).delete();
    }
};
exports.FireStoreRepository = FireStoreRepository;
exports.FireStoreRepository = FireStoreRepository = __decorate([
    (0, tsyringe_1.injectable)(),
    __metadata("design:paramtypes", [])
], FireStoreRepository);
