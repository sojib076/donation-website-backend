

import mongoose, { Document, Schema } from "mongoose";

export interface IPayment extends Document {
  amount: number;
  createdAt?: Date;
  userID?: mongoose.Types.ObjectId; 
  donationID: mongoose.Types.ObjectId;
}

const PaymentSchema: Schema = new Schema({
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  userID: { type: Schema.Types.ObjectId, ref: "User",  }, 
  donationID: { type: Schema.Types.ObjectId, ref: "Donation", required: true },
});

export const Payment = mongoose.model<IPayment>("Payment", PaymentSchema);
