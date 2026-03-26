import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../service/api";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // 1. Refs for Performance (Bypassing React re-renders for scroll)
    const heroBgRef = useRef(null);
    const heroTextRef = useRef(null);
    const requestRef = useRef();

    useEffect(() => {
        const getProducts = async () => {
            try {
                const data = await fetchProducts({ limit: 4 });
                setProducts(data.products || []);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, []);

    // 2. ULTRA-SMOOTH PARALLAX via requestAnimationFrame
    useEffect(() => {
        const handleScrollRefactor = () => {
            const scrollY = window.scrollY;
            if (heroBgRef.current) {
                heroBgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0)`;
            }
            if (heroTextRef.current) {
                heroTextRef.current.style.transform = `translate3d(0, ${scrollY * -0.1}px, 0)`;
            }
            requestRef.current = requestAnimationFrame(handleScrollRefactor);
        };

        const onScroll = () => {
            if (!requestRef.current) {
                requestRef.current = requestAnimationFrame(handleScrollRefactor);
            }
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => {
            window.removeEventListener("scroll", onScroll);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                    }
                });
            },
            { threshold: 0.15 }
        );

        const elements = document.querySelectorAll(".reveal-on-scroll");
        elements.forEach((el) => observer.observe(el));

        return () => elements.forEach((el) => observer.unobserve(el));
    }, [products]);

    return (
        <div className="w-full bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white transition-colors duration-500 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black overflow-hidden">

            {/* ADVANCED LUXURY STYLES */}
            <style>
                {`
                    @keyframes fadeUp {
                        0% { opacity: 0; transform: translateY(40px); filter: blur(10px); }
                        100% { opacity: 1; transform: translateY(0); filter: blur(0); }
                    }
                    @keyframes slowPan {
                        0% { transform: scale(1.05); }
                        50% { transform: scale(1.15); }
                        100% { transform: scale(1.05); }
                    }
                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                    @keyframes scrollLine {
                        0% { transform: scaleY(0); transform-origin: top; }
                        50% { transform: scaleY(1); transform-origin: top; }
                        50.1% { transform: scaleY(1); transform-origin: bottom; }
                        100% { transform: scaleY(0); transform-origin: bottom; }
                    }
                    
                    .text-outline {
                        color: transparent;
                        -webkit-text-stroke: 1px var(--stroke-color, rgba(0, 0, 0, 0.4));
                    }
                    .dark .text-outline {
                        -webkit-text-stroke: 1px rgba(255, 255, 255, 0.4);
                    }
                    
                    .animate-fade-up { animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
                    .animate-fade-up-delayed { animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s forwards; opacity: 0; }
                    .animate-fade-up-more-delayed { animation: fadeUp 1.5s cubic-bezier(0.16, 1, 0.3, 1) 0.8s forwards; opacity: 0; }
                    .animate-bg-pan { animation: slowPan 30s ease-in-out infinite; }
                    .animate-marquee { animation: marquee 20s linear infinite; }
                    .animate-scroll-line { animation: scrollLine 2.5s cubic-bezier(0.76, 0, 0.24, 1) infinite; }

                    .reveal-on-scroll {
                        opacity: 0;
                        transform: translateY(60px);
                        transition: all 1.2s cubic-bezier(0.16, 1, 0.3, 1);
                        will-change: transform, opacity;
                    }
                    .reveal-on-scroll.is-visible {
                        opacity: 1;
                        transform: translateY(0);
                    }
                    
                    .parallax-element {
                        will-change: transform;
                    }
                    
                    /* Clean image hover effect */
                    .img-hover-zoom {
                        transition: transform 1.5s cubic-bezier(0.16, 1, 0.3, 1), filter 1.5s ease;
                        will-change: transform;
                    }
                    .group:hover .img-hover-zoom {
                        transform: scale(1.08);
                        filter: grayscale(0%);
                    }
                `}
            </style>

            {/* 1. CINEMATIC HERO SECTION - Always dark-themed to match the background image */}
            <section className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-[#050505]">
                <div
                    ref={heroBgRef}
                    className="absolute inset-0 w-full h-full parallax-element"
                >
                    <img
                        src="https://images.unsplash.com/photo-1611312449408-fcece27cdbb7"
                        alt="Zero Degree Background"
                        className="w-full h-full object-cover animate-bg-pan opacity-60"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent via-70% to-[#f8fafc] dark:to-[#050505]"></div>
                    <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]"></div>
                </div>

                <div 
                    ref={heroTextRef}
                    className="relative z-10 text-center px-4 flex flex-col items-center mt-10 parallax-element"
                >
                    <span className="animate-fade-up text-[9px] md:text-[11px] font-bold tracking-[0.6em] uppercase mb-8 text-white/80 border border-white/20 px-6 py-2 backdrop-blur-md">
                        The New Standard
                    </span>
                    <h1 className="animate-fade-up-delayed text-7xl md:text-9xl lg:text-[12rem] font-light mb-8 tracking-tighter md:tracking-normal uppercase text-white leading-none">
                        Zero<br className="md:hidden" /> Degree
                    </h1>
                    <Link
                        to="/products"
                        className="animate-fade-up-more-delayed group relative overflow-hidden bg-white text-black px-14 py-5 uppercase tracking-[0.4em] text-[10px] font-bold transition-all duration-500 hover:bg-transparent hover:text-white border border-transparent hover:border-white mt-4"
                    >
                        <span className="relative z-10 transition-colors duration-500">Explore Archive</span>
                    </Link>
                </div>

                {/* Animated Scroll Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-50 z-20">
                    <span className="text-[8px] uppercase tracking-widest rotate-90 mb-4 text-black dark:text-white transition-colors duration-500">Scroll</span>
                    <div className="w-[1px] h-16 bg-black/20 dark:bg-white/20 overflow-hidden transition-colors duration-500">
                        <div className="w-full h-full bg-black dark:bg-white animate-scroll-line transition-colors duration-500"></div>
                    </div>
                </div>
            </section>

            {/* 2. INFINITE MARQUEE (Solid + Hollow Text) */}
            <div className="w-full bg-[#f8fafc] dark:bg-[#050505] border-y border-black/5 dark:border-white/5 py-6 overflow-hidden flex whitespace-nowrap relative z-20 transition-colors duration-500">
                <div className="animate-marquee flex gap-12 items-center text-sm md:text-lg uppercase tracking-[0.2em] font-light">
                    {Array(4).fill("").map((_, i) => (
                        <span key={i} className="flex gap-12 items-center">
                            <span className="text-black dark:text-white transition-colors duration-500">New Collection Drop</span>
                            <span className="text-outline">///</span>
                            <span className="text-outline italic">Limited Editions</span>
                            <span className="text-outline">///</span>
                            <span className="text-black dark:text-white transition-colors duration-500">Global Shipping</span>
                            <span className="text-outline">///</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* BRAND PHILOSOPHY SECTION */}
            <section className="py-24 md:py-32 bg-[#f8fafc] dark:bg-[#050505] transition-colors duration-500 relative z-20 flex justify-center text-center px-4">
                <div className="max-w-3xl reveal-on-scroll">
                    <h2 className="text-xl md:text-3xl font-light uppercase tracking-[0.2em] leading-relaxed text-gray-600 dark:text-gray-300 transition-colors duration-500">
                        We don't follow trends. <br />
                        <span className="text-black dark:text-white font-medium italic transition-colors duration-500">We set the temperature.</span>
                    </h2>
                </div>
            </section>

            {/* 3. ASYMMETRICAL CATEGORY BENTO GRID */}
            <section className="pb-24 md:pb-32 relative z-20 bg-[#f8fafc] dark:bg-[#050505] transition-colors duration-500">
                <div className="container mx-auto px-4 md:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 md:gap-6 h-auto lg:h-[85vh]">

                        {/* Men (Large Left Block) */}
                        <div className="lg:col-span-7 reveal-on-scroll h-[60vh] lg:h-full">
                            <Link to="/products?category=men" className="group relative w-full h-full overflow-hidden block bg-gray-200 dark:bg-[#111]">
                                <img src="https://i.pinimg.com/originals/e6/40/68/e640688f28da5981e4328d13c0c1b736.jpg" className="absolute inset-0 w-full h-full object-cover img-hover-zoom grayscale-[40%]" alt="Men" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
                                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12 text-white">
                                    <span className="text-[10px] uppercase tracking-[0.4em] border border-white/20 w-max px-4 py-1 backdrop-blur-sm">Category 01</span>
                                    <div>
                                        <h3 className="text-5xl md:text-7xl font-light uppercase tracking-widest mb-4 group-hover:translate-x-4 transition-transform duration-500">Men</h3>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-4">
                                            Discover <div className="w-8 h-[1px] bg-white/70 group-hover:w-16 transition-all duration-500"></div>
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Right Stacked Blocks */}
                        <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 h-[120vh] lg:h-full">

                            {/* Women (Top Right) */}
                            <div className="flex-1 reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
                                <Link to="/products?category=women" className="group relative w-full h-full overflow-hidden block bg-gray-200 dark:bg-[#111]">
                                    <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f" className="absolute inset-0 w-full h-full object-cover object-top img-hover-zoom grayscale-[40%]" alt="Women" />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-700"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <h3 className="text-4xl font-light uppercase tracking-widest mb-3 group-hover:translate-x-4 transition-transform duration-500">Women</h3>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-4">
                                            Shop Now <div className="w-6 h-[1px] bg-white/70 group-hover:w-12 transition-all duration-500"></div>
                                        </span>
                                    </div>
                                </Link>
                            </div>

                            {/* Accessories (Bottom Right) */}
                            <div className="flex-1 reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
                                <Link to="/products?category=accessories" className="group relative w-full h-full overflow-hidden block bg-gray-200 dark:bg-[#111]">
                                    <img src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover img-hover-zoom grayscale-[40%]" alt="Accessories" />
                                    <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-700"></div>
                                    <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-10 text-white">
                                        <h3 className="text-3xl font-light uppercase tracking-widest mb-3 group-hover:translate-x-4 transition-transform duration-500">Accessories</h3>
                                        <span className="text-[10px] uppercase tracking-widest text-white/70 flex items-center gap-4">
                                            Additions <div className="w-6 h-[1px] bg-white/70 group-hover:w-12 transition-all duration-500"></div>
                                        </span>
                                    </div>
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* 4. FEATURED PRODUCTS */}
            <section className="py-20 md:py-32 bg-white dark:bg-[#080808] border-t border-black/5 dark:border-white/5 transition-colors duration-500 relative z-20">
                <div className="container mx-auto px-4 md:px-8">

                    <div className="reveal-on-scroll flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
                        <div>
                            <span className="text-black/40 dark:text-white/40 text-[9px] font-bold uppercase tracking-[0.5em] mb-4 block transition-colors duration-500">Archive Curations</span>
                            <h2 className="text-4xl md:text-5xl font-light tracking-[0.15em] uppercase text-black dark:text-white transition-colors duration-500">
                                Signature Series
                            </h2>
                        </div>
                        <Link to="/products" className="group flex items-center gap-4 text-[10px] font-bold uppercase tracking-[0.3em] text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors pb-2 border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white">
                            <span>View All Pieces</span>
                        </Link>
                    </div>

                    {loading ? (
                        <div className="w-full text-center py-32 text-black/40 dark:text-white/40 tracking-[0.4em] uppercase text-[10px] animate-pulse flex flex-col items-center gap-4 transition-colors duration-500">
                            <div className="w-8 h-8 border-t border-black/40 dark:border-white/40 rounded-full animate-spin"></div>
                            Accessing Database...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-16">
                            {products.length > 0 ? (
                                products.map((product, index) => (
                                    <div
                                        key={product._id}
                                        className="reveal-on-scroll"
                                        style={{ transitionDelay: `${index * 150}ms` }}
                                    >
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-black/40 dark:text-white/40 text-[10px] uppercase tracking-widest transition-colors duration-500">Archive Empty.</div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default Home;