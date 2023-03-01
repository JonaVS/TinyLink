import mongoose, { Schema } from "mongoose";

export interface Link {
  _id: string,  
  originalUrl: string;
  shortUrl: string;
  clickCount: number,
  createdAt: Date,
  updatedAt: Date,
}

const linkSchema = new Schema<Link>(
  {
    _id: { type: String, required: true }, 
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Link = mongoose.model("Link", linkSchema);