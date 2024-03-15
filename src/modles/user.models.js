import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      minLength: [3, "The minimum length of a name should be 3 characters."],
      maxLength: [
        16,
        "The Maximum length of a name should be less then 16 characters.",
      ],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: true,
      index: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      required: [true, "password is Required"],
      validate: {
        validator: function (v) {
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            v
          );
        },
        message: (props) =>
          `Password must be at least 8 characters long and contain at least one lowercase letter, one uppercase letter, one digit, and one special character.`,
      },
    },
    phone: {
      type: String,
      required: [true, "Phone Number is Required"],
      trim: true,
      unique: true,
      index: true,
      validate: {
        validator: function (v) {
          return /^\+(?:[0-9] ?){10,11}[0-9]$/.test(v);
        },
        message: (props) => `Phone Number is invalid`,
      },
    },
    phoneVerification: {
      type: Boolean,
      default: false,
    },
    emailVerification: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
      },
    ],
    type: {
      type: String,
      default: "customer"
    },
    address: {
      house: String,
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    wishlist: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }],
    cart: [{
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
      },
      quantity: Number
    }]
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPassCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function() {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function() {
    return jwt.sign(
        {
            _id: this._id,
            
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
};

export const User = mongoose.model("User", userSchema)