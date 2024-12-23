"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = require("express");
const Blog_controller_1 = require("./Blog.controller");
const roleCheck_1 = __importDefault(require("../../middlewares/roleCheck"));
const router = (0, express_1.Router)();
router.post('/create', (0, roleCheck_1.default)('admin'), Blog_controller_1.BlogController.creteBlog);
router.get('/all', Blog_controller_1.BlogController.getBlogs);
exports.BlogRoutes = router;
