import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="w-full bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden transition-colors duration-500">
      {/* Background Decorative Element */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[20rem] md:text-[30rem] font-bold text-black/[0.02] dark:text-white/[0.02] select-none pointer-events-none tracking-tighter transition-colors duration-500">
        404
      </div>

      <div className="relative z-10 flex flex-col items-center text-center">
        <span className="text-[10px] uppercase tracking-[0.5em] text-gray-600 dark:text-gray-500 mb-8 border border-black/10 dark:border-white/10 px-6 py-2 transition-colors duration-500">
          Error / Lost in Sequence
        </span>
        
        <h1 className="text-5xl md:text-8xl font-light uppercase tracking-[0.2em] mb-8 text-black dark:text-white transition-colors duration-500">
          Not Found
        </h1>
        
        <p className="text-[10px] md:text-xs uppercase tracking-[0.3em] text-slate-600 dark:text-slate-400 mb-12 max-w-md leading-relaxed transition-colors duration-500">
          The archive piece you are looking for does not exist in this series. It may have been retired or moved.
        </p>

        <div className="flex flex-col md:flex-row gap-6">
          <Link
            to="/"
            className="border border-black/20 dark:border-white/20 bg-black dark:bg-white text-white dark:text-black px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 hover:bg-transparent dark:hover:bg-transparent hover:text-black dark:hover:text-white"
          >
            Go Home
          </Link>
          <Link
            to="/products"
            className="border border-black/20 dark:border-white/20 bg-transparent text-black dark:text-white px-12 py-4 uppercase tracking-[0.3em] text-[10px] font-bold transition-all duration-500 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black"
          >
            Catalogue
          </Link>
        </div>
      </div>

      {/* Aesthetic Line */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-black/20 dark:from-white/20 to-transparent transition-colors duration-500"></div>
    </div>
  );
};

export default NotFound;
