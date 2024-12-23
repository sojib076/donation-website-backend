import mongoose from "mongoose";

export  type IBlog  ={
    title:string;
    content:  string;
    campaign?: mongoose.Types.ObjectId;
    category: string;
    image: string;
    author: mongoose.Types.ObjectId;
    isPublished: boolean;
    views: number;
    createdAt: Date;
    updatedAt: Date;
  }