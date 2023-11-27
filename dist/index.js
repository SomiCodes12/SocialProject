"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mainApp_1 = require("./mainApp");
const port = 1234;
const app = (0, express_1.default)();
(0, mainApp_1.appConfig)(app);
const server = app.listen(port, () => {
    console.log("Server Live");
});
