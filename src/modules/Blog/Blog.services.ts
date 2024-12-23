import { BlogModel } from "./Blog.model";

const createBlog = async (req:Request) => {


    const blogData = req.body;


    const result = await BlogModel.create({
        ...blogData,
        author : req.user?._id 
    });

    return result;

};

const getBlogs = async (page:string, perPage:string) => {
    
    const pages = parseInt(page);
    const perPages = parseInt(perPage);

    const result = await BlogModel.find().skip(pages * perPages).limit(perPages).populate('author');
    
    return result;


};

export const BlogService = {
    createBlog,
    getBlogs
};