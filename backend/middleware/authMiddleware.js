import jwt from "jsonwebtoken";
import User from "../model/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
      try {
        
      token = req.headers.authorization.split(" ")[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decode.id).select('-password');

      next();
      } catch (error) {
          console.log(`Error: ${error}`);
          res.status(401)
          throw new Error(`Not authorized, token failed`);
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token found");
  }

});

const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as an admin");
  }
});

export { protect, admin };
