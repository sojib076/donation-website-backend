import { Router } from "express";
import { BlogController } from "./Blog.controller";
import auth from "../../middlewares/roleCheck";

const router = Router();

router.post('/create', auth('admin'), BlogController.creteBlog)
router.get('/all', BlogController.getBlogs)

export const BlogRoutes = router;