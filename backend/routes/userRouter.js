import express from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  updateProfile,
  registerUser,
  updatePassword,
  forgotPassword,
  resetPassword,
} from "../controllers/userController.js";
import {protect } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser);
router.route("/login").post(authUser);
router.route("/profile").get(protect, getUserProfile);
router.route("/profile/update").put(protect, updateProfile);
router.route("/password/update").put(protect, updatePassword);
router.route("/password/forgot").post(protect, forgotPassword);
router.route("/password/reset/:token").put(protect, resetPassword);
 
export default router;
