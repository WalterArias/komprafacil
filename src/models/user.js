import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor ingresa el nombre"],
      maxLength: [50, "el nombre no debe exceder de 50 caracteres"],
    },
    email: {
      type: String,
      required: [true, "Por favor ingresa el email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Por favor ingresa el email"],
      minlength: [8, "password debe ser minimo de 8 caracteres"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  {
    timestamps: true,
  }
);

//encriptar clave antes de guardar usuario
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// devuelve el token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
};

// Compara password
userSchema.methods.comparePassword = async function (passwordEnviado) {
  return await bcrypt.compare(passwordEnviado, this.password);
};

// Genera token para reset del password
userSchema.methods.getResetPasswordToken = function () {
  // Genera token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashea y actualiza token
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // pone tiempo de expiracion del token
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

export default model("User", userSchema);
