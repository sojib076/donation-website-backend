"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationModel = void 0;
const mongoose_1 = require("mongoose");
const DonationSchema = new mongoose_1.Schema({
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive', 'completed'], default: 'active' },
    image: { type: String },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    progress: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    description: { type: String, trim: true },
});
exports.DonationModel = (0, mongoose_1.model)('Donation', DonationSchema);
