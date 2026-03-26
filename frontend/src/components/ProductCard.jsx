import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlistItem } from "../features/auth/authSlice";
// Import a sleek icon for the button
import { FaShoppingBag, FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state.auth);

  const isFavorite = wishlist?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to Bag");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to use Wishlist");
      return;
    }
    dispatch(toggleWishlistItem({ productId: product._id, isAdded: isFavorite }));
    if (isFavorite) toast.success("Removed from Wishlist");
    else toast.success("Added to Wishlist");
  };

  return (
    // ADVANCED CARD WRAPPER:
    // Replaced heavy borders with subtle 'rings' for a premium glow effect.
    // Added 'group' for hover states across elements.
    <div className="group relative flex flex-col font-sans bg-white dark:bg-[#050505] ring-1 ring-black/5 dark:ring-white/5 hover:ring-black/20 dark:hover:ring-white/20 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] h-full rounded-sm overflow-hidden">
      
      {/* 1. IMAGE CONTAINER - Cinematic & Interactive */}
      <div className="relative overflow-hidden aspect-[3/4] bg-gray-100 dark:bg-[#030303]">
        {/* Wishlist Heart Icon */}
        <button 
          onClick={handleWishlist}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-white/40 dark:bg-black/40 backdrop-blur-md border border-black/5 dark:border-white/5 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
        >
          {isFavorite ? (
            <FaHeart className="text-red-500 text-xs" />
          ) : (
            <FaRegHeart className="text-white text-xs" />
          )}
        </button>

        {/* Category Badge - Subtle reveal */}
        <div className="absolute top-4 left-4 z-30 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-[-10px] group-hover:translate-x-0">
          <span className="text-[8px] uppercase tracking-[0.3em] bg-black/10 dark:bg-white/10 backdrop-blur-sm border border-black/10 dark:border-white/10 px-3 py-1 text-black/70 dark:text-white/70">
            {product.category || "General"}
          </span>
        </div>

        <Link to={`/products/${product._id}`}>
          {/* Image scales and slightly dims on hover for drama */}
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover object-center transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-700"></div>
        </Link>
          
        {/* Interactive Add to Bag (Desktop) */}
        <div className="absolute inset-x-4 bottom-4 translate-y-[120%] group-hover:translate-y-0 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hidden lg:block z-20">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-3 bg-black dark:bg-white text-white dark:text-black text-[10px] font-bold uppercase tracking-[0.3em] py-4 hover:bg-white dark:hover:bg-black hover:text-black dark:hover:text-white hover:border-black/20 dark:hover:border-white/20 border border-transparent transition-all duration-500"
          >
            <FaShoppingBag className="text-xs" />
            <span>Add to Bag</span>
          </button>
        </div>
      </div>

      {/* 2. CARD BODY (PRODUCT DETAILS) - Minimalist Typography */}
      <div className="flex flex-col flex-1 text-left p-6 relative z-10 bg-white dark:bg-[#050505] transition-colors duration-500">
        
        <div className="flex justify-between items-start gap-4 mb-2">
          <Link to={`/products/${product._id}`} className="flex-1">
            <h2 className="text-xs font-light uppercase tracking-[0.2em] text-black/90 dark:text-white/90 group-hover:text-black dark:group-hover:text-white transition-colors duration-500 line-clamp-1">
              {product.title}
            </h2>
          </Link>
          <p className="text-xs text-black/60 dark:text-white/60 tracking-widest font-light transition-colors duration-500">
            ₹{product.price}
          </p>
        </div>
        
        {/* Sub-label or extra detail */}
        <div className="overflow-hidden h-0 group-hover:h-4 transition-all duration-500 ease-out">
           <span className="text-[8px] uppercase tracking-[0.4em] text-black/40 dark:text-white/40">Limited Series 01</span>
        </div>

        {/* 3. MOBILE ADD BUTTON */}
        <button 
          onClick={handleAddToCart}
          className="lg:hidden w-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 text-black/80 dark:text-white/80 text-[10px] font-bold uppercase tracking-[0.3em] py-4 mt-6 active:bg-black dark:active:bg-white active:text-white dark:active:text-black transition-all duration-300"
        >
          Add to Bag
        </button>
      </div>
      
    </div>
  );
};

export default ProductCard;