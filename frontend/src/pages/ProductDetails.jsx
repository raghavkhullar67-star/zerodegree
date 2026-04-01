import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { useState, useEffect } from "react";
import { fetchProductById, createProductReview } from "../service/api";
import { FaTimes, FaStar } from "react-icons/fa"; // Cross and Star icons
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // UI States
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSize, setSelectedSize] = useState("M");
  const [isAdded, setIsAdded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

  // Review States
  const { user } = useSelector((state) => state.auth);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [reviewLoading, setReviewLoading] = useState(false);

  // 1. Fetch Product by ID
  useEffect(() => {
    const getProduct = async () => {
      try {
        setLoading(true);
        const data = await fetchProductById(id);
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (isAdded) {
      navigate("/cart");
    } else {
      dispatch(addToCart({
        _id: product._id,
        title: product.title,
        price: product.price,
        image: product.image,
        category: product.category,
        selectedSize,
        quantity: 1
      }));
      toast.success("Added to Bag");
      setIsAdded(true);
    }
  };

  const submitReviewHandler = async (e) => {
    e.preventDefault();
    if (!rating || !comment) {
      toast.error("Please provide both rating and comment");
      return;
    }
    try {
      setReviewLoading(true);
      await createProductReview(id, { rating, comment });
      toast.success("Review submitted successfully");
      // Re-fetch product to show new review
      const data = await fetchProductById(id);
      setProduct(data);
      setComment("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to submit review");
    } finally {
      setReviewLoading(false);
    }
  };

  if (loading) return <div className="min-h-screen bg-[#f8fafc] dark:bg-black flex items-center justify-center text-black dark:text-white tracking-[0.5em] text-xs uppercase transition-colors duration-500">Loading...</div>;
  if (!product) return <div className="min-h-screen bg-[#f8fafc] dark:bg-black flex items-center justify-center text-black dark:text-white transition-colors duration-500">Piece Not Found</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-20 pt-20">

      {/* Breadcrumb */}
      <div className="container mx-auto px-6 py-8 text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400">
        <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">Zero Degree</Link>
        <span className="mx-3">/</span>
        <Link to="/products" className="hover:text-black dark:hover:text-white transition-colors">Archive</Link>
        <span className="mx-3">/</span>
        <span className="text-gray-800 dark:text-gray-300">{product.title}</span>
      </div>

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">

        {/* Left: Product Image (Fixed Height & Clickable) */}
        <div
          className="w-full bg-white dark:bg-[#0a0a0a] transition-colors duration-500 lg:h-[80vh] aspect-[3/4] flex items-center justify-center overflow-hidden border border-black/5 dark:border-white/5 cursor-zoom-in"
          onClick={() => setIsModalOpen(true)}
        >
          <img
            src={product.image}
            alt={product.title}
            className="max-w-full max-h-full object-contain hover:scale-105 transition-transform duration-1000"
          />
        </div>

        {/* Right: Product Content */}
        <div className="flex flex-col pt-4">
          <span className="text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-500">
            {product.category || "Collection"}
          </span>

          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-widest mb-6 leading-tight">
            {product.title}
          </h1>

          <div className="flex items-center gap-6 mb-8">
            <p className="text-xl font-medium tracking-widest text-gray-800 dark:text-gray-200 transition-colors duration-500">
              ₹{product.price}
            </p>
            {product.stock > 0 ? (
              <span className="text-xs px-2 py-1 border border-emerald-500/30 text-emerald-500 uppercase tracking-tighter">In Stock</span>
            ) : (
              <span className="text-xs px-2 py-1 border border-red-500/30 text-red-500 uppercase tracking-tighter">Sold Out</span>
            )}
          </div>

          <div className="h-[1px] w-full bg-black/10 dark:bg-white/10 mb-8 transition-colors duration-500"></div>

          {/* Description */}
          <div className="mb-10">
            <h4 className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3 transition-colors duration-500">Description</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-light transition-colors duration-500">
              {product.description}
            </p>
          </div>

          {/* Size Selection */}
          <div className="mb-12">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Select Size</span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {["S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  onClick={() => {
                    setSelectedSize(size);
                    setIsAdded(false);
                  }}
                  className={`py-3 text-xs tracking-widest transition-all duration-300 border ${selectedSize === size
                      ? "border-black dark:border-white bg-black dark:bg-white text-white dark:text-black"
                      : "border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-black/40 dark:hover:border-white/40"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Button */}
          <button
            disabled={product.stock <= 0}
            onClick={handleAddToCart}
            className={`w-full py-5 text-xs uppercase tracking-[0.3em] transition-all duration-500 ${isAdded
                ? "bg-transparent border border-emerald-500 text-emerald-500"
                : product.stock > 0
                  ? "bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-gray-200"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              }`}
          >
            {product.stock <= 0 ? "Out of Stock" : isAdded ? "Added to Bag — View" : "Add to Bag"}
          </button>

          {/* Details List */}
          <div className="mt-12 space-y-4 border-t border-black/5 dark:border-white/5 pt-8 transition-colors duration-500">
            <div className="flex justify-between text-xs uppercase tracking-widest py-2">
              <span className="text-gray-500 dark:text-gray-400">Shipping</span>
              <span>Free Worldwide</span>
            </div>
            <div className="flex justify-between text-xs uppercase tracking-widest py-2">
              <span className="text-gray-500 dark:text-gray-400">Material</span>
              <span>100% Premium Cotton</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- CUSTOMER REVIEWS SECTION --- */}
      <div className="container mx-auto px-6 py-20 mt-10 border-t border-black/10 dark:border-white/10 transition-colors duration-500">
        <h2 className="text-2xl font-light uppercase tracking-widest text-black dark:text-white mb-8 transition-colors duration-500">Client Reviews</h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Reviews List */}
          <div>
            {product.reviews && product.reviews.length === 0 && (
              <div className="text-gray-500 dark:text-gray-400 text-sm italic tracking-wide transition-colors duration-500">No reviews yet. Be the first to review this piece.</div>
            )}
            <div className="space-y-8">
              {product.reviews?.map((review) => (
                <div key={review._id} className="border-b border-black/5 dark:border-white/5 pb-6 transition-colors duration-500">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm uppercase tracking-widest font-medium text-black dark:text-white">{review.name}</span>
                    <div className="flex text-yellow-500 text-xs">
                      {[...Array(review.rating)].map((_, i) => <FaStar key={i} />)}
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Review Form */}
          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-500">Write a Review</h3>
            {user ? (
              <form onSubmit={submitReviewHandler} className="space-y-6 bg-white dark:bg-[#0a0a0a] p-8 border border-black/5 dark:border-white/5 transition-colors duration-500">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 mb-4 transition-colors duration-500"
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Fair</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Comment</label>
                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full bg-white dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors duration-500"
                    placeholder="Share your experience..."
                  ></textarea>
                </div>
                <button
                  disabled={reviewLoading}
                  type="submit"
                  className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs uppercase tracking-widest hover:bg-black/80 dark:hover:bg-gray-200 transition-colors"
                >
                  {reviewLoading ? "Submitting..." : "Submit Review"}
                </button>
              </form>
            ) : (
              <div className="p-8 border border-black/10 dark:border-white/10 bg-white dark:bg-[#0a0a0a] text-center transition-colors duration-500">
                <p className="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-4 transition-colors duration-500">Please login to write a review</p>
                <Link to="/login" className="inline-block border-b border-black dark:border-white text-black dark:text-white text-xs uppercase tracking-widest pb-1 hover:text-gray-600 dark:hover:text-gray-300 transition-colors duration-500">Login Now</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- IMAGE POP-UP MODAL --- */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] bg-black/95 flex items-center justify-center p-4 md:p-10 transition-all duration-500"
          onClick={() => setIsModalOpen(false)}
        >
          <button
            className="absolute top-8 right-8 text-white/50 hover:text-white transition-colors z-[1000]"
            onClick={() => setIsModalOpen(false)}
          >
            <FaTimes size={30} />
          </button>

          <img
            src={product.image}
            alt="Fullscreen Preview"
            className="max-w-full max-h-full object-contain animate-in fade-in zoom-in duration-300"
            onClick={(e) => e.stopPropagation()} // Click image par band nahi hoga
          />
        </div>
      )}
    </div>
  );
};

export default ProductDetails;