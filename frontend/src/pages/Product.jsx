import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
// 1. API service import karein
import { fetchProducts } from "../service/api";

const Products = () => {
  const location = useLocation();
  
  // States
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  // 1. Reveal Animation Logic
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal-piece");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [products, loading]);

  // 2. Fetch from backend with filters
  useEffect(() => {
    const getProducts = async () => {
      try {
        setLoading(true);
        const params = {
          keyword: search,
          category: category,
          page: page,
          limit: 12,
        };
        const data = await fetchProducts(params);
        setProducts(data.products || []);
        setTotalPages(data.pages || 1);
        setTotalItems(data.total || 0);
      } catch (error) {
        console.error("Error loading products:", error);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, [search, category, page]);

  // URL parameters ke liye useEffect
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryParam = queryParams.get("category");
    if (categoryParam) {
      const formattedCategory = categoryParam.charAt(0).toUpperCase() + categoryParam.slice(1);
      setCategory(formattedCategory);
    }
  }, [location]);

  const categories = ["All", "Men", "Women", "Accessories"];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-slate-800 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-24 overflow-hidden">
      
      {/* GLOBAL ANIMATION STYLES */}
      <style>
        {`
          .reveal-piece {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
          }
          .reveal-piece.is-revealed {
            opacity: 1;
            transform: translateY(0);
          }
          
          @keyframes titleFade {
            from { opacity: 0; transform: translateY(20px); letter-spacing: 0.5em; }
            to { opacity: 1; transform: translateY(0); letter-spacing: 0.25em; }
          }
          .animate-title { animation: titleFade 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
          
          .custom-scrollbar::-webkit-scrollbar { height: 2px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); }
        `}
      </style>

      {/* 1. CINEMATIC HERO SECTION */}
      <div className="relative w-full h-[40vh] lg:h-[50vh] flex flex-col items-center justify-center overflow-hidden border-b border-black/5 dark:border-white/5 transition-colors duration-500">
        <div className="absolute inset-0 bg-slate-100 dark:bg-[#080808]">
           {/* Subtle Moving Gradient for Depth */}
           <div className="absolute inset-0 opacity-10 dark:opacity-20 bg-[radial-gradient(circle_at_50%_50%,_#333_0%,_transparent_100%)] dark:bg-[radial-gradient(circle_at_50%_50%,_#111_0%,_transparent_100%)]"></div>
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-7xl font-extralight uppercase tracking-[0.25em] mb-6 text-black dark:text-white animate-title transition-colors duration-500">
            The Collection
          </h1>
          <div className="flex items-center justify-center gap-4 opacity-0 animate-title transition-colors duration-500" style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
            <span className="h-[1px] w-8 bg-black/20 dark:bg-white/20"></span>
            <p className="text-[10px] uppercase tracking-[0.4em] text-black/50 dark:text-white/40">
              {loading ? "Discovering Pieces" : `${totalItems} Archival Pieces`}
            </p>
            <span className="h-[1px] w-8 bg-black/20 dark:bg-white/20"></span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 py-12 lg:py-20">

        {/* Filters Toolbar - Refined Sticky */}
        <div className="sticky top-[72px] z-40 bg-white/80 dark:bg-black/80 backdrop-blur-xl py-8 flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-black/5 dark:border-white/5 mb-16 gap-8 lg:gap-0 transition-colors duration-500">
          <div className="flex gap-8 lg:gap-12 overflow-x-auto w-full lg:w-auto pb-2 custom-scrollbar no-scrollbar">
            {categories.map((cat, idx) => (
              <button
                key={cat}
                onClick={() => { setCategory(cat); setPage(1); }}
                className={`text-[10px] uppercase tracking-[0.4em] whitespace-nowrap transition-all duration-700 relative pb-2 ${
                  category === cat
                    ? "text-black dark:text-white" 
                    : "text-black/40 dark:text-white/30 hover:text-black/80 dark:hover:text-white/60"
                }`}
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                {cat}
                {category === cat && (
                  <span className="absolute bottom-0 left-0 w-full h-[1px] bg-black dark:bg-white transition-all duration-700"></span>
                )}
              </button>
            ))}
          </div>

          <div className="w-full lg:w-72 relative group">
            <input
              type="text"
              placeholder="SEARCH CATALOGUE"
              className="w-full bg-transparent border-b border-black/10 dark:border-white/10 pb-2 text-[10px] uppercase tracking-[0.3em] text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-all duration-500 placeholder-black/30 dark:placeholder-white/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="absolute bottom-0 left-0 w-0 h-[1px] bg-black dark:bg-white group-focus-within:w-full transition-all duration-700"></div>
          </div>
        </div>

        {/* Product Grid & States */}
        {loading ? (
          <div className="flex justify-center py-32">
            <div className="text-[10px] uppercase tracking-[0.5em] animate-pulse text-black/30 dark:text-white/20">Archiving Collection...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 reveal-piece">
            <p className="text-[10px] uppercase tracking-[0.3em] text-black/50 dark:text-white/40">
              No pieces found in this series.
            </p>
            <button 
              onClick={() => { setSearch(""); setCategory("All"); setPage(1); }}
              className="mt-8 text-[10px] uppercase tracking-[0.4em] text-black dark:text-white border-b border-black/30 dark:border-white/20 pb-1 hover:border-black dark:hover:border-white transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid - 3 columns for better focus on each piece */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mb-24">
              {products.map((product, index) => (
                <div 
                  key={product._id} 
                  className="reveal-piece"
                  style={{ transitionDelay: `${(index % 3) * 150}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>

            {/* Pagination - Minimalist */}
            {totalPages > 1 && (
              <div className="flex justify-center flex-wrap gap-8 mt-24 text-black dark:text-white">
                {[...Array(totalPages).keys()].map((p) => (
                  <button
                    key={p + 1}
                    onClick={() => { setPage(p + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                    className={`text-[10px] uppercase tracking-[0.4em] transition-all duration-500 pb-2 border-b ${
                      page === p + 1
                        ? "text-black border-black dark:text-white dark:border-white"
                        : "text-black/30 dark:text-white/20 border-transparent hover:text-black/80 dark:hover:text-white/60 hover:border-black/30 dark:hover:border-white/20"
                    }`}
                  >
                    {p + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}

      </div>
    </div>
  );
};

export default Products;