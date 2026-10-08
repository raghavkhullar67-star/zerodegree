import Product from "../models/Products.js";
import asyncHandler from "../utils/asyncHandler.js";

const fallbackProducts = [
  {
    _id: "660000000000000000000001",
    title: "Midnight Eclipse Overcoat",
    price: 8999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "Premium wool blend overcoat with a tailored slim fit and raw edge detailing.",
    category: "Men",
    stock: 12,
    rating: 4.9,
    numReviews: 24,
  },
  {
    _id: "660000000000000000000002",
    title: "Crimson Velvet Blazer",
    price: 6500,
    image: "https://images.unsplash.com/photo-1594938298596-af01b44ecdd2?auto=format&fit=crop&w=800&q=80",
    description: "Rich crimson velvet blazer with silk lapels for an ultra-premium evening look.",
    category: "Women",
    stock: 8,
    rating: 4.8,
    numReviews: 19,
  },
  {
    _id: "660000000000000000000003",
    title: "Urban Utility Cargo Pants",
    price: 3499,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty cotton tactical pants with adjustable straps and multi-layered pockets.",
    category: "Men",
    stock: 25,
    rating: 5.0,
    numReviews: 42,
  },
  {
    _id: "660000000000000000000004",
    title: "Silk Pearl Slip Dress",
    price: 4999,
    image: "https://images.unsplash.com/photo-1566205798485-be1fc9bd6993?auto=format&fit=crop&w=800&q=80",
    description: "Elegant silk slip dress cascading past the knees. Perfect minimal evening wear.",
    category: "Women",
    stock: 18,
    rating: 4.7,
    numReviews: 15,
  },
  {
    _id: "660000000000000000000005",
    title: "Matte Black Puffer Gilet",
    price: 5200,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    description: "Water-resistant matte black gilet filled with premium down. Boxy silhouette.",
    category: "Men",
    stock: 15,
    rating: 4.9,
    numReviews: 31,
  },
  {
    _id: "660000000000000000000006",
    title: "Vintage Wash Oversized Hoodie",
    price: 3200,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    description: "Sun-faded vintage black wash hoodie. Dropped shoulders, heavy French terry.",
    category: "Unisex",
    stock: 30,
    rating: 4.8,
    numReviews: 53,
  },
  {
    _id: "660000000000000000000007",
    title: "Ribbed Turtleneck Knit",
    price: 2899,
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&w=800&q=80",
    description: "Form-fitting ribbed classic turtleneck in an earthy stone colorway.",
    category: "Women",
    stock: 45,
    rating: 4.6,
    numReviews: 28,
  },
  {
    _id: "660000000000000000000008",
    title: "Graphite Techwind Breaker",
    price: 4500,
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight metallic zip-up windbreaker with hidden ventilation zips.",
    category: "Men",
    stock: 20,
    rating: 4.9,
    numReviews: 36,
  }
];

// @desc    Get all products
// @route   GET /products
export const getProducts = asyncHandler(async (req, res) => {
  const pageSize = Number(req.query.limit) || 12;
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

  try {
    const count = await Product.countDocuments({ ...keyword, ...categoryQuery, ...finalPriceQuery });
    let products = await Product.find({ ...keyword, ...categoryQuery, ...finalPriceQuery })
      .sort(sortQuery)
      .limit(pageSize)
      .skip(pageSize * (page - 1));

    if (!products || products.length === 0) {
      // Return fallback products if DB empty or non-seeded
      let filteredFallback = fallbackProducts;
      if (req.query.category && req.query.category !== "All") {
        filteredFallback = filteredFallback.filter(
          (p) => p.category.toLowerCase() === req.query.category.toLowerCase()
        );
      }
      return res.json({
        products: filteredFallback.slice(0, pageSize),
        page: 1,
        pages: 1,
        total: filteredFallback.length
      });
    }

    res.json({ products, page, pages: Math.ceil(count / pageSize), total: count });
  } catch (error) {
    console.error("Products query DB error, using fallback data:", error.message);
    res.json({
      products: fallbackProducts.slice(0, pageSize),
      page: 1,
      pages: 1,
      total: fallbackProducts.length
    });
  }
});

// @desc    Get single product by ID
// @route   GET /products/:id
export const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      return res.json(product);
    }
  } catch (err) {
    // Check fallback
  }

  const fallback = fallbackProducts.find((p) => p._id === req.params.id) || fallbackProducts[0];
  if (fallback) {
    return res.json(fallback);
  }

  res.status(404);
  throw new Error("Product not found");
});

// @desc    Create a product (Admin)
// @route   POST /products
export const createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, image, images, colors, stock, category } = req.body;
  if (!title || !price) {
    res.status(400);
    throw new Error("Title and Price are required");
  }

  const product = new Product({ title, price, description, image, images, colors, stock, category });
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
    if (req.body.images !== undefined) product.images = req.body.images;
    if (req.body.colors !== undefined) product.colors = req.body.colors;
    product.stock = req.body.stock !== undefined ? req.body.stock : product.stock;
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