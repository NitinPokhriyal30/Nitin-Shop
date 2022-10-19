import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import Product from "../model/productModel.js";

// @desc    Admin get all users
// @route   GET /api/admin/users
// @access  Private/Admin
const allUsers = asyncHandler(async (req, res) => {
  const user = await User.find();

  res.json(user);
});

// @desc    Admin get user
// @route   GET /api/admin/user/:id
// @access  Private/Admin
const getUsersDetail = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error(`User does not found by id: ${req.params.id}`);
  } else {
    res.json(user);
  }
});

// @desc    Admin update user
// @route   Put /api/admin/user/update/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  const { name, email, isAdmin } = req.body;

  if (!name || !email || !isAdmin) {
    res.status(404);
    throw new Error("Please enter name email & role");
  } else {
    const userNewData = {
      name,
      email,
      isAdmin,
    };

    const user = await User.findByIdAndUpdate(req.params.id, userNewData, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });

    res.json(user);
  }
});

// @desc    Admin delete user
// @route   Put /api/admin/user/delete/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    res.status(400);
    throw new Error(`User does not found by id: ${req.params.id}`);
  } else {
    await user.remove();
    res.json(`user ${user.name} deleted id: ${req.params.id}`);
  }
});

// @desc    Create new product
// @route   Post /api/admin/product/create
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: "Sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "Sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
  });

  const createdProduct = await product.save();

  res.status(201).json(createdProduct);
});

// @desc    Update product
// @route   Put /api/admin/product/update/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } =
    req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

export {
  allUsers,
  getUsersDetail,
  updateUser,
  deleteUser,
  createProduct,
  updateProduct,
  deleteProduct,
};
