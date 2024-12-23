
import Stripe from "stripe";
import config from "../../config";
import { Request } from "express";
import { Payment } from "./Payment.model";
import { DonationModel } from "../Donations/Donations.model";


const createpayment = async (req: Request) => {
    const payload = req.body;
   
    const donationID = req.body.donationID;

    const findDonation = await DonationModel.findById(donationID);
  

    if (!findDonation || findDonation.status === 'inactive') {
        throw new Error('Donation not found');
    }

    const stripe = new Stripe(config.stripe_secret_key as string, {
        apiVersion: '2024-11-20.acacia',
    });

    const paymentIntent = await stripe.paymentIntents.create({
        amount: payload.amount * 100,
        currency: 'usd',
        payment_method: 'pm_card_visa',
        confirm: true,
        return_url: 'https://example.com/return',
    });
    return paymentIntent;

};
const  createinvoice = async (req: Request) => {
    const payload = req.body;
    const donationID = req.body.donationID;

    const findDonation = await DonationModel.findById(donationID);
    if (!findDonation || findDonation.status === 'inactive') {
        throw new Error('Donation not found');
    }

    const donationTarget = findDonation.target  || 0;
    const donationAmount =  findDonation.current || 0;
   
    const newPayload =  parseFloat(payload.amount);


    await Payment.create(payload);

    const updatedDonation = await DonationModel.findByIdAndUpdate(
        donationID,
        {
            current: donationAmount + newPayload,
            status: donationAmount + newPayload >= donationTarget ? 'inactive' : 'active',
            progress : (donationAmount + newPayload) / donationTarget * 100
        },
        { new: true }
    );

    return updatedDonation;
};


export default {
    createpayment,
    createinvoice
};

