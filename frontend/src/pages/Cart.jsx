import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  clearCart,
  decreaseQuantity,
  removeFromCart,
} from "../features/cart/cartSlice";
import { useNavigate, Link } from "react-router-dom";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + (item.price || 0) * (item.quantity || 0),
    0
  );

  // -----------------------------------------
  // EMPTY CART STATE - Cinematic & Minimal
  // -----------------------------------------
  if (cartItems.length === 0) {
    return (
      <div className="w-full bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans min-h-[80vh] flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">
        <div className="relative mb-10 z-10 opacity-70">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-black dark:text-white transition-colors duration-500">
            <path strokeLinecap="square" strokeLinejoin="miter" d="M16 11V7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7V11M5 9H19L20 21H4L5 9Z" />
          </svg>
        </div>
        <h2 className="text-xl md:text-2xl font-light uppercase tracking-[0.4em] mb-4 text-black dark:text-white transition-colors duration-500">
          Archive is Empty
        </h2>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 mb-12 text-center max-w-sm transition-colors duration-500">
          Your collection awaits selection.
        </p>
        <Link
          to="/products"
          className="relative overflow-hidden border border-black/20 dark:border-white/20 bg-transparent px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-medium text-black dark:text-white transition-all duration-500 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
        >
          Return to Catalogue
        </Link>
      </div>
    );
  }

  // -----------------------------------------
  // FILLED CART STATE - High-End Layout
  // -----------------------------------------
  return (
    <div className="w-full bg-[#f8fafc] dark:bg-[#050505] text-slate-800 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black min-h-screen pb-20">

      <style>
        {`
          @keyframes fadeUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          @keyframes slideInRight {
            0% { opacity: 0; transform: translateX(40px); }
            100% { opacity: 1; transform: translateX(0); }
          }
          .animate-fade-up { animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-slide-right { animation: slideInRight 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        `}
      </style>

      <div className="container mx-auto px-4 lg:px-12 py-12 md:py-20">

        <div className="flex justify-between items-end border-b border-black/10 dark:border-white/10 pb-6 mb-12 animate-fade-up transition-colors duration-500">
          <h1 className="text-3xl md:text-4xl font-light uppercase tracking-[0.2em] text-black dark:text-white transition-colors duration-500">
            Shopping Bag
          </h1>
          <span className="text-xs uppercase tracking-[0.2em] text-gray-600 dark:text-gray-400 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 px-4 py-2 rounded-full backdrop-blur-sm transition-colors duration-500">
            {cartItems.length} {cartItems.length === 1 ? "Piece" : "Pieces"}
          </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

          {/* LEFT COLUMN: Cart Items */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {cartItems.map((item, index) => {
              const itemId = item.id || item._id;
              const itemTitle = item.title || item.name;
              const itemImage = item.image || (item.images && item.images[0]);

              return (
                <div
                  key={itemId || index}
                  className="group flex flex-col sm:flex-row gap-8 py-8 border-b border-black/10 dark:border-white/10 relative transition-all duration-500"
                >
                  {/* Left: Product Image */}
                  <Link to={`/products/${itemId}`} className="relative w-full sm:w-40 aspect-[3/4] bg-black/5 dark:bg-white/5 overflow-hidden block">
                    <img
                      src={itemImage}
                      alt={itemTitle}
                      className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  </Link>

                  {/* Right: Product Details & Controls */}
                  <div className="flex-1 flex flex-col justify-between pt-2">
                    <div className="flex justify-between items-start gap-4">
                      <div className="space-y-3">
                        <Link to={`/products/${itemId}`} className="block">
                          <h2 className="text-sm md:text-base uppercase tracking-widest font-light text-black dark:text-white leading-snug hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                            {itemTitle}
                          </h2>
                        </Link>

                        <div className="flex flex-col gap-1">
                          {item.selectedColor && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-colors duration-500">
                              Color / {item.selectedColor}
                            </span>
                          )}
                          {item.selectedSize && (
                            <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 transition-colors duration-500">
                              Size / {item.selectedSize}
                            </span>
                          )}
                        </div>
                        <p className="text-slate-700 dark:text-slate-300 text-xs font-light tracking-[0.2em] transition-colors duration-500">₹{item.price.toLocaleString()}</p>
                      </div>

                      <div className="text-right flex flex-col items-end justify-between h-full">
                        <button
                          onClick={() => dispatch(removeFromCart(itemId))}
                          className="text-xs uppercase tracking-widest text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors"
                          title="Remove Sequence"
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-6 pt-6 border-t border-black/5 dark:border-white/5 transition-colors duration-500">
                      {/* Geometric Quantity Control */}
                      <div className="flex items-center border border-black/20 dark:border-white/20 text-[10px] uppercase tracking-widest text-black dark:text-white transition-colors duration-500">
                        <button
                          onClick={() => dispatch(decreaseQuantity(itemId))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                        >
                          -
                        </button>
                        <span className="w-10 text-center text-black dark:text-white transition-colors duration-500">{item.quantity}</span>
                        <button
                          onClick={() => dispatch(addToCart({ ...item, id: itemId }))}
                          className="w-10 h-10 flex items-center justify-center hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-sm md:text-base tracking-[0.1em] font-light text-black dark:text-white transition-colors duration-500">
                        ₹{(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="w-full lg:w-[380px] shrink-0">
            <div className="bg-transparent border border-black/10 dark:border-white/10 p-8 md:p-10 sticky top-32 transition-colors duration-500">
              <h2 className="text-[10px] uppercase tracking-[0.3em] border-b border-black/10 dark:border-white/10 pb-6 font-medium text-slate-600 dark:text-slate-400 transition-colors duration-500">
                Purchase Summary
              </h2>

              <div className="space-y-6 text-xs my-8 font-light tracking-widest text-slate-700 dark:text-slate-300 transition-colors duration-500">
                <div className="flex justify-between items-center">
                  <span>Subtotal</span>
                  <span className="text-black dark:text-white transition-colors duration-500">₹{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Shipping</span>
                  <span className="text-slate-400 dark:text-slate-500 text-[10px] transition-colors duration-500">TBD</span>
                </div>
              </div>

              <div className="flex justify-between items-end border-t border-black/10 dark:border-white/10 pt-8 mb-10 font-light text-black dark:text-white transition-colors duration-500">
                <span className="text-xs uppercase tracking-[0.2em]">Total</span>
                <span className="text-xl tracking-widest">₹{totalPrice.toLocaleString()}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full bg-black dark:bg-white text-white dark:text-black py-4 uppercase tracking-[0.3em] text-[10px] font-bold hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white hover:border hover:border-black dark:hover:border-white border border-transparent dark:border-transparent transition-all duration-300 mb-6"
              >
                Proceed to Checkout
              </button>

              <div className="text-center mt-6">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="text-[10px] uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors duration-300 border-b border-transparent hover:border-black dark:hover:border-white pb-1"
                >
                  Clear Archive
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Cart;