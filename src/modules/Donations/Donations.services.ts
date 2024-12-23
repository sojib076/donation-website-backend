import { ImageModel } from "../Images/Images.model";
import { IDonation } from "./Donations.interface";
import { DonationModel } from "./Donations.model";



 const createDonation = async (payload:IDonation,imageFile:string,fileName: string) => {
   

    const result = await DonationModel.create({
        ...payload,
        image: imageFile
    });

    await ImageModel.create({
        name: fileName,
        url: imageFile
    });


     return result;

   
};

const getDonations = async (pagestring: string, limitstring: string) => {


    const page = parseInt(pagestring, 10);
    const limit = parseInt(limitstring, 10);
    const skip = (page - 1) * limit;

    
   

    // Fetch paginated results
    const result = await DonationModel.find({
        status: 'active',
    })
        .skip(skip)
        .limit(limit);
        const totalDonations =(await DonationModel.countDocuments({ status: 'active' }));

   


    return {
        currentPage: page,
        limit,
        totalDonations,
        totalPages: Math.ceil(totalDonations / limit),
      
        donations: result,
    };
};

const deleteDonation = async (id: string) => {
    const result = await DonationModel.findByIdAndUpdate(id, {
        status: 'inactive',
    });
    return result;
};

const markDonationAsCollected = async (id: string) => {
    const findDonation = await DonationModel.findById(id);
   
    if (!findDonation) {
        return null;
    }
    const targetDonation = findDonation.target
    
    const result = await DonationModel.findByIdAndUpdate(id, {
        current : targetDonation,
        progress: 100,
    })
    return result;
};

const getSingleDonation = async (id: string) => {
    const result = await DonationModel.findById({
        _id: id,
        stauts: 'active',
    });
    return result;
};




export const DonationsService = {
    createDonation,
    getDonations,
    deleteDonation,
    markDonationAsCollected,
    getSingleDonation,
};