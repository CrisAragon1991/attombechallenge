"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserFireStoreRepository = void 0;
const User_1 = require("../../domain/user/User");
const tsyringe_1 = require("tsyringe");
const firebase_admin_1 = __importDefault(require("firebase-admin"));
let UserFireStoreRepository = class UserFireStoreRepository {
    constructor() {
        this.collectionName = 'users';
    }
    collection() {
        return firebase_admin_1.default.firestore().collection(this.collectionName);
    }
    async save(user) {
        const data = {
            email: user.email,
            createdAt: firebase_admin_1.default.firestore.Timestamp.fromDate(user.createdAt),
        };
        const id = user.id ?? this.collection().doc().id;
        await this.collection().doc(id).set(data, { merge: true });
    }
    async findByEmail(email) {
        const q = await this.collection().where('email', '==', email).limit(1).get();
        if (q.empty)
            return null;
        const doc = q.docs[0];
        const data = doc.data();
        return new User_1.User({
            id: doc.id,
            email: data.email,
            createdAt: data.createdAt && typeof data.createdAt.toDate === 'function' ? data.createdAt.toDate() : new Date(data.createdAt),
        });
    }
};
exports.UserFireStoreRepository = UserFireStoreRepository;
exports.UserFireStoreRepository = UserFireStoreRepository = __decorate([
    (0, tsyringe_1.injectable)()
], UserFireStoreRepository);
