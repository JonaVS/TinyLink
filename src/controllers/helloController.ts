import { Request, Response } from "express"

export const getHelloMessage = async (req: Request, res: Response,) => {
  res.json("Hello from TinyLink server");
};