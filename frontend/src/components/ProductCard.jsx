import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../features/cart/cartSlice";
import { toggleWishlistItem } from "../features/auth/authSlice";
import { FaShoppingBag, FaHeart, FaRegHeart, FaMicrochip } from "react-icons/fa";
import toast from "react-hot-toast";
import { getImageUrl } from "../utils/imageUtils";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const { user, wishlist } = useSelector((state) => state.auth);

  const isFavorite = wishlist?.some((item) => item._id === product._id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart({ ...product, quantity: 1 }));
    toast.success("Added to Cyber Bag 🛒");
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please login to use Cyber Wishlist");
      return;
    }
    dispatch(toggleWishlistItem({ productId: product._id, isAdded: isFavorite }));
    if (isFavorite) toast.success("Removed from Wishlist");
    else toast.success("Added to Wishlist");
  };

  return (
    <div className="group relative flex flex-col font-mono bg-[#07132b]/80 border border-cyan-500/30 hover:border-cyan-400 transition-all duration-500 ease-out h-full rounded-md overflow-hidden cyber-border-glow hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]">
      
      {/* 1. IMAGE CONTAINER */}
      <div className="relative overflow-hidden aspect-[3/4] bg-[#030712]">
        
        {/* Wishlist Heart Button */}
        <button 
          onClick={handleWishlist}
          className="absolute top-3 right-3 z-30 p-2.5 rounded-full bg-cyan-950/80 border border-cyan-500/50 backdrop-blur-md opacity-90 group-hover:opacity-100 transition-all duration-300 hover:bg-cyan-400 hover:text-black text-cyan-300"
        >
          {isFavorite ? (
            <FaHeart className="text-pink-500 text-xs" />
          ) : (
            <FaRegHeart className="text-xs" />
          )}
        </button>

        {/* Category & Rating Badges */}
        <div className="absolute top-3 left-3 z-30 flex flex-col gap-1.5">
          <span className="text-[9px] font-mono uppercase tracking-widest bg-cyan-950/90 border border-cyan-500/50 px-2.5 py-1 text-cyan-300 backdrop-blur-md rounded-sm">
            {product.category || "GENERAL"}
          </span>
        </div>

        <Link to={`/products/${product._id}`}>
          <img
            src={getImageUrl(product.image)}
            alt={product.title}
            loading="lazy"
            className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        </Link>
          
        {/* Interactive Add to Bag Button */}
        <div className="absolute inset-x-3 bottom-3 translate-y-[120%] group-hover:translate-y-0 transition-all duration-500 hidden lg:block z-20">
          <button 
            onClick={handleAddToCart}
            className="w-full flex items-center justify-center gap-2 bg-cyan-400 text-black text-[10px] font-mono font-bold uppercase tracking-[0.2em] py-3.5 hover:bg-cyan-300 transition-all shadow-[0_0_20px_rgba(6,182,212,0.8)] rounded-sm"
          >
            <FaShoppingBag className="text-xs" />
            <span>EQUIP / ADD TO BAG</span>
          </button>
        </div>
      </div>

      {/* 2. CARD DETAILS */}
      <div className="flex flex-col flex-1 text-left p-5 relative z-10 bg-[#07132b]/90 text-white">
        
        <div className="flex justify-between items-start gap-2 mb-2">
          <Link to={`/products/${product._id}`} className="flex-1">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-200 group-hover:text-cyan-400 transition-colors line-clamp-1">
              {product.title}
            </h2>
          </Link>
          <p className="text-xs font-mono text-pink-400 font-bold tracking-widest">
            ₹{product.price}
          </p>
        </div>

        <div className="flex items-center justify-between text-[9px] font-mono text-cyan-400/60 mt-1">
          <span className="flex items-center gap-1">
            <FaMicrochip className="text-xs text-cyan-400" /> 0.0°K WEAVE
          </span>
          <span>STOCK: {product.stock ?? 10}</span>
        </div>

        {/* Mobile Add Button */}
        <button 
          onClick={handleAddToCart}
          className="lg:hidden w-full bg-cyan-400 text-black text-[10px] font-mono font-bold uppercase tracking-widest py-3 mt-4 active:bg-cyan-300 rounded-sm shadow-[0_0_10px_rgba(6,182,212,0.5)]"
        >
          EQUIP / ADD TO BAG
        </button>
      </div>
      
    </div>
  );
};

export default ProductCard;