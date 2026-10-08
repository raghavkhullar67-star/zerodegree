import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Products.js";

dotenv.config();
connectDB();

const products = [
  {
    title: "Midnight Eclipse Overcoat",
    price: 8999,
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=800&q=80",
    description: "Premium wool blend overcoat with a tailored slim fit and raw edge detailing.",
    category: "Men",
    stock: 12,
  },
  {
    title: "Crimson Velvet Blazer",
    price: 6500,
    image: "https://images.unsplash.com/photo-1594938298596-af01b44ecdd2?auto=format&fit=crop&w=800&q=80",
    description: "Rich crimson velvet blazer with silk lapels for an ultra-premium evening look.",
    category: "Women",
    stock: 8,
  },
  {
    title: "Urban Utility Cargo Pants",
    price: 3499,
    image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty cotton tactical pants with adjustable straps and multi-layered pockets.",
    category: "Men",
    stock: 25,
  },
  {
    title: "Silk Pearl Slip Dress",
    price: 4999,
    image: "https://images.unsplash.com/photo-1566205798485-be1fc9bd6993?auto=format&fit=crop&w=800&q=80",
    description: "Elegant silk slip dress cascading past the knees. Perfect minimal evening wear.",
    category: "Women",
    stock: 18,
  },
  {
    title: "Matte Black Puffer Gilet",
    price: 5200,
    image: "https://images.unsplash.com/photo-1543076447-215ad9ba6923?auto=format&fit=crop&w=800&q=80",
    description: "Water-resistant matte black gilet filled with premium down. Boxy silhouette.",
    category: "Men",
    stock: 15,
  },
  {
    title: "Vintage Wash Oversized Hoodie",
    price: 3200,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80",
    description: "Sun-faded vintage black wash hoodie. Dropped shoulders, heavy French terry.",
    category: "Unisex",
    stock: 30,
  },
  {
    title: "Ribbed Turtleneck Knit",
    price: 2899,
    image: "https://images.unsplash.com/photo-1620799139834-6b8f844fbe61?auto=format&fit=crop&w=800&q=80",
    description: "Form-fitting ribbed classic turtleneck in an earthy stone colorway.",
    category: "Women",
    stock: 45,
  },
  {
    title: "Graphite Techwind Breaker",
    price: 4500,
    image: "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight metallic zip-up windbreaker with hidden ventilation zips.",
    category: "Men",
    stock: 20,
  },
  {
    title: "Emerald Satin Blouse",
    price: 2600,
    image: "https://images.unsplash.com/photo-1604085449208-bc8b24ef09bf?auto=format&fit=crop&w=800&q=80",
    description: "Fluid emerald satin with elegant balloon sleeves. An elevated essential.",
    category: "Women",
    stock: 14,
  },
  {
    title: "Raw Denim Selvedge Jeans",
    price: 5800,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?auto=format&fit=crop&w=800&q=80",
    description: "14oz Japanese selvedge denim. Straight leg fit designed to fade uniquely.",
    category: "Men",
    stock: 10,
  },
  {
    title: "Polar Fleece Half-Zip",
    price: 3600,
    image: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-warm cream colored polar fleece. Adjustable hem and high collar.",
    category: "Unisex",
    stock: 22,
  },
  {
    title: "Concrete Leather Moto Jacket",
    price: 12500,
    image: "https://images.unsplash.com/photo-1521223830114-4ebfb6b005fe?auto=format&fit=crop&w=800&q=80",
    description: "Premium full-grain leather. Asymmetrical zip with custom industrial hardware.",
    category: "Men",
    stock: 5,
  },
  {
    title: "Alabaster Wide-Leg Trousers",
    price: 2999,
    image: "https://images.unsplash.com/photo-1509631179647-068307cecc30?auto=format&fit=crop&w=800&q=80",
    description: "Flowing wide-leg trousers in a crisp alabaster tone. High-waisted precision cut.",
    category: "Women",
    stock: 24,
  },
  {
    title: "Ozone Aviator Sunglasses",
    price: 1800,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description: "Minimalist stainless steel wire frame with gradient geometric lenses.",
    category: "Accessories",
    stock: 50,
  },
  {
    title: "Obsidian Combat Boots",
    price: 8500,
    image: "https://images.unsplash.com/photo-1608256246200-53e635b5b65f?auto=format&fit=crop&w=800&q=80",
    description: "Chunky lug sole boots wrapped in matte obsidian leather. Zip and lace closure.",
    category: "Footwear",
    stock: 15,
  }
];

const seedProducts = async () => {
    try {
        await Product.deleteMany();
        console.log("Existing products cleared");
        await Product.insertMany(products);
        console.log("15 New Premium Products Inserted Successfully! ✅");
        process.exit();
    } catch(err) {
        console.error("Error inserting products:", err.message);
        process.exit(1);
    }
}
seedProducts();
