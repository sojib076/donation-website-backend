import { ImageModel } from "./Images.model";

const createImage = async ( imageFile: string, fileName: string) => {
    
   const result =  await ImageModel.create({
        name: fileName,
        url: imageFile
    });

    return result;
};

const getImages = async (pagestring: string, limitstring: string) => {
    const page = parseInt(pagestring, 10);
    const limit = parseInt(limitstring, 10);
    const skip = (page - 1) * limit;

    const result = await ImageModel.find()
        .skip(skip)
        .limit(limit);
    const totalImages = (await ImageModel.countDocuments());

    return {
        currentPage: page,
        limit,
        totalImages,
        totalPages: Math.ceil(totalImages / limit),
        images: result,
    };
};

const deleteImage = async (id: string) => {
    const result = await ImageModel.findByIdAndDelete(id);
    return result;
};

export const imageServices = {
    createImage,
    getImages,
    deleteImage
};