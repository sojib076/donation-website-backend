import { model, Schema } from "mongoose";

const image = new Schema({
    name: { type: String, },
    url: { type: String,  },
  })


  export const ImageModel = model('Image', image);