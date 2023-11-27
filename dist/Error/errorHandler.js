"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errHandler = exports.errFile = void 0;
const mainError_1 = require("./mainError");
const errFile = (err, res) => {
    res.status(mainError_1.HTTP.BAD).json({
        name: err.name,
        message: err.message,
        status: err.status,
        success: err.success,
        stack: err.stack,
        err,
    });
};
exports.errFile = errFile;
const errHandler = (err, req, res, next) => {
    (0, exports.errFile)(err, res);
};
exports.errHandler = errHandler;
