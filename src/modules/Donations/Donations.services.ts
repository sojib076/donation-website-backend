import { IDonation } from "./Donations.interface";
import { DonationModel } from "./Donations.model";



 const createDonation = async (payload:IDonation,imageFile:string) => {
    
    
    const result = await DonationModel.create({
        ...payload,
        image: imageFile
    });
     return result;

   
};

const getDonations = async (pagestring: string, limitstring: string) => {


    const page = parseInt(pagestring, 10);
    const limit = parseInt(limitstring, 10);
    const skip = (page - 1) * limit;

    // Get total count of donations
   

    // Fetch paginated results
    const result = await DonationModel.find({
        status: 'active',
    })
        .skip(skip)
        .limit(limit);
        const totalDonations =(await DonationModel.countDocuments({ status: 'active' }));

    // Check if there are more donations


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
    console.log(findDonation);
    if (!findDonation) {
        return null;
    }
    const targetDonation = findDonation.target
    console.log(targetDonation);
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