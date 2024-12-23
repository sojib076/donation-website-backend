"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const mongoose_1 = require("mongoose");
const image = new mongoose_1.Schema({
    name: { type: String, },
    url: { type: String, },
});
exports.ImageModel = (0, mongoose_1.model)('Image', image);
