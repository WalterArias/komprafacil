import mongoose from "mongoose";
export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
   // console.log(" Conexión a MongoDB ok !.");
  } catch (error) {
    console.error(" Error al conectar a MongoDB:", error.message);
    process.exit(1); //elimina el servicio en el server
  }
}
