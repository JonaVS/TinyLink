import mongoose, { Schema } from "mongoose";

export interface IUrl {
  _id: string,  
  originalUrl: string;
  shortUrl: string;
  clickCount: number,
  createdAt: Date,
  updatedAt: Date,
}

const urlSchema = new Schema<IUrl>(
  {
    _id: { type: String, required: true, unique: true }, 
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Url = mongoose.model("Url", urlSchema);