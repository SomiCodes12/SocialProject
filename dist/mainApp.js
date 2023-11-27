"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const usersRouter_1 = __importDefault(require("./Router/usersRouter"));
const appConfig = (app) => {
    app
        .use((0, cors_1.default)())
        .use(express_1.default.json())
        .use("/api/v1", usersRouter_1.default)
        .get("/", (req, res) => {
        try {
            return res.status(200).json({
                message: "Welcome 😊😊"
            });
        }
        catch (error) {
            return res.status(400).json({
                message: "An Error Occured"
            });
        }
    });
};
exports.appConfig = appConfig;
