import asyncHandler from "express-async-handler";
import Product from "../model/productModel.js";
import APIFeatures from "../utils/apiFeatures.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
  const resPerPage = 4;
  const productsCount = await Product.countDocuments();

  const apiFeatures = new APIFeatures(Product, req.query)
    .search()
    .filter()
    .pagination(resPerPage);

  const products = await apiFeatures.query;
  // res.status(401)
  // throw new Error('Product Not Found')
  res.json({ products, productsCount, resPerPage });
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("product not found");
  }
});

// @desc    Create new review
// @route   POST /api/products/review/:id
// @access  Private
const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  if (!rating || !comment) {
    res.status(404);
    throw new Error("Please add rating and comment");
  } else {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    const product = await Product.findById(req.params.id);

    if (product) {
      const alreadyReviewed = product.reviews.find(
        (r) => r.user.toString() === req.user._id.toString()
      );

      if (alreadyReviewed) {
        product.reviews.forEach((review) => {
          if (review.user.toString() === req.user._id.toString()) {
            review.comment = comment;
            review.rating = rating;

            res.status(201).json({ message: "Review updated" });
          }
        });
      } else {
        product.reviews.push(review);

        product.numReviews = product.reviews.length;
      }

      product.rating =
        product.reviews.reduce((acc, item) => item.rating + acc, 0) /
        product.reviews.length;

      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  }
});

// @desc    get all review
// @route   GET /api/products/reviews/:id
// @access  Private
const getProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.id);

  const reviews = product.reviews;

  res.status(200).json(reviews);
});

// @desc    delete review
// @route   DELETE /api/products/review/:id
// @access  Private
const deleteProductReviews = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {

    res.status(404);
    throw new Error("Product not found");

  } else {

    const reviews = product.reviews.filter(
      (review) => review.id.toString() !== req.query.id.toString()
    );

    const numReviews = reviews.length;

    const ratings =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;
    
    await Product.findByIdAndUpdate(
      req.query.productId,
      {
        reviews,
        ratings,
        numReviews,
      },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    product.reviews.remove();
    res.status(200).json("Review deleted successfully");

  }
});

export {
  getProducts,
  getProductById,
  createProductReview,
  getProductReviews,
  deleteProductReviews,
};
