import { model, Schema } from "mongoose";
import { IBlog } from "./Blog.interface";

const BlogSchema = new Schema<IBlog>({
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    campaign: { type: Schema.Types.ObjectId, ref: 'Donation' },
    category: { type: String, required: true },
    image: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    isPublished: { type: Boolean, default: true },
    views: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    
});

export const BlogModel = model<IBlog>('Blog', BlogSchema);