"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageRoutes = void 0;
const express_1 = require("express");
const multer_config_1 = require("../../middlewares/multer.config");
const roleCheck_1 = __importDefault(require("../../middlewares/roleCheck"));
const user_utils_1 = require("../User/user.utils");
const images_controller_1 = require("./images.controller");
const router = (0, express_1.Router)();
router.post("/upload", multer_config_1.multerUpload.single('image'), (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), images_controller_1.imageController.createImage);
router.get("/", (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), images_controller_1.imageController.getImages);
router.delete("/:id", (0, roleCheck_1.default)(user_utils_1.USER_ROLE.admin), images_controller_1.imageController.deleteImage);
exports.imageRoutes = router;
