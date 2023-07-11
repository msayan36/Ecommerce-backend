import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      unique: true,
      required: true,
    },
    profileDesc: {
      type: String,
      maxLength: 200,
      default: null,
    },
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/blank36/image/upload/v1689076740/profiles_tpebws.png",
    },
    products_count: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "products",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "users",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "users",
      },
    ],
    cart: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "products",
      },
    ],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        ref: "products",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Match user entered password to hashed password in database
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Encrypt password using bcrypt
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
