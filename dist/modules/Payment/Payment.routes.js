"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentRoute = void 0;
const express_1 = require("express");
const payment_controller_1 = __importDefault(require("./payment.controller"));
const router = (0, express_1.Router)();
router.post('/createpayment', payment_controller_1.default.createpayment);
router.post('/invoice', payment_controller_1.default.createinvoice);
exports.paymentRoute = router;
