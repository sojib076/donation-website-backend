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
exports.BlogController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Blog_services_1 = require("./Blog.services");
const creteBlog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_services_1.BlogService.createBlog(req);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: ' Blogs created successfully',
        data: result
    });
});
const getBlogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, perPage } = req.query;
    const result = yield Blog_services_1.BlogService.getBlogs(page, perPage);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
});
exports.BlogController = {
    creteBlog,
    getBlogs
};
