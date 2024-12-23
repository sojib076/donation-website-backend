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
exports.imageServices = void 0;
const Images_model_1 = require("./Images.model");
const createImage = (imageFile, fileName) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Images_model_1.ImageModel.create({
        name: fileName,
        url: imageFile
    });
    return result;
});
const getImages = (pagestring, limitstring) => __awaiter(void 0, void 0, void 0, function* () {
    const page = parseInt(pagestring, 10);
    const limit = parseInt(limitstring, 10);
    const skip = (page - 1) * limit;
    const result = yield Images_model_1.ImageModel.find()
        .skip(skip)
        .limit(limit);
    const totalImages = (yield Images_model_1.ImageModel.countDocuments());
    return {
        currentPage: page,
        limit,
        totalImages,
        totalPages: Math.ceil(totalImages / limit),
        images: result,
    };
});
const deleteImage = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Images_model_1.ImageModel.findByIdAndDelete(id);
    return result;
});
exports.imageServices = {
    createImage,
    getImages,
    deleteImage
};
