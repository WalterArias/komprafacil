// Crea y salva un token para salvarlo en una cookie
export const sendToken = (user, statusCode, res) => {
  // Crea el token json
  const token = user.getJwtToken();

  // Opciones de la cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRES_TIME * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    token,
    user,
  });
};
