const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    Fname: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
    },
    Lname: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
    },
    phone: {
      type: String, // MongoDB does not have a 'NUMBER' type, so we use String to store phone numbers
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Simple validation for a 10 digit phone number
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true, // Ensures email uniqueness within the collection
      trim: true,
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 4,
    },
    dob: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    job: {
      type: String,
      required: [true, "Job is required"],
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving if it's modified
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (error) {
    return next(error);
  }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
