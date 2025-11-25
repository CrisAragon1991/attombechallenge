"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserRouter = createUserRouter;
const express_1 = __importDefault(require("express"));
function createUserRouter(controller) {
    const router = express_1.default.Router();
    router.post('/', async (req, res) => {
        try {
            const email = String(req.body.email);
            const user = await controller.register(email);
            const response = { success: true, data: user };
            res.status(201).json(response);
        }
        catch (err) {
            res.status(500).json({ success: false, error: String(err) });
        }
    });
    router.post('/user-search', async (req, res) => {
        try {
            const email = String(req.body.email);
            const token = await controller.login(email);
            const response = { success: true, data: { token } };
            res.json(response);
        }
        catch (err) {
            res.status(404).json({ success: false, error: String(err) });
        }
    });
    return router;
}
