import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { imageServices } from "./images.services";

const createImage = asyncHandler(async (req, res) => {

    const fileName = req?.body?.name as string;
  
    const imageFile = req?.file?.path as string;

    await imageServices.createImage(imageFile, fileName);

    
  
    
  
  
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Donations created successfully',
      data: {}
    });
  });




const getImages = asyncHandler(async (req, res) => {
    const { page, perPage } = req.query;
  
    const result = await imageServices.getImages(page as string, perPage as string);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Images fetched successfully',
        data: result,
    });
});

const deleteImage = asyncHandler(async (req, res) => {
    const { id } = req.params;
    console.log(id ,'id');
    await imageServices.deleteImage(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Image deleted successfully',
        data: {},
    });
});

export const imageController = {
    createImage,
    getImages,
    deleteImage
};