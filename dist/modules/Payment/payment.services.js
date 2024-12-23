"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const Payment_model_1 = require("./Payment.model");
const Donations_model_1 = require("../Donations/Donations.model");
const createpayment = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const donationID = req.body.donationID;
    const findDonation = yield Donations_model_1.DonationModel.findById(donationID);
    if (!findDonation || findDonation.status === 'inactive') {
        throw new Error('Donation not found');
    }
    const stripe = new stripe_1.default(config_1.default.stripe_secret_key, {
        apiVersion: '2024-11-20.acacia',
    });
    const paymentIntent = yield stripe.paymentIntents.create({
        amount: payload.amount * 100,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        confirm: true,
        return_url: 'https://example.com/return',
    });
    return paymentIntent;
});
const createinvoice = (req) => __awaiter(void 0, void 0, void 0, function* () {
    const payload = req.body;
    const donationID = req.body.donationID;
    const findDonation = yield Donations_model_1.DonationModel.findById(donationID);
    if (!findDonation || findDonation.status === 'inactive') {
        throw new Error('Donation not found');
    }
    const donationTarget = findDonation.target || 0;
    const donationAmount = findDonation.current || 0;
    const newPayload = parseFloat(payload.amount);
    yield Payment_model_1.Payment.create(payload);
    const updatedDonation = yield Donations_model_1.DonationModel.findByIdAndUpdate(donationID, {
        current: donationAmount + newPayload,
        status: donationAmount + newPayload >= donationTarget ? 'inactive' : 'active',
        progress: (donationAmount + newPayload) / donationTarget * 100
    }, { new: true });
    return updatedDonation;
});
exports.default = {
    createpayment,
    createinvoice
};
