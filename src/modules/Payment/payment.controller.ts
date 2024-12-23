import httpStatus from "http-status";
import { asyncHandler } from "../../utils/asyncHandler";
import sendResponse from "../../utils/sendResponse";
import paymentServices from "./payment.services";


const createpayment = asyncHandler(async (req, res) => {

    const result = await paymentServices.createpayment(req);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'payment created successfully',
        data: result,
    });

});
const createinvoice = asyncHandler(async (req, res) => {
    
        const result = await paymentServices.createinvoice(req);
    
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: 'invoice created successfully',
            data: result,
        });
});

export default {
    createpayment,
    createinvoice
};