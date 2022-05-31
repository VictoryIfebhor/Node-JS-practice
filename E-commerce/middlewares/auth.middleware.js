import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  ForbiddenError,
  UnauthenticatedError,
} from "../errors/custom-errors.js";

export const authMiddleware = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (!token) {
    throw new UnauthenticatedError("Not authenticated");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      throw new UnauthenticatedError("Not authenticated");
    }
    req.user = user;
  } catch (error) {
    throw new UnauthenticatedError("Could not authenticate user");
  }
  next();
};

export const permit = (...roles) => {
  return (req, res, next) => {
    if (roles.includes("self") && req.user._id.toString() === req.params.id) {
      return next();
    }
    if (roles.includes(req.user.role)) {
      return next();
    }
    throw new ForbiddenError("User not allow to perform this action");
  };
};
