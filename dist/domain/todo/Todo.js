"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
class Todo {
    constructor(props) {
        this.props = { ...props };
    }
    get id() {
        return this.props.id;
    }
    get name() {
        return this.props.name;
    }
    get description() {
        return this.props.description;
    }
    get createdAt() {
        return this.props.createdAt;
    }
    get updatedAt() {
        return this.props.updatedAt;
    }
    get stateId() {
        return this.props.stateId;
    }
    update(fields) {
        if (fields.name !== undefined)
            this.props.name = fields.name;
        if (fields.description !== undefined)
            this.props.description = fields.description;
        if (fields.stateId !== undefined)
            this.props.stateId = fields.stateId;
        this.props.updatedAt = new Date();
    }
    toJSON() {
        return { ...this.props };
    }
}
exports.Todo = Todo;
