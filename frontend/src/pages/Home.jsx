import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useEffect, useState, useRef } from "react";
import { fetchProducts } from "../service/api";
import axios from "axios";
import { 
  FaAtom, 
  FaShieldAlt, 
  FaBolt, 
  FaFingerprint, 
  FaTerminal, 
  FaSatellite, 
  FaMicrochip,
  FaChevronRight,
  FaSlidersH
} from "react-icons/fa";
import toast from "react-hot-toast";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");
    const [email, setEmail] = useState("");
    const [subscribed, setSubscribed] = useState(false);

    const canvasRef = useRef(null);
    const heroBgRef = useRef(null);

    // 1. Fetch Products from Backend
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true);
            try {
                const data = await fetchProducts({ limit: 8, category: activeCategory !== "All" ? activeCategory : "" });
                setProducts(data.products || []);
            } catch (error) {
                console.error("Failed to load products:", error);
            } finally {
                setLoading(false);
            }
        };
        getProducts();
    }, [activeCategory]);

    // 2. Futuristic Cyber Particle Matrix Canvas Effect
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");

        let animationFrameId;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener("resize", handleResize);

        // Cyber Grid Nodes
        const nodes = [];
        const numNodes = Math.min(Math.floor(width / 25), 60);

        for (let i = 0; i < numNodes; i++) {
            nodes.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 1,
                color: Math.random() > 0.4 ? "rgba(6, 182, 212, " : "rgba(236, 72, 153, ",
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            // Draw Nodes & Constellations
            for (let i = 0; i < nodes.length; i++) {
                const node = nodes[i];
                node.x += node.vx;
                node.y += node.vy;

                if (node.x < 0 || node.x > width) node.vx *= -1;
                if (node.y < 0 || node.y > height) node.vy *= -1;

                ctx.beginPath();
                ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
                ctx.fillStyle = node.color + "0.8)";
                ctx.shadowBlur = 10;
                ctx.shadowColor = node.color + "0.8)";
                ctx.fill();

                // Connect nearby nodes
                for (let j = i + 1; j < nodes.length; j++) {
                    const node2 = nodes[j];
                    const dist = Math.hypot(node.x - node2.x, node.y - node2.y);
                    if (dist < 140) {
                        ctx.beginPath();
                        ctx.moveTo(node.x, node.y);
                        ctx.lineTo(node2.x, node2.y);
                        ctx.strokeStyle = node.color + (1 - dist / 140) * 0.2 + ")";
                        ctx.lineWidth = 0.6;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (!email || !email.includes("@")) {
            toast.error("Invalid Cyber Frequency / Email format");
            return;
        }
        setSubscribed(true);
        toast.success("Cyber Neural Link Established! 🚀");
        setEmail("");
    };

    return (
        <div className="w-full bg-[#030712] text-white transition-colors duration-500 font-sans selection:bg-cyan-500 selection:text-black overflow-hidden relative">

            {/* CYBER GRID & SCANLINE GLOBAL OVERLAYS */}
            <div className="fixed inset-0 cyber-grid-pattern opacity-30 pointer-events-none z-10"></div>
            <div className="fixed inset-0 cyber-scanline opacity-20 pointer-events-none z-10 animate-scanline"></div>

            {/* 1. TOP TELEMETRY HUD BAR */}
            <div className="w-full bg-[#060e20]/90 border-b border-cyan-500/30 backdrop-blur-md px-4 py-2 text-[10px] uppercase font-mono tracking-widest text-cyan-400/80 flex flex-wrap justify-between items-center z-30 relative shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5 text-cyan-400">
                        <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                        SYSTEM: ONLINE
                    </span>
                    <span className="hidden sm:inline text-gray-500">|</span>
                    <span className="hidden sm:inline">SECTOR: TOKYO-NEXUS-09</span>
                    <span className="hidden md:inline text-gray-500">|</span>
                    <span className="hidden md:inline text-pink-400">KELVIN: 0.0° ABSOLUTE</span>
                </div>
                <div className="flex items-center gap-4 text-gray-400">
                    <span className="flex items-center gap-1"><FaSatellite className="text-cyan-400" /> SATELLITE LINK ACTIVE</span>
                    <span>v2.099 ARCHIVE</span>
                </div>
            </div>

            {/* 2. CINEMATIC CYBER HERO SECTION */}
            <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#030712] py-20">
                
                {/* Particle Canvas & Hero Media */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-70" />
                
                <div className="absolute inset-0 w-full h-full z-0 pointer-events-none">
                    <img
                        src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1920&q=80"
                        alt="Cyberpunk Hero"
                        className="w-full h-full object-cover opacity-20 mix-blend-luminosity filter blur-sm scale-105"
                    />
                    <div className="absolute inset-0 bg-radial from-transparent via-[#030712]/70 to-[#030712]"></div>
                </div>

                {/* Hero HUD Container */}
                <div className="relative z-20 text-center px-4 max-w-5xl flex flex-col items-center mt-6">
                    
                    {/* HUD Badge */}
                    <div className="inline-flex items-center gap-2 border border-cyan-500/50 bg-cyan-950/40 backdrop-blur-xl px-5 py-2 rounded-full text-[10px] font-mono tracking-[0.4em] uppercase text-cyan-300 mb-8 cyber-border-glow">
                        <FaMicrochip className="text-cyan-400 animate-spin text-xs" />
                        <span>QUANTUM FASHION MATRIX 2099</span>
                    </div>

                    {/* Cyber Title */}
                    <h1 className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-extrabold tracking-tighter uppercase leading-none mb-6 relative">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-white to-pink-500 cyber-text-glow">
                            ZERO DEGREE
                        </span>
                        <span className="absolute -top-6 -right-6 text-xs font-mono text-pink-400/80 hidden sm:block tracking-widest">
                            [ SYS // 0.0°K ]
                        </span>
                    </h1>

                    <p className="text-xs sm:text-sm md:text-base font-mono uppercase tracking-[0.3em] text-cyan-200/70 max-w-2xl mb-12 leading-relaxed">
                        Hyper-engineered apparel crafted for sub-zero environments, neural enhancement, and dystopian elegance.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto items-center justify-center">
                        <Link
                            to="/products"
                            className="group relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono text-xs font-bold uppercase tracking-[0.3em] text-black bg-cyan-400 rounded-sm shadow-[0_0_30px_rgba(6,182,212,0.6)] hover:bg-cyan-300 hover:shadow-[0_0_50px_rgba(6,182,212,0.9)] transition-all duration-300 w-full sm:w-auto"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                EXPLORE ARCHIVE <FaChevronRight className="group-hover:translate-x-1 transition-transform" />
                            </span>
                        </Link>

                        <a
                            href="#nexus-specs"
                            className="inline-flex items-center justify-center px-10 py-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-cyan-300 bg-cyan-950/30 border border-cyan-500/40 rounded-sm hover:bg-cyan-900/50 hover:border-cyan-400 transition-all duration-300 backdrop-blur-md w-full sm:w-auto hover:text-white"
                        >
                            CYBER SPECS
                        </a>
                    </div>
                </div>
            </section>

            {/* 3. INFINITE CYBER MARQUEE */}
            <div className="w-full bg-[#050c1e] border-y border-cyan-500/30 py-5 overflow-hidden flex whitespace-nowrap relative z-20 font-mono">
                <div className="animate-marquee flex gap-12 items-center text-xs md:text-sm uppercase tracking-[0.3em] font-semibold text-cyan-300">
                    {Array(4).fill("").map((_, i) => (
                        <span key={i} className="flex gap-12 items-center">
                            <span className="text-white flex items-center gap-2"><FaBolt className="text-cyan-400" /> ZERO KELVIN THERMAL WEAVE</span>
                            <span className="text-pink-400">///</span>
                            <span className="text-cyan-200">BIOMETRIC CONTOUR FIT</span>
                            <span className="text-pink-400">///</span>
                            <span className="text-white flex items-center gap-2"><FaAtom className="text-pink-400" /> QUANTUM AUTHENTICATED</span>
                            <span className="text-pink-400">///</span>
                            <span className="text-cyan-400">GLOBAL HYPER-DISPATCH</span>
                            <span className="text-pink-400">///</span>
                        </span>
                    ))}
                </div>
            </div>

            {/* 4. ASYMMETRICAL CYBER BENTO GRID (CATEGORIES) */}
            <section className="py-24 relative z-20 bg-[#030712]">
                <div className="container mx-auto px-4 md:px-8">
                    
                    {/* Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-cyan-500/20 pb-6">
                        <div>
                            <span className="text-pink-400 font-mono text-[10px] uppercase tracking-[0.4em] block mb-2">
                                [ SECTOR ARCHIVES ]
                            </span>
                            <h2 className="text-3xl md:text-5xl font-extrabold uppercase tracking-tight text-white flex items-center gap-4">
                                CATEGORY NEXUS
                            </h2>
                        </div>
                        <span className="text-xs font-mono text-cyan-400/70 mt-4 md:mt-0 tracking-widest">
                            SELECT ARCHIVE SECTOR // 01 - 03
                        </span>
                    </div>

                    {/* Bento Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-auto lg:h-[80vh]">

                        {/* Men Cyber Block (Large Left) */}
                        <div className="lg:col-span-7 h-[60vh] lg:h-full">
                            <Link 
                                to="/products?category=Men" 
                                className="group relative w-full h-full overflow-hidden block border border-cyan-500/30 rounded-lg bg-[#071226]/80 cyber-border-glow"
                            >
                                <img 
                                    src="https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=1200&q=80" 
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-90" 
                                    alt="Men Cyber Exosuit" 
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent"></div>
                                
                                <div className="absolute inset-0 flex flex-col justify-between p-8 md:p-12">
                                    <div className="flex justify-between items-center">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] bg-cyan-950/80 border border-cyan-500/50 px-4 py-1 rounded text-cyan-300 backdrop-blur-md">
                                            SECTOR 01 // MEN EXOSUIT
                                        </span>
                                        <span className="font-mono text-xs text-pink-400">[ READY ]</span>
                                    </div>
                                    <div>
                                        <h3 className="text-4xl md:text-6xl font-black uppercase tracking-wider text-white mb-4 group-hover:text-cyan-300 transition-colors">
                                            MEN ARCHIVE
                                        </h3>
                                        <p className="text-xs font-mono text-cyan-200/70 max-w-md mb-6 hidden sm:block">
                                            Heavy-duty armor coats, tactical cargo weaves, and climate-controlled outer shells.
                                        </p>
                                        <span className="font-mono text-xs uppercase tracking-widest text-cyan-400 flex items-center gap-3 group-hover:translate-x-2 transition-transform">
                                            ACCESS SECTOR <FaChevronRight className="text-xs" />
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        </div>

                        {/* Right Stacked Blocks */}
                        <div className="lg:col-span-5 flex flex-col gap-6 h-[100vh] lg:h-full">

                            {/* Women Block */}
                            <div className="flex-1">
                                <Link 
                                    to="/products?category=Women" 
                                    className="group relative w-full h-full overflow-hidden block border border-pink-500/30 rounded-lg bg-[#071226]/80 cyber-glow-magenta"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1594938298596-af01b44ecdd2?auto=format&fit=crop&w=800&q=80" 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-90" 
                                        alt="Women Cyber Couture" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] bg-pink-950/80 border border-pink-500/50 px-3 py-1 rounded text-pink-300 w-max backdrop-blur-md">
                                            SECTOR 02 // WOMEN NEON
                                        </span>
                                        <div>
                                            <h3 className="text-3xl font-extrabold uppercase tracking-wider text-white mb-2 group-hover:text-pink-400 transition-colors">
                                                WOMEN COUTURE
                                            </h3>
                                            <span className="font-mono text-xs uppercase tracking-widest text-pink-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                                EXPLORE ARCHIVE <FaChevronRight className="text-xs" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                            {/* Accessories & Unisex Block */}
                            <div className="flex-1">
                                <Link 
                                    to="/products?category=Accessories" 
                                    className="group relative w-full h-full overflow-hidden block border border-cyan-500/30 rounded-lg bg-[#071226]/80 cyber-border-glow"
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80" 
                                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter brightness-75 group-hover:brightness-90" 
                                        alt="Cyber Accessories" 
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-transparent to-transparent"></div>
                                    <div className="absolute inset-0 flex flex-col justify-between p-8">
                                        <span className="font-mono text-[10px] uppercase tracking-[0.3em] bg-cyan-950/80 border border-cyan-500/50 px-3 py-1 rounded text-cyan-300 w-max backdrop-blur-md">
                                            SECTOR 03 // CYBER HARDWARE
                                        </span>
                                        <div>
                                            <h3 className="text-3xl font-extrabold uppercase tracking-wider text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                                ACCESSORIES & HUD
                                            </h3>
                                            <span className="font-mono text-xs uppercase tracking-widest text-cyan-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                                                EQUIP NOW <FaChevronRight className="text-xs" />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>

                        </div>
                    </div>
                </div>
            </section>

            {/* 5. NEXUS CYBERNETIC SPECIFICATIONS */}
            <section id="nexus-specs" className="py-24 bg-[#050c1e]/80 border-y border-cyan-500/30 relative z-20">
                <div className="container mx-auto px-4 md:px-8">
                    
                    <div className="text-center max-w-3xl mx-auto mb-16">
                        <span className="font-mono text-xs uppercase tracking-[0.4em] text-cyan-400 mb-3 block">
                            [ TELEMETRY & HARDWARE ]
                        </span>
                        <h2 className="text-4xl md:text-5xl font-black uppercase text-white tracking-tight mb-4">
                            CYBERNETIC SPECIFICATIONS
                        </h2>
                        <p className="text-xs font-mono text-gray-400 tracking-wider">
                            Engineered beyond modern limits for supreme performance, durability, and thermoregulation.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        
                        {/* Spec 1 */}
                        <div className="p-8 border border-cyan-500/30 rounded-lg bg-[#07132b]/60 backdrop-blur-xl hover:border-cyan-400 transition-all group cyber-border-glow">
                            <div className="w-14 h-14 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaAtom />
                            </div>
                            <h3 className="text-lg font-bold uppercase text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                0.0°K THERMAL FIBER
                            </h3>
                            <p className="text-xs font-mono text-gray-400 leading-relaxed">
                                Self-regulating hydrophobic weave maintains optimal core temperature under sub-zero thermal shock.
                            </p>
                        </div>

                        {/* Spec 2 */}
                        <div className="p-8 border border-pink-500/30 rounded-lg bg-[#07132b]/60 backdrop-blur-xl hover:border-pink-400 transition-all group cyber-glow-magenta">
                            <div className="w-14 h-14 rounded-lg bg-pink-950/80 border border-pink-500/50 flex items-center justify-center text-pink-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaShieldAlt />
                            </div>
                            <h3 className="text-lg font-bold uppercase text-white mb-2 group-hover:text-pink-300 transition-colors">
                                BIOMETRIC CONTOUR
                            </h3>
                            <p className="text-xs font-mono text-gray-400 leading-relaxed">
                                Smart shape-memory polymer adapts seamlessly to your body movement and muscle kinetic output.
                            </p>
                        </div>

                        {/* Spec 3 */}
                        <div className="p-8 border border-cyan-500/30 rounded-lg bg-[#07132b]/60 backdrop-blur-xl hover:border-cyan-400 transition-all group cyber-border-glow">
                            <div className="w-14 h-14 rounded-lg bg-cyan-950/80 border border-cyan-500/50 flex items-center justify-center text-cyan-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaBolt />
                            </div>
                            <h3 className="text-lg font-bold uppercase text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                HYPER-DISPATCH
                            </h3>
                            <p className="text-xs font-mono text-gray-400 leading-relaxed">
                                Automated sub-millisecond warehouse allocation with global priority drone & express freight.
                            </p>
                        </div>

                        {/* Spec 4 */}
                        <div className="p-8 border border-pink-500/30 rounded-lg bg-[#07132b]/60 backdrop-blur-xl hover:border-pink-400 transition-all group cyber-glow-magenta">
                            <div className="w-14 h-14 rounded-lg bg-pink-950/80 border border-pink-500/50 flex items-center justify-center text-pink-400 text-2xl mb-6 group-hover:scale-110 transition-transform">
                                <FaFingerprint />
                            </div>
                            <h3 className="text-lg font-bold uppercase text-white mb-2 group-hover:text-pink-300 transition-colors">
                                HOLOGRAM VERIFIED
                            </h3>
                            <p className="text-xs font-mono text-gray-400 leading-relaxed">
                                Integrated NFC encrypted chip guarantees 100% cryptographic proof of authenticity for every garment.
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            {/* 6. SIGNATURE PRODUCTS ARCHIVE */}
            <section className="py-24 relative z-20 bg-[#030712]">
                <div className="container mx-auto px-4 md:px-8">
                    
                    {/* Filter Header */}
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 border-b border-cyan-500/20 pb-6">
                        <div>
                            <span className="font-mono text-[10px] text-cyan-400 uppercase tracking-[0.4em] block mb-2">
                                [ SIGNATURE SELECTION ]
                            </span>
                            <h2 className="text-3xl md:text-5xl font-black uppercase text-white tracking-tight">
                                ARCHIVE DROPS
                            </h2>
                        </div>

                        {/* Cyber Filter Category Tabs */}
                        <div className="flex flex-wrap gap-2">
                            {["All", "Men", "Women", "Accessories"].map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setActiveCategory(cat)}
                                    className={`px-5 py-2 text-xs font-mono uppercase tracking-widest rounded transition-all duration-300 border ${
                                        activeCategory === cat
                                            ? "bg-cyan-500 text-black border-cyan-400 font-bold shadow-[0_0_15px_rgba(6,182,212,0.8)]"
                                            : "bg-cyan-950/40 text-cyan-300 border-cyan-500/30 hover:border-cyan-400"
                                    }`}
                                >
                                    {cat === "All" ? "ALL ARCHIVES" : cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Products Grid */}
                    {loading ? (
                        <div className="w-full text-center py-28 text-cyan-400 font-mono text-xs uppercase tracking-[0.4em] flex flex-col items-center gap-4">
                            <div className="w-10 h-10 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                            INITIALIZING QUANTUM DATABASE...
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {products.length > 0 ? (
                                products.map((product) => (
                                    <div key={product._id} className="h-full">
                                        <ProductCard product={product} />
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full text-center py-20 text-gray-500 font-mono text-xs uppercase tracking-widest">
                                    NO ARCHIVE ITEMS FOUND IN THIS SECTOR.
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>

            {/* 7. FUTURISTIC CYBER TERMINAL NEWSLETTER */}
            <section className="py-24 bg-[#050c1e] border-t border-cyan-500/30 relative z-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="border border-cyan-500/50 rounded-lg bg-[#030712]/90 p-8 md:p-12 cyber-border-glow relative overflow-hidden">
                        
                        {/* Terminal Header */}
                        <div className="flex items-center gap-2 border-b border-cyan-500/30 pb-4 mb-8 text-xs font-mono text-cyan-400">
                            <FaTerminal className="text-pink-500" />
                            <span>ZERO_DEGREE_NEURAL_LINK // V2.099</span>
                        </div>

                        <div className="text-center max-w-xl mx-auto mb-8">
                            <h3 className="text-3xl font-black uppercase text-white mb-3 tracking-tight">
                                CONNECT TO THE NEXUS
                            </h3>
                            <p className="text-xs font-mono text-cyan-200/70 leading-relaxed">
                                Subscribe your neural ID / email for confidential drop notifications, early archive access, and VIP cyber event codes.
                            </p>
                        </div>

                        {subscribed ? (
                            <div className="p-6 bg-cyan-950/80 border border-cyan-400 text-center font-mono text-cyan-300 text-xs tracking-widest uppercase rounded">
                                ACCESS GRANTED. WELCOME TO ZERO DEGREE NEXUS. 🚀
                            </div>
                        ) : (
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
                                <div className="relative flex-1">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="ENTER YOUR EMAIL..."
                                        className="w-full bg-[#07132b] border border-cyan-500/40 text-cyan-200 px-5 py-4 text-xs font-mono tracking-widest focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-sm"
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="bg-cyan-400 hover:bg-cyan-300 text-black text-xs font-mono font-bold uppercase tracking-[0.2em] px-8 py-4 rounded-sm transition-all shadow-[0_0_20px_rgba(6,182,212,0.6)]"
                                >
                                    ESTABLISH LINK
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;