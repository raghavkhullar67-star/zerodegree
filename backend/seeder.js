import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Products.js";
import User from "./models/User.js";
import bcrypt from "bcryptjs";

dotenv.config();
connectDB();

const products = [
  {
    title: "Onyx Phantom Hoodie",
    price: 5499,
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7",
    description: "Heavyweight 450GSM French Terry cotton. Signature boxy fit in deep charcoal.",
    category: "Men",
    stock: 25
  },
  {
    title: "Ivory Silk Oversized Tee",
    price: 1899,
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518",
    description: "Premium mercerized cotton with a silk-like finish. Dropped shoulders.",
    category: "Women",
    stock: 50
  },
  {
    title: "Slate Cargo Trousers",
    price: 3999,
    image: "https://images.unsplash.com/photo-1517438476312-10d79c077509",
    description: "Water-resistant tech fabric with multi-pocket utility design.",
    category: "Men",
    stock: 15
  },
  {
    title: "Midnight Bomber Jacket",
    price: 7500,
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea",
    description: "Satin lining with matte black hardware. Perfect for layering.",
    category: "Men",
    stock: 10
  },
  {
    title: "Sand Dune Knit Sweater",
    price: 4200,
    image: "https://images.unsplash.com/photo-1614676466623-f1f0e724b0af",
    description: "Chunky knit wool blend. Minimalist earth-tone aesthetic.",
    category: "Women",
    stock: 20
  },
  {
    title: "Graphite Denim Jacket",
    price: 4999,
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9",
    description: "Acid-washed graphite denim. Distressed edges for a vintage look.",
    category: "Men",
    stock: 12
  },
  {
    title: "Noir Pleated Skirt",
    price: 2499,
    image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee",
    description: "High-waisted minimalist pleats. Lightweight breathable fabric.",
    category: "Women",
    stock: 30
  },
  {
    title: "Cyberpunk Tech Hoodie",
    price: 6200,
    image: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
    description: "Neon reflective accents with structured hood and thumb-hole cuffs.",
    category: "Men",
    stock: 18
  },
  {
    title: "Ghost White Joggers",
    price: 2800,
    image: "https://images.unsplash.com/photo-1552346154-21d32810aba3",
    description: "Ultra-soft fleece joggers. Tapered fit with elasticated waistband.",
    category: "Women",
    stock: 40
  },
  {
    title: "Void Essential Beanie",
    price: 999,
    image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531",
    description: "Soft acrylic knit. Zero Degree embroidered logo on the front.",
    category: "Accessories",
    stock: 100
  }
];

const importData = async () => {
  try {
    // 1. Products import
    await Product.deleteMany(); // Purana data delete karein
    await Product.insertMany(products); // Naya data insert karein

    // 2. Admin User Enforcement
    const hashedPassword = await bcrypt.hash("654321", 10);
    const existingAdmin = await User.findOne({ email: "raghavkhullar67@gmail.com" });
    
    if (existingAdmin) {
      existingAdmin.password = hashedPassword;
      existingAdmin.isAdmin = true;
      await existingAdmin.save();
    } else {
      await User.create({
        name: "Raghav Khullar",
        email: "raghavkhullar67@gmail.com",
        password: hashedPassword,
        isAdmin: true
      });
    }

    console.log("Data Imported and Admin Enforced! ✅");
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message} ❌`);
    process.exit(1);
  }
};

importData();