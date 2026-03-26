import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWishlist } from "../features/auth/authSlice";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const dispatch = useDispatch();
  const { wishlist, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(fetchUserWishlist());
    }
  }, [dispatch, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white transition-colors duration-500">
        <h2 className="text-2xl uppercase tracking-widest mb-4">Please Login</h2>
        <Link to="/login" className="border-b border-black dark:border-white pb-1 tracking-[0.2em] text-xs transition-colors duration-500">
          Go to Login
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans pt-32 pb-24 px-4 md:px-8 transition-colors duration-500">
      <div className="container mx-auto">
        <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-12 transition-colors duration-500">
          <h1 className="text-4xl font-light uppercase tracking-[0.15em] transition-colors duration-500">Your Wishlist</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-2 transition-colors duration-500">
            {wishlist?.length || 0} Saved Pieces
          </p>
        </div>

        {wishlist?.length === 0 ? (
          <div className="py-20 text-center flex flex-col items-center">
            <p className="text-sm uppercase tracking-widest text-slate-500 dark:text-slate-400 transition-colors duration-500">Your wishlist is currently empty.</p>
            <Link to="/products" className="mt-8 text-xs hover:text-black dark:hover:text-white text-slate-600 dark:text-slate-300 border-b border-slate-400 dark:border-slate-500 pb-1 tracking-[0.2em] transition-colors duration-500">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-6 gap-y-12">
            {wishlist?.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
