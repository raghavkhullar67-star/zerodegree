import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    // MongoDB khud '_id' create karta hai, isliye 'id' field ki zaroori nahi hai
    title: {
      type: String,
      required: [true, "Please add a title"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Please add a price"],
      default: 0,
    },
    image: {
      type: String, // Yahan image ka URL store hoga
      required: [true, "Please add an image URL"],
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
    },
    // Optional: Fashion store ke liye category add karna acha rehta hai
    category: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        name: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "User",
        },
      }
    ],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true, // Yeh 'createdAt' aur 'updatedAt' apne aap bana dega
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;