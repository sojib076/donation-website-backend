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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsService = void 0;
const Images_model_1 = require("../Images/Images.model");
const Donations_model_1 = require("./Donations.model");
const createDonation = (payload, imageFile, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Donations_model_1.DonationModel.create(Object.assign(Object.assign({}, payload), { image: imageFile }));
    yield Images_model_1.ImageModel.create({
        name: fileName,
        url: imageFile
    });
    return result;
});
const getDonations = (pagestring, limitstring) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(pagestring, 10);
    const limit = parseInt(limitstring, 10);
    const skip = (page - 1) * limit;
    // Fetch paginated results
    const result = yield Donations_model_1.DonationModel.find({
        status: 'active',
    })
        .skip(skip)
        .limit(limit);
    const totalDonations = (yield Donations_model_1.DonationModel.countDocuments({ status: 'active' }));
    return {
        currentPage: page,
        limit,
        totalDonations,
        totalPages: Math.ceil(totalDonations / limit),
        donations: result,
    };
});
const deleteDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Donations_model_1.DonationModel.findByIdAndUpdate(id, {
        status: 'inactive',
    });
    return result;
});
const markDonationAsCollected = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const findDonation = yield Donations_model_1.DonationModel.findById(id);
    if (!findDonation) {
        return null;
    }
    const targetDonation = findDonation.target;
    const result = yield Donations_model_1.DonationModel.findByIdAndUpdate(id, {
        current: targetDonation,
        progress: 100,
    });
    return result;
});
const getSingleDonation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Donations_model_1.DonationModel.findById({
        _id: id,
        stauts: 'active',
    });
    return result;
});
exports.DonationsService = {
    createDonation,
    getDonations,
    deleteDonation,
    markDonationAsCollected,
    getSingleDonation,
};
