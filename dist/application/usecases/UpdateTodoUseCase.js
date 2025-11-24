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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateTodoUseCase = void 0;
const tsyringe_1 = require("tsyringe");
const diTokens_1 = require("../../shared/diTokens");
let UpdateTodoUseCase = class UpdateTodoUseCase {
    constructor(repo) {
        this.repo = repo;
    }
    async execute(input) {
        const existing = await this.repo.findById(input.id);
        if (!existing)
            throw new Error('Todo not found');
        existing.update({
            name: input.name,
            description: input.description,
            stateId: input.stateId,
        });
        await this.repo.update(existing);
        return existing;
    }
};
exports.UpdateTodoUseCase = UpdateTodoUseCase;
exports.UpdateTodoUseCase = UpdateTodoUseCase = __decorate([
    (0, tsyringe_1.injectable)(),
    __param(0, (0, tsyringe_1.inject)(diTokens_1.TOKENS.ITodoRepository)),
    __metadata("design:paramtypes", [Object])
], UpdateTodoUseCase);
