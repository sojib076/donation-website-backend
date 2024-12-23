"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogModel = void 0;
const mongoose_1 = require("mongoose");
const BlogSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    campaign: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Donation' },
    category: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});
exports.BlogModel = (0, mongoose_1.model)('Blog', BlogSchema);
