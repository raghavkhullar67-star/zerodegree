import { useNavigate, Link } from "react-router-dom";

const OrderSuccess = () => {
  const navigate = useNavigate();

  // Generating a sleek, fake order number for that premium feel
  const orderNumber = `ZD-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans px-4 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">

      {/* LUXURY ANIMATIONS */}
      <style>
        {`
          @keyframes scaleIn {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          @keyframes drawCheck {
            to { stroke-dashoffset: 0; }
          }
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-scale { animation: scaleIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          .animate-fade-up { animation: fadeInUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          .checkmark-path {
            stroke-dasharray: 100;
            stroke-dashoffset: 100;
            animation: drawCheck 1s cubic-bezier(0.45, 0.05, 0.55, 0.95) forwards;
            animation-delay: 0.5s;
          }
        `}
      </style>

      <div className="max-w-xl w-full text-center relative">

        {/* Glow Background Decoration */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-black/5 dark:bg-white/5 blur-[100px] rounded-full pointer-events-none transition-colors duration-500"></div>

        {/* Cinematic Animated Icon */}
        <div className="mb-12 flex justify-center animate-scale">
          <div className="w-24 h-24 rounded-full border border-black/10 dark:border-white/10 flex items-center justify-center bg-black/[0.02] dark:bg-white/[0.02] backdrop-blur-sm transition-colors duration-500">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-black dark:text-white transition-colors duration-500">
              <path className="checkmark-path" d="M20 6L9 17L4 12" />
            </svg>
          </div>
        </div>

        {/* Content Section */}
        <div className="animate-fade-up" style={{ animationDelay: '0.3s' }}>
          <span className="text-xs uppercase tracking-[0.6em] text-gray-500 dark:text-gray-400 mb-4 block transition-colors duration-500">
            Acquisition Confirmed
          </span>

          <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.25em] mb-8 text-black dark:text-white transition-colors duration-500">
            Thank You
          </h1>

          <div className="space-y-4 mb-16">
            <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] leading-loose transition-colors duration-500">
              Your order <span className="text-black dark:text-white border-b border-black/30 dark:border-white/30 transition-colors duration-500">#{orderNumber}</span> has been successfully logged into our archive.
            </p>
            <p className="text-xs md:text-xs text-gray-500 dark:text-gray-400 uppercase tracking-[0.2em] transition-colors duration-500">
              A digital receipt has been dispatched to your inbox.
            </p>
          </div>
        </div>

        {/* Action Buttons - Premium Minimalist */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={() => navigate("/products")}
            className="group relative w-full sm:w-auto bg-black dark:bg-white text-white dark:text-black px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10 transition-colors duration-500">Continue Browsing</span>
            <div className="absolute inset-0 bg-gray-800 dark:bg-gray-200 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>

          <Link
            to="/orders"
            className="group relative w-full sm:w-auto border border-black/20 dark:border-white/20 text-black dark:text-white px-12 py-5 text-xs font-bold uppercase tracking-[0.3em] hover:border-black dark:hover:border-white transition-all duration-500"
          >
            <span className="relative z-10 group-hover:text-black dark:group-hover:text-white transition-colors duration-500">Track History</span>
          </Link>
        </div>

        {/* Bottom Details Overlay */}
        <div className="mt-24 pt-10 border-t border-black/5 dark:border-white/5 animate-fade-up transition-colors duration-500" style={{ animationDelay: '0.9s' }}>
          <div className="flex flex-col items-center gap-4">
            <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">
              Zero Degree Studio — Shipping Globally
            </p>
            <div className="flex gap-6 opacity-30">
              <div className="w-1 h-1 bg-black dark:bg-white rounded-full transition-colors duration-500"></div>
              <div className="w-1 h-1 bg-black dark:bg-white rounded-full transition-colors duration-500"></div>
              <div className="w-1 h-1 bg-black dark:bg-white rounded-full transition-colors duration-500"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default OrderSuccess;