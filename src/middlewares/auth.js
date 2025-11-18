import user from "../models/user.js";
import jwt from "jsonwebtoken";
// const ErrorHandler = require("../utils/errorHandler");
// const catchAsyncErrors = require("./catchAsyncErrors");

// Checks if user is authenticated or not
export const isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;
  //console.log(token);
  if (!token) {
    throw new Error("para acceder al recurso debe estar logueado !");
  }

  const tokenVerificado = jwt.verify(token, process.env.JWT_SECRET);
  //console.log(tokenVerificado);
  req.user = await user.findById(tokenVerificado.id);

  next();
};

export const rolAutorizado = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new Error(
        `El Rol ${req.user.role} no esta autorizado para usar este recurso !`
      );
    }
    next()
  };
};
