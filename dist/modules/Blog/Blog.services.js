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
exports.BlogService = void 0;
const Blog_model_1 = require("./Blog.model");
const createBlog = (req) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const blogData = req.body;
    const result = yield Blog_model_1.BlogModel.create(Object.assign(Object.assign({}, blogData), { author: (_a = req.user) === null || _a === void 0 ? void 0 : _a._id }));
    return result;
});
const getBlogs = (page, perPage) => __awaiter(void 0, void 0, void 0, function* () {
    const pages = parseInt(page);
    const perPages = parseInt(perPage);
    const result = yield Blog_model_1.BlogModel.find().skip(pages * perPages).limit(perPages).populate('author');
    return result;
});
exports.BlogService = {
    createBlog,
    getBlogs
};
