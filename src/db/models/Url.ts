import mongoose, { Model, Schema } from "mongoose";
import { customAlphabet } from "nanoid";

export interface IUrl {
  _id: string,  
  originalUrl: string;
  shortUrl: string;
  clickCount: number,
  createdAt: Date,
  updatedAt: Date,
}

//Interface needed for static methods
interface IUrlModel extends Model<IUrl> {
  generateId(): Promise<string>;
}

const urlSchema = new Schema<IUrl, IUrlModel>(
  {
    _id: { type: String },
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    clickCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

urlSchema.static('generateId', async function generateId() {
  const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nanoid = customAlphabet(alphabet, 6);
  return await nanoid();
});

export const Url = mongoose.model<IUrl, IUrlModel>("Url", urlSchema);