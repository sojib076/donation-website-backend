import httpStatus from "http-status";
import sendResponse from "../../utils/sendResponse";
import { BlogService } from "./Blog.services";
import { Request, Response } from "express";

const creteBlog = async (req: Request, res: Response) => {

  
    const result = await BlogService.createBlog(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: ' Blogs created successfully',
        data:  result
      });
};


const getBlogs = async (req: Request, res: Response) => {
    const { page, perPage } = req.query;
    const result = await BlogService.getBlogs(page as string, perPage as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Blogs fetched successfully',
        data: result,
    });
};

export const BlogController = {
    creteBlog,
    getBlogs
};