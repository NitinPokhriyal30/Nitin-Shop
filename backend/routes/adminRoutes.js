import express from "express";
const router = express.Router();
import {
  allUsers,
  getUsersDetail,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/users").get(protect, admin, allUsers);
router.route("/user/:id").get(protect, admin, getUsersDetail);
router.route("/user/update/:id").get(protect, admin, updateUser);
router.route("/user/delete/:id").delete(protect, admin, deleteUser);
router.route("/product/create").post(protect, admin, createProduct);
router.route("/product/update/:id").put(protect, admin, updateProduct);
router.route("/product/delete/:id").delete(protect, admin, deleteProduct);

export default router;
