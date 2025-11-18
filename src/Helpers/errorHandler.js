/**
 * Crea y devuelve un objeto de error con código de estado.
 * @param {string} message - El mensaje de error.
 * @param {number} statusCode - El código de estado HTTP.
 * @returns {Error} Un objeto Error extendido.
 */
export const createErrorHandler = (message, statusCode) => {
  // 1. Crea un nuevo objeto Error
  const error = new Error(message);

  // 2. Adjunta las propiedades personalizadas
  error.statusCode = statusCode;
  error.name = "ErrorHandler";

  // 3. Opcional: Limpia el stack trace (solo si es necesario para compatibilidad)
  if (Error.captureStackTrace) {
    // En una función de fábrica, no es tan común como en una clase,
    // ya que el stack trace por defecto generalmente es suficiente.
    // error.stack = (new Error()).stack; // Alternativa simple
  }

  return error;
};
