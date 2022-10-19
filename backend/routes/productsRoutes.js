import express from "express";
const router = express.Router();
import {
  getProducts,
  getProductById,
  getProductReviews,
  createProductReview,
  deleteProductReviews,
} from "../controllers/productController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/reviews").get(protect, getProductReviews).delete(protect, deleteProductReviews);
router.route("/review/:id").put(protect, createProductReview);
router.route("/").get(getProducts);
router.route("/:id").get(getProductById);

export default router;
