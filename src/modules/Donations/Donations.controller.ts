import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import { DonationsService } from "./Donations.services";


const createDonation = asyncHandler(async (req, res) => {
 
      const imageFile = req?.file?.path as string;
     
    const result = await DonationsService.createDonation(req.body,imageFile);
  
    if (!result) {
  
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Donation not created!',
      data: {},
    });
     
    }
   
   
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Donations created successfully',
      data: {}
    }); 
});

const  getDonations = asyncHandler(async (req, res) => {
    const { page, limit } = req.query;
    const pageStr = typeof page === 'string' ? page : '';
    const limitStr = typeof limit === 'string' ? limit : '';
    const result = await DonationsService.getDonations(pageStr, limitStr);
  
    if (!result) {
  
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Donations not found!',
      data: {},
    });
     
    }
   
   
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' Donations fetched successfully',
      data: result,
    }); 
});

const deleteDonation = asyncHandler(async (req, res) => {

  const { id } = req.params;
  const result = await DonationsService.deleteDonation(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Donation not deleted!',
      data: {},
    });
  } 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation deleted successfully',
    data: {},
  });
});


const markDonationAsCollected = asyncHandler(async (req, res) => {
      
    const { id } = req.params;
    const result = await DonationsService.markDonationAsCollected(id);
  
    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.NOT_FOUND,
        success: false,
        message: 'Donation not marked as collected!',
        data: {},
      });
    } 
  
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Donation marked as collected successfully',
      data: {},
    });
});
const getSingleDonation = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await DonationsService.getSingleDonation(id);

  if (!result) {
    return sendResponse(res, {
      statusCode: httpStatus.NOT_FOUND,
      success: false,
      message: 'Donation not found!',
      data: {},
    });
  } 

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Donation fetched successfully',
    data: result,
  });
});

export const DonationsController = {
    createDonation,
    getDonations,
    deleteDonation,
    markDonationAsCollected,
    getSingleDonation
};