import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../features/auth/authSlice";
import { useState, useEffect } from "react";
import zerodegree from "../assets/logo-3.png";
import { clearOrders } from "../features/order/orderslice";
import { useTheme } from "../context/ThemeContext";
import { FiSun, FiMoon } from "react-icons/fi";

const Navbar = () => {
  const dispatch = useDispatch();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const isTransparentLayer = isHome && !scrolled;

  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const cartItems = useSelector((state) => state.cart.items);
  const { theme, toggleTheme } = useTheme();

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearOrders());
    setMenuOpen(false);
  };

  // Scroll detection for advanced shrink/blur effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style>
        {`
          /* Custom underline expanding from center (Luxury style) */
          .link-hover-effect {
            position: relative;
            padding-bottom: 4px;
          }
          .link-hover-effect::after {
            content: '';
            position: absolute;
            width: 0;
            height: 1px;
            bottom: 0;
            left: 50%;
            background-color: currentColor; /* Inherit text color */
            transition: all 0.4s ease-in-out;
            transform: translateX(-50%);
          }
          .link-hover-effect:hover::after {
            width: 100%;
          }
        `}
      </style>

      {/* DARK LUXURY NAVBAR WITH GLASSMORPHISM */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 font-sans tracking-wide transition-all duration-700 ease-in-out ${
          scrolled 
            ? "bg-white/80 dark:bg-[#050505]/80 backdrop-blur-xl border-b border-black/5 dark:border-white/10 py-6 lg:py-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]" 
            : "bg-transparent border-b border-transparent py-6 lg:py-8"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
          
          {/* Desktop Left - Navigation Links */}
          <ul className={`hidden lg:flex gap-10 items-center text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
            isTransparentLayer ? "text-white/70" : "text-gray-600 dark:text-gray-400"
          }`}>
            <li><Link to="/products" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Shop</Link></li>
            <li><Link to="/about" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Brand</Link></li>
            <li><Link to="/contact" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Contact</Link></li>
          </ul>

          {/* Mobile Hamburger - Minimalist Lines */}
          <button
            className={`lg:hidden group flex flex-col gap-[5px] w-8 h-8 justify-center items-start transition-colors duration-500 ${isTransparentLayer ? "text-white" : "text-black dark:text-white"}`}
            onClick={() => setMenuOpen(true)}
          >
            <span className={`h-[1px] transition-all group-hover:w-3/4 duration-300 ${isTransparentLayer ? "bg-white w-full" : "bg-black dark:bg-white w-full"}`}></span>
            <span className={`h-[1px] w-2/3 transition-all group-hover:w-full duration-300 ${isTransparentLayer ? "bg-white" : "bg-black dark:bg-white"}`}></span>
            <span className={`text-[8px] uppercase tracking-[0.3em] mt-1 transition-colors duration-500 ${isTransparentLayer ? "text-white/70" : "text-gray-400"}`}>Menu</span>
          </button>

          {/* CREATIVE LOGO TREATMENT */}
          <div className="flex-1 flex justify-center lg:absolute lg:left-1/2 lg:-translate-x-1/2 group z-20">
            <Link to="/" className="relative flex items-center justify-center p-2">
              {/* Invisible glow aura behind the logo that expands on hover */}
              <div className="absolute inset-0 bg-black/5 dark:bg-white/5 blur-xl rounded-full scale-0 group-hover:scale-[1.8] opacity-0 group-hover:opacity-100 transition-all duration-[800ms] pointer-events-none"></div>
              
              {/* Logo Image */}
              <img
                src={zerodegree}
                alt="Zero Degree"
                className={`relative z-10 object-contain transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] dark:group-hover:drop-shadow-[0_0_15px_rgba(255,255,255,0.4)] group-hover:drop-shadow-[0_0_15px_rgba(0,0,0,0.2)] ${
                  isTransparentLayer ? "invert drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]" : "dark:invert"
                } ${
                  scrolled ? "h-8 md:h-10 group-hover:scale-105" : "h-8 md:h-12 group-hover:scale-110"
                }`}
              />
            </Link>
          </div>

          {/* Right Section - Cart & Auth */}
          <div className={`flex items-center gap-8 text-[10px] font-bold uppercase tracking-[0.2em] transition-colors duration-500 ${
            isTransparentLayer ? "text-white/70" : "text-gray-600 dark:text-gray-400"
          }`}>
            {/* Desktop Auth & Admin */}
            <div className="hidden lg:flex items-center gap-8">
              {isAuthenticated ? (
                <>
                  <Link to="/wishlist" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Wishlist</Link>
                  <Link to="/orders" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Orders</Link>
                  <Link to="/profile" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Profile</Link>
                  {user?.isAdmin && <Link to="/admin" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "text-indigo-300" : "text-indigo-500 dark:text-indigo-400"}`}>Admin</Link>}
                  <button onClick={handleLogout} className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "text-red-400 hover:text-red-300" : "text-red-500 hover:text-red-600 dark:hover:text-red-400"}`}>Logout</button>
                </>
              ) : (
                <Link to="/login" className={`link-hover-effect transition-colors duration-300 ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>Account</Link>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme} 
              className={`transition-colors duration-300 hover:rotate-12 transform ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}
              title="Toggle Theme"
            >
              {theme === "dark" ? <FiSun size={14} /> : <FiMoon size={14} />}
            </button>

            {/* Cart Button with Animated Notification Dot */}
            {isAuthenticated && (
              <Link to="/cart" className={`relative flex items-center transition-colors duration-300 group ${isTransparentLayer ? "hover:text-white" : "hover:text-black dark:hover:text-white"}`}>
                <span className="link-hover-effect">Bag</span>
                {totalQuantity > 0 && (
                  <span className="absolute -top-1 -right-4 flex h-3 w-3 items-center justify-center">
                    <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${isTransparentLayer ? "bg-white" : "bg-black dark:bg-white"}`}></span>
                    <span className={`relative inline-flex rounded-full h-2 w-2 ${isTransparentLayer ? "bg-white" : "bg-black dark:bg-white"}`}></span>
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      </nav>

      {/* FULL-SCREEN DARK MOBILE MENU (Cinematic Fade & Slide) */}
      <div
        className={`fixed inset-0 bg-white/95 dark:bg-[#050505]/95 backdrop-blur-2xl text-black dark:text-white z-[60] flex flex-col transform transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          menuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="px-6 py-8 flex justify-between items-center border-b border-black/10 dark:border-white/10">
          <span className="text-[10px] uppercase tracking-[0.4em] font-light text-gray-500">Navigation</span>
          <button
            onClick={() => setMenuOpen(false)}
            className="text-[10px] uppercase tracking-[0.3em] font-bold hover:text-gray-400 transition-colors"
          >
            [ Close ]
          </button>
        </div>

        <div className="flex flex-col items-center justify-center flex-1 space-y-8 text-3xl font-light uppercase tracking-[0.2em]">
          <Link to="/" onClick={() => setMenuOpen(false)} className="hover:text-gray-500 dark:hover:text-gray-400 hover:italic transition-all duration-500">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="hover:text-gray-500 dark:hover:text-gray-400 hover:italic transition-all duration-500">Shop Collection</Link>
          {isAuthenticated && <Link to="/cart" onClick={() => setMenuOpen(false)} className="hover:text-gray-500 dark:hover:text-gray-400 hover:italic transition-all duration-500 relative">Your Bag <span className="text-sm absolute top-0 -right-6">({totalQuantity})</span></Link>}
          <Link to="/about" onClick={() => setMenuOpen(false)} className="hover:text-gray-500 dark:hover:text-gray-400 hover:italic transition-all duration-500">The Brand</Link>

          <div className="w-24 h-[1px] bg-white/20 my-8"></div>

          <div className="flex flex-col items-center gap-6 text-[10px] font-bold tracking-[0.3em] text-gray-400">
            {isAuthenticated ? (
              <>
                <Link to="/wishlist" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-300">Wishlist</Link>
                <Link to="/orders" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-300">Your Orders</Link>
                <Link to="/profile" onClick={() => setMenuOpen(false)} className="hover:text-white transition-colors duration-300">Profile</Link>
                {user?.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)} className="text-indigo-400 hover:text-indigo-300 transition-colors duration-300">Admin Dashboard</Link>}
                <button onClick={handleLogout} className="text-red-500 hover:text-red-400 transition-colors duration-300">Logout Session</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMenuOpen(false)} className="text-white border border-white/20 px-10 py-4 hover:bg-white hover:text-black transition-all duration-500">Authenticate (Login)</Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;