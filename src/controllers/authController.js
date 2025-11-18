import { sendToken } from "../Helpers/sendToken.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../Helpers/emailPlantilla.js";

// Register a user   => /api/v1/register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
    });
    // const token = user.getJwtToken();

    // res.status(200).json({
    //   success: true,
    //   token,
    //   user,
    // });
    sendToken(user, 200, res);
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// // Login User  =>  /a[i/v1/login
export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  //verifica campos llenos
  if (!email || !password) {
    throw new Error("Email o Password no ingresados");
  }

  //valida contra la BD
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new Error("Email o Password No EXISTE");
  }

  const siCoincidePassword = await user.comparePassword(password);

  if (!siCoincidePassword) {
    throw new Error("Password no coincide");
  }
  sendToken(user, 200, res);
};

//logout

export const logout = async (req, res, next) => {
  //limpiamos y quitamos la vida util a la cookie
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).send({
    message: "Logged Out !",
  });
};

//recuperar clave
export const recuperarClave = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  //verifica campos llenos
  if (!user) {
    throw new Error("Email  no ingresados");
  }
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/password/reset/${resetToken}`;
  const message = getResetPasswordTemplate(user?.name, resetUrl);

  const resetToken = await user.getResetPasswordToken(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Recuperacion de clave de KompraFacil",
      message,
    });
    res.status(200).send({
      message: `email enviado a ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    throw new Error("error de envio");
  }
};
