import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-[#050505] transition-colors duration-500 text-black dark:text-white pt-20 pb-10 border-t border-black/5 dark:border-white/10 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black mt-auto">
      <div className="container mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

        {/* Brand Section */}
        <div className="lg:pr-8">
          <h2 className="text-xl md:text-2xl font-light uppercase tracking-[0.2em] text-black dark:text-white mb-6">
            Zero Degree
          </h2>
          <p className="text-xs text-gray-400 leading-relaxed font-light tracking-wider mb-8">
            Redefining modern streetwear. Premium aesthetics, zero compromises. Designed for those who set the temperature.
          </p>

          {/* Minimalist Social Icons */}
          <div className="flex gap-6">
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
              <FaFacebookF size={18} />
            </a>
            <a href="https://www.instagram.com/_raghxvv.__/" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
              <FaInstagram size={18} />
            </a>
            <a href="#" className="text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-300">
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xs text-black dark:text-white uppercase tracking-[0.2em] font-medium mb-6">
            Explore
          </h3>
          <ul className="space-y-4 text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase font-light">
            <li><Link to="/" className="hover:text-black dark:hover:text-white transition-colors duration-300">Home</Link></li>
            <li><Link to="/products" className="hover:text-black dark:hover:text-white transition-colors duration-300">Collection</Link></li>
            <li><Link to="/cart" className="hover:text-black dark:hover:text-white transition-colors duration-300">Shopping Bag</Link></li>
            <li><Link to="/orders" className="hover:text-black dark:hover:text-white transition-colors duration-300">Order Archive</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-xs text-black dark:text-white uppercase tracking-[0.2em] font-medium mb-6">
            Client Care
          </h3>
          <ul className="space-y-4 text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase font-light">
            <li><Link to="/contact" className="hover:text-black dark:hover:text-white transition-colors duration-300">Contact Us</Link></li>
            <li><Link to="/shipping" className="hover:text-black dark:hover:text-white transition-colors duration-300">Shipping & Returns</Link></li>
            <li><Link to="/privacy" className="hover:text-black dark:hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:text-black dark:hover:text-white transition-colors duration-300">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Contact Info Section */}
        <div>
          <h3 className="text-xs text-black dark:text-white uppercase tracking-[0.2em] font-medium mb-6">
            Inquiries
          </h3>

          <div className="space-y-4 text-xs tracking-widest text-gray-500 dark:text-gray-400 uppercase font-light">
            <p className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">
              +91 8872055511
            </p>
            <p className="hover:text-black dark:hover:text-white transition-colors cursor-pointer">
              raghavkhullar67@gmail.com
            </p>
            <p>
              Punjab, India
            </p>
            
            <div className="pt-4 mt-4 border-t border-black/5 dark:border-white/10">
              <span className="block text-black dark:text-white mb-2 font-medium">Operating Hours</span>
              <span>Mon - Sat | 9:00 - 20:00</span>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Minimalist Footer */}
      <div className="container mx-auto px-6 lg:px-12 mt-16 pt-8 border-t border-black/5 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Zero Degree. All rights reserved.
        </div>
        <div className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
          Designed with precision.
        </div>
      </div>
    </footer>
  );
};

export default Footer;