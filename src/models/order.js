import mongoose, { Schema, model } from "mongoose";

const orderSchema = Schema(
  {
    shippingInfo: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      phoneNo: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    orderItems: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
      },
    ],
    paymentMethod: {
      type: String,
      required: [true, "Por favor selecciona el metodo de pago"],

      enum: {
        values: ["COD", "Card"],
        message: "Por favor selecciona: COD o Tarjeta",
      },
    },
    paymentInfo: {
      id: String,
      status: String,
    },

    itemsPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    taxAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalAmount: {
      type: Number,
      required: true,
      default: 0.0,
    },
    orderStatus: {
      type: String,
      enum: { values: ["En proceso", "Enviada", "Entregada"] },
      default: "En proceso",
    },
    deliveredAt: Date,
  },
  {
    timestamps: true,
  }
);

export default model("Order", orderSchema);
