
import { model, Schema } from "mongoose";
import { IDonation } from "./Donations.interface";

const DonationSchema = new Schema <IDonation>({
    title: { type: String, required: true, trim: true },
    status: { type: String, enum: ['active', 'inactive', 'completed'], default: 'active' },
    image: { type: String   },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    progress: { type: Number, default: 0 }, 
    createdAt: { type: Date, default: Date.now },
    description: { type: String, trim: true },
  });

  
  export const DonationModel = model<IDonation>('Donation', DonationSchema);


