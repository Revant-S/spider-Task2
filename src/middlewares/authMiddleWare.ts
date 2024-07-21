import { NextFunction, Request, Response } from "express";
import jwt , { JwtPayload }  from "jsonwebtoken";
import config from "config"
import { Types } from "mongoose";


export interface UserRequest extends Request {
  userJwtPayLoad: UserDetails
}

export interface UserDetails extends JwtPayload {
  id: Types.ObjectId;
  email: string;
}

export function authoriseUser(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(404).redirect("/auth/signin");
  }
  
  try {
    const verifiedJwtPayLoad = jwt.verify(token, config.get("JWT_SECRET_KEY"));
    if (typeof verifiedJwtPayLoad === 'object' && 'id' in verifiedJwtPayLoad && 'email' in verifiedJwtPayLoad) {
      (req as UserRequest).userJwtPayLoad = verifiedJwtPayLoad as UserDetails;
      next();
    } else {
        return res.clearCookie(token)
    }
  } catch (error) {
    return res.status(401).clearCookie(token).redirect("/auth/signin");
  }
}