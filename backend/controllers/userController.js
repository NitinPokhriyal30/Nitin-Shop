import asyncHandler from "express-async-handler";
import User from "../model/userModel.js";
import sendEmail from "../utils/sendEmail.js";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";

// @desc    Register a new user
// @route   POST /api/users/
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  } else {
    const user = await User.create({
      name,
      email,
      password,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid user data");
    }
  }
});

// @desc    Login user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("Please enter email & password");
  } else {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   Put /api/users/profile/update
// @access  Private

const updateProfile = asyncHandler(async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    res.status(404);
    throw new Error("Please enter name & email");
  } else {
    const userNewData = {
      name,
      email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, userNewData, {
      new: true,
      runValidators: true,
      useFindAndModify: true,
    });

    res.json(user);
  }
});

// @desc    Update password
// @route   Put /api/users/Password/update
// @access  Private
const updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, password } = req.body;

  const user = await User.findById(req.user._id);

  // check user previous password
  const isMatched = await user.matchPassword(oldPassword);

  if (!isMatched) {
    res.status(400);
    throw new Error("Old password is incorrect");
  } else {
    user.password = password;
    await user.save();
    res.json(user);
  }
});

// @desc    forgot password
// @route   Post /api/users/Password/forgot
// @access  Private
const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(404);
    throw new Error("Please enter email");
  } else {
    try {
      const user = await User.findOne({ email: email });

      if (!user) {
        res.status(404);
        throw new Error("User not found with this email");
      } else {
        // token generate for reset password
        const resetToken = user.getResetPasswordToken();

        await user.save({ validateBeforeSave: false });

        // Create reset password url
        const resetUrl = `${req.protocol}://${req.get(
          "host"
        )}/api/users/password/reset/${resetToken}`;

        const message = `Your password reset token is as follow:\n\n${resetUrl}\n\nIf you have not requested this email, then ignore it.`;

        try {
          await sendEmail({
            email: user.email,
            subject: "ProShop Password Recovery",
            message,
          });

          res.json(`ResetPassword sent successfully to: ${user.email}`);
        } catch (error) {
          user.resetPasswordToken = undefined;
          user.resetPasswordExpire = undefined;

          res.status(500);
          throw new Error(`Error: ${error.message}`);
        }
      }
    } catch (error) {
      res.status(404);
      throw new Error("invalid user");
    }
  }
});

// @desc    reset password
// @route   Put /api/users/Password/reset/:token
// @access  Private
const resetPassword = asyncHandler(async (req, res) => {
  const { password, confirmPassword } = req.body;

  // Decode hash url token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex ");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    res.status(404);
    throw new Error("Password reset token is invalid or has been expired");
  } else {
    if (password !== confirmPassword) {
      // checking password match
      res.status(404);
      throw new Error("Password does not match");
    } else {
      // setup new password
      user.password = password;

      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save();

      res.json('Password updated successfully');
    }
  }
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updatePassword,
  updateProfile,
  forgotPassword,
  resetPassword,
};
