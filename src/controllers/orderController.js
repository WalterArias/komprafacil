import Order from "../models/order.js";
import Product from "../models/product.js";

export const newOrder = async (req, res, next) => {
  try {
    const {
      orderItems,
      shippingInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      paymentMethod,
      paymentInfo,
    } = req.body;

    const order = await Order.create({
      orderItems,
      shippingInfo,
      itemsPrice,
      taxAmount,
      shippingAmount,
      totalAmount,
      paymentMethod,
      paymentInfo,
      paidAt: Date.now(),
      user: req.user._id,
    });

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//obtener ordenes por id

export const getSingleOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//obtener ordenes por id para el usuario activo

export const myOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//obtiene todas las ordenes solo para el admin
export const allOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
//actualiza la orden de despacho y el stock del producto
export const updateOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      throw new Error("No hay ordenes con este codigo");
    }

    if (order.orderStatus === "Entregada") {
      throw new Error("Esta orden ya se entregó");
    }

    order.orderItems.forEach(async (item) => {
      const product = await Product.findById(item.product.toString());
      if (!product) {
        throw new Error("No existe el producto");
      }
      product.stock = product.stock - quantity;
      await product.save();
    });

    order.orderStatus = req.body.orderStatus;
    order.deliveredAt = Date.now();

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
//borrar orden por el admin

export const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      throw new Error("No existe la orden");
    }
    await order.deleteOne();
    res.status(200).json({
      success: true,
    
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
