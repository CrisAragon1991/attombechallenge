"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(props) {
        this.id = props.id;
        this.email = props.email;
        this.createdAt = props.createdAt ?? new Date();
    }
}
exports.User = User;
