import Product from "../models/product.js";

// crea nuevo
export const newProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// obtiene todos
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

// obtiene uno por id
export const getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req?.params?.id);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//actualizar producto por admin
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no existe",
    });
  }
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};

//borrar prod

export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req?.params?.id);
  if (!product) {
    return res.status(404).json({
      error: "Producto no existe",
    });
  }
  try {
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Producto Borrado",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      error: error.message,
    });
  }
};
