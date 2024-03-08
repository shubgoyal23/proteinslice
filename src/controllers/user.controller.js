import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../modles/user.models.js";
import jwt from "jsonwebtoken";

const generateAccessAndRefereshTokens = async (user) => {
  try {
    const refreshToken = user.generateRefreshToken();
    const accessToken = user.generateAccessToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { refreshToken, accessToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

const createuser = asyncHandler(async (req, res) => {
  const { email, password, fullname, phone } = req.body;
  if (!(email && password && fullname && phone)) {
    throw new ApiError(401, "All feilds are required");
  }

  const checkuser = await User.findOne({
    $or: [{ email }, { phone }],
  });

  if (checkuser) {
    throw new ApiError(401, "user with email or Phone already exists");
  }

  const Creatuser = await User.create({
    email,
    phone,
    fullname,
    phone,
    password,
  });

  const user = await User.findById(Creatuser._id).select("-password");

  if (!user) {
    throw new ApiError(500, "user Creation failed try again later");
  }

 return res
    .status(200)
    .json(new ApiResponse(200, user, "user registered Succesfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(401, "Email and Password is Required");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Email or Password not Correct");
  }

  const checkPass = await user.isPassCorrect(password);

  if (!checkPass) {
    throw new ApiError(404, "Email or Password not Correct");
  }

  const userlogin = await User.findById(user._id);

  const { accessToken, refreshToken } =
    await generateAccessAndRefereshTokens(userlogin);

  const userData = await User.findById(user._id)?.select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { userData, refreshToken, accessToken },
        "Logged in Successful"
      )
    );
});

const logoutuser = asyncHandler(async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $unset: {
        refreshToken: 1,
      },
    },
    {
      new: true,
    }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "user logged out succussfully"));
});

const changePassword = asyncHandler(async (req, res) => {
  const { password, newPassword } = req.body;

  if (!(password && newPassword)) {
    throw new ApiError(401, "password and new Password is required");
  }

  const user = await User.findById(req?.user?._id);

  const checkPass = await user.isPassCorrect(password);

  if (!checkPass) {
    throw new ApiError(401, "Old Password is incorrect");
  }
  user.password = newPassword;
  await user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

const currentUser = asyncHandler(async (req, res) => {
  try {
    const accessToken = req?.cookies?.accessToken || req.body?.accessToken;

    const decodetoken = jwt.verify(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    const user = await User.findById(decodetoken._id)?.select(
      "-password -refreshToken"
    );

    if (!user) {
      throw new ApiError(404, "user not found");
    }

    return res
      .status(200)
      .json(new ApiResponse(200, user, "User fetched successfully"));
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res
        .status(200)
        .json(new ApiResponse(401, {}, "Access Token Expired"));
    }
   throw new ApiError(404, "failed to get userDate try Refreshing page")
  }
});

const updateDetails = asyncHandler(async (req, res) => {
  const { fullname, email, phone } = req.body;

  const user = await User.findById(req.user?._id)?.select(
    "-password -refreshToken"
  );
  if (fullname) user.fullname = fullname;
  if (email) {
    const checkEmail = await User.findOne({ email });
    if (checkEmail) {
      throw new ApiError(401, "Email already Registered");
    }
    user.email = email;
  }

  if (phone) {
    const checkPhone = await User.findOne({ phone });
    if (checkPhone) {
      throw new ApiError(401, "Phone already Registered");
    }
    user.phone = phone;
  }

  user.save({ validateBeforeSave: true });

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

const refereshTokens = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body.refreshToken;

  if (!token) {
    throw new ApiError(401, "Refresh token is required");
  }

  try {
    const decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const user = await User.findById(decodedToken?._id)

    if (!user) {
      throw new ApiError(401, "Refresh token is invalid");
    }

    if (token !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }

    const { accessToken, refreshToken } =
      await generateAccessAndRefereshTokens(user);

    const options = {
      httpOnly: true,
      secure: true,
    };

   return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, refreshToken},
          "access Token refreshed Successful"
        )
      );
  } catch (error) {
    throw new ApiError(401, "invalid token or Expired");
  }
});

export {
  createuser,
  loginUser,
  logoutuser,
  changePassword,
  currentUser,
  updateDetails,
  refereshTokens,
};
