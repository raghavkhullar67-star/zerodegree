import Product from "../models/Products.js";
import asyncHandler from "../utils/asyncHandler.js";

// @desc    Get all products
// @route   GET /products
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12; // Adjusted to 12 for better grid matching
  const page = Number(req.query.page) || 1;

  // Search by keyword
  const keyword = req.query.keyword
    ? {
        title: {
          $regex: req.query.keyword,
          $options: "i",
        },
      }
    : {};

  // Filter by category
  const categoryQuery = req.query.category && req.query.category !== "All" ? { category: req.query.category } : {};

  // Filter by price range
  const priceQuery = {};
  if (req.query.price_gte) priceQuery.$gte = Number(req.query.price_gte);
  if (req.query.price_lte) priceQuery.$lte = Number(req.query.price_lte);
  const finalPriceQuery = Object.keys(priceQuery).length > 0 ? { price: priceQuery } : {};

  // Sorting
  let sortQuery = { createdAt: -1 };
  if (req.query.sort === "pricelow") sortQuery = { price: 1 };
  else if (req.query.sort === "pricehigh") sortQuery = { price: -1 };
  else if (req.query.sort === "newest") sortQuery = { createdAt: -1 };

  const count = await Product.countDocuments({ ...keyword, ...categoryQuery, ...finalPriceQuery });
  const products = await Product.find({ ...keyword, ...categoryQuery, ...finalPriceQuery })
    .sort(sortQuery)
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
});

// @desc    Get single product by ID
// @route   GET /products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create a product (Admin)
// @route   POST /products
export const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, image, stock, category } = req.body;
  if (!title || !price) {
    res.status(400);
    throw new Error("Title and Price are required");
  }

  const product = new Product({ title, price, description, image, stock, category });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product (Admin)
// @route   PUT /products/:id
export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    product.title = req.body.title || product.title;
    product.price = req.body.price || product.price;
    product.description = req.body.description || product.description;
    product.image = req.body.image || product.image;
    product.stock = req.body.stock || product.stock;
    product.category = req.body.category || product.category;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Delete a product (Admin)
// @route   DELETE /products/:id
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.deleteOne();
    res.json({ message: "Product removed" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});

// @desc    Create new review
// @route   POST /products/:id/reviews
export const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400);
      throw new Error("Product already reviewed");
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);
    product.numReviews = product.reviews.length;
    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    await product.save();
    res.status(201).json({ message: "Review added" });
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});