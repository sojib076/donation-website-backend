"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationsRoute = void 0;
const express_1 = require("express");
const Donations_controller_1 = require("./Donations.controller");
const roleCheck_1 = __importDefault(require("../../middlewares/roleCheck"));
const user_utils_1 = require("../User/user.utils");
const multer_config_1 = require("../../middlewares/multer.config");
const router = (0, express_1.Router)();
router.post("/create-donation", multer_config_1.multerUpload.single('image'), (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), Donations_controller_1.DonationsController.createDonation);
router.get("/get-donations", Donations_controller_1.DonationsController.getDonations);
router.get("/get-donation/:id", Donations_controller_1.DonationsController.getSingleDonation);
router.delete("/delete-donation/:id", (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), Donations_controller_1.DonationsController.deleteDonation);
router.patch("/mark-donation-as-collected/:id", (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), Donations_controller_1.DonationsController.markDonationAsCollected);
exports.DonationsRoute = router;
