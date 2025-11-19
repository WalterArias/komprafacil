import { sendToken } from "../helpers/sendToken.js";
import User from "../models/user.js";
import { getResetPasswordTemplate } from "../helpers/emailPlantilla.js";
import { sendEmail } from "../helpers/sendEmail.js";
import crypto from "crypto";

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
export const olvidarClave = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
  //verifica campos llenos
  if (!user) {
    throw new Error("Usuario no encontrado");
  }
  //obtenemos token reseteado
  const resetToken = await user.getResetPasswordToken();
  await user.save();

  //creamos el link para recuperar contraseña
  const resetUrl = `${process.env.FRONTEND_URL}/api/v1/cambiarclave/${resetToken}`;
  //creamos el mensaje usando la plantilla
  const message = getResetPasswordTemplate(user?.name, resetUrl);

  try {
    await sendEmail({
      email: user.email,
      subject: "Recuperacion de clave de KompraFacil",
      message,
    });
    res.status(200).send({
      success: true,
      message: `email enviado a ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};

//password reco

export const cambiarClave = async (req, res, next) => {
  //hashing del token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    throw new Error("el token del password es invalido o a expirado");
  }

  if (req.body.password !== req.body.confirmPassword) {
    throw new Error("No coinciden las claves ingresadas");
  }

  // Set nuevas credenciales
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
};

//perfil del usuario
export const getUserProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};
//actualizar mi password

export const updatePassword = async (req, res, next) => {
  //recordar que la password esta oculta desde el modelo
  const user = await User.findById(req.user.id).select("+password");

  // comparar password previos
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    throw new Error("No coinciden las claves ingresadas");
  }

  user.password = req.body.password;
  await user.save();

  sendToken(user, 200, res);
};

//actualizar datos del perfil activo

export const updateProfile = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
    };

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};
//lista todos los usuarios SOLO el admin
export const allUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};

export const getUserDetails = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};

//actualizar y borrar usuarios

export const updateUser = async (req, res, next) => {
  try {
    const newUserData = {
      name: req.body.name,
      email: req.body.email,
      role: req.body.role,
    };
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
      new: true,
    });
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};

// Delete user   =>   /api/v1/admin/user/:id
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      throw new Error("No existe el usuario !");
    }
  } catch (error) {
    res.status(404).send({
      success: false,
      error: error.message,
    });
  }
};
