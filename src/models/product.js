import mongoose, { Schema, model } from "mongoose";

const productSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Por favor digite el nombre del producto"],
      maxLength: [200, "Nombre del producto no puede exceder 200 caracteres"],
    },
    price: {
      type: Number,
      required: [true, "Por favor ingrese el precio del producto"],
      maxLength: [5, "Precio del Producto no puede exceder de 5 digitos"],
      default: 0.0,
    },
    description: {
      type: String,
      required: [true, "Por favor ingrese la descripcion del producto"],
    },
    ratings: {
      type: Number,
      default: 0,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    category: {
      type: String,
      required: [true, "Por favor selecciona una categoria para este producto"],
      enum: {
        values: [
          "Electronica",
          "Camaras",
          "Laptops",
          "Accessorios",
          "Audifonos",
          "Comida",
          "Libros",
          "Ropa/Zapatos",
          "Belleza/Salud",
          "Deportes",
          "Aire Libre",
          "Hogar",
        ],
        message: "Por Favor selecciona una categoria correcta",
      },
    },
    vendedor: {
      type: String,
      required: [true, "Por Favor selecciona el vendedor"],
    },
    stock: {
      type: Number,
      required: [true, "Por favor ingresa el stock"],
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },

        rating: {
          type: Number,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
export default model("Product", productSchema);
