import { useEffect, useState, useRef } from "react";
import { FaUsers, FaShippingFast, FaAward, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const About = () => {
  // Parallax Refs
  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);
  const requestRef = useRef();

  // Throttled Scroll for Parallax
  useEffect(() => {
    const handleScrollRefactor = () => {
      const scrollY = window.scrollY;
      if (heroImgRef.current) {
        heroImgRef.current.style.transform = `translate3d(0, ${scrollY * 0.3}px, 0) scale(1.1)`;
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

  // Intersection Observer for Reveal Animations
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(".reveal-element");
    elements.forEach((el) => observer.observe(el));

    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50 dark:from-indigo-950/20 dark:via-slate-950 dark:to-slate-950 text-slate-800 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-indigo-500/30 selection:text-white min-h-screen pb-20 overflow-hidden">
      
      {/* GLOBAL ANIMATION STYLES */}
      <style>
        {`
          .reveal-element {
            opacity: 0;
            transform: translateY(40px);
            transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
            will-change: opacity, transform;
          }
          .reveal-element.is-revealed {
            opacity: 1;
            transform: translateY(0);
          }
          
          @keyframes subtlePulse {
            0% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0.1); }
            70% { box-shadow: 0 0 0 15px rgba(99, 102, 241, 0); }
            100% { box-shadow: 0 0 0 0 rgba(99, 102, 241, 0); }
          }
          .animate-pulse-subtle { animation: subtlePulse 3s infinite; }
          
          @keyframes textGlow {
            0% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
            50% { text-shadow: 0 0 20px rgba(255,255,255,0.3); }
            100% { text-shadow: 0 0 10px rgba(255,255,255,0.1); }
          }
          .animate-text-glow { animation: textGlow 4s infinite ease-in-out; }
        `}
      </style>

      {/* Hero Section - Parallax & Dynamic */}
      <div className="relative w-full h-[50vh] lg:h-[60vh] flex flex-col items-center justify-center overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50 transition-colors duration-500">
        
        <img 
          ref={heroImgRef}
          src="https://images.unsplash.com/photo-1511556532299-8f662fc26c06" 
          alt="Zero Degree Studio" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 scale-110 will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 dark:from-slate-950 dark:via-slate-950/60 to-transparent transition-colors duration-500"></div>
        
        <div 
          ref={heroTextRef}
          className="relative z-10 text-center px-4 mt-10 transition-transform duration-300 ease-out will-change-transform"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-light uppercase tracking-[0.2em] mb-4 text-slate-900 dark:text-white animate-text-glow transition-colors duration-500">
            Zero Degree
          </h1>
          <p className="text-xs md:text-sm uppercase tracking-widest text-indigo-300/70 reveal-element is-revealed" style={{ transitionDelay: '0.2s' }}>
            Redefining Modern Aesthetics.
          </p>
        </div>
      </div>

      {/* About Content - The Manifesto */}
      <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-32 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

        <div className="reveal-element">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-400/80 mb-6 border-b border-slate-200/60 dark:border-slate-800/60 pb-4 inline-block relative after:content-[''] after:absolute after:bottom-[-1px] after:left-0 after:w-0 after:h-[1px] after:bg-indigo-500 dark:after:bg-indigo-400 after:transition-all after:duration-700 hover:after:w-full transition-colors duration-500">
            The Manifesto
          </h2>
          <p className="text-lg md:text-2xl font-light leading-relaxed mb-8 text-slate-800 dark:text-slate-100 transition-colors duration-500">
            Zero Degree is more than a brand; it’s a culture. We bridge the gap between high-end luxury and everyday streetwear, offering uncompromising quality and razor-sharp silhouettes.
          </p>
          <p className="text-sm font-light text-slate-500 dark:text-slate-400 leading-relaxed tracking-wider transition-colors duration-500">
            Founded with a rebellious spirit and a minimalist objective, we craft pieces that speak volumes without shouting. Every stitch, every fabric, and every cut is meticulously engineered for those who set the temperature of tomorrow.
          </p>
        </div>

        {/* Minimalist Stats Grid - Staggered Animations & Hover Effects */}
        <div className="grid grid-cols-2 gap-4 lg:gap-6">
          {[
            { icon: FaUsers, title: "10K+", text: "Community" },
            { icon: FaShippingFast, title: "Express", text: "Global Shipping" },
            { icon: FaAward, title: "Premium", text: "Craftsmanship" },
            { icon: FaPhoneAlt, title: "24/7", text: "Concierge" }
          ].map((item, index) => (
            <div 
              key={index}
              className="reveal-element group relative bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm border border-slate-200/50 dark:border-slate-800/50 p-8 flex flex-col items-center text-center hover:-translate-y-2 hover:border-indigo-500/40 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-all duration-500 rounded-sm shadow-xl shadow-black/5 dark:shadow-black/20 overflow-hidden"
              style={{ transitionDelay: `${index * 150}ms` }} // Staggered reveal delay
            >
              {/* Dynamic Glow Effect on Hover */}
              <div className="absolute inset-0 bg-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl"></div>
              
              <item.icon className="text-indigo-600/80 dark:text-indigo-400/80 text-2xl mb-4 group-hover:scale-125 group-hover:text-indigo-500 dark:group-hover:text-indigo-300 transition-transform duration-500" />
              <h3 className="text-lg font-light tracking-wider mb-1 text-slate-900 dark:text-white relative z-10 transition-colors duration-500">{item.title}</h3>
              <p className="text-xs uppercase tracking-widest text-slate-500 dark:text-slate-400 relative z-10 transition-colors duration-500">{item.text}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Flagship Store & Map Section */}
      <div className="border-t border-slate-200/50 dark:border-slate-800/50 bg-slate-100/20 dark:bg-slate-900/20 transition-colors duration-500">
        <div className="container mx-auto px-6 lg:px-12 py-20 lg:py-24 grid md:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Contact Info */}
          <div className="order-2 md:order-1 reveal-element">
            <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-400/80 mb-6 border-b border-slate-200/60 dark:border-slate-800/60 pb-4 inline-block transition-colors duration-500">
              Flagship Location
            </h2>

            <p className="text-sm md:text-base font-light text-slate-600 dark:text-slate-300 mb-10 leading-relaxed tracking-wider transition-colors duration-500">
              16, AC Market Rd, Fatehgarh Mohalla, <br />
              Gandhinagar, Ludhiana, Punjab 141008
            </p>

            <div className="space-y-6 text-sm font-light text-slate-500 dark:text-slate-400 tracking-wider transition-colors duration-500">
              <div className="flex items-center gap-4 hover:text-indigo-300 transition-colors cursor-pointer group animate-pulse-subtle p-2 rounded-lg -ml-2">
                <FaPhoneAlt className="text-indigo-500/60 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">+91 8872055511</span>
              </div>

              <div className="flex items-center gap-4 hover:text-indigo-300 transition-colors cursor-pointer group p-2 rounded-lg -ml-2">
                <FaEnvelope className="text-indigo-500/60 group-hover:text-indigo-400 group-hover:scale-110 transition-all duration-300" />
                <span className="group-hover:translate-x-1 transition-transform duration-300">raghavkhullar67@gmail.com</span>
              </div>
              
              <div className="flex items-center gap-4 p-2 -ml-2">
                <FaMapMarkerAlt className="text-indigo-500/60" />
                <span>Open Mon-Sat, 9AM - 8PM</span>
              </div>
            </div>
          </div>

          {/* Google Map - Dynamic Reveal */}
          <div 
            className="order-1 md:order-2 w-full h-80 md:h-96 border border-slate-200/60 dark:border-slate-800/60 relative overflow-hidden bg-slate-100 dark:bg-slate-950 rounded-sm shadow-2xl shadow-black/10 dark:shadow-black/50 reveal-element group transition-colors duration-500"
            style={{ transitionDelay: '300ms' }}
          >
            {/* Overlay that fades out slightly on hover for an interactive feel */}
            <div className="absolute inset-0 bg-slate-100/40 dark:bg-slate-950/40 group-hover:bg-slate-100/10 dark:group-hover:bg-slate-950/10 transition-colors duration-700 z-10 pointer-events-none"></div>
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3423.834017326756!2d75.84501657558661!3d30.90906237449906!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a830cfbc2e6ef%3A0xe5a3c0e18be1e65c!2sAC%20Market!5e0!3m2!1sen!2sin!4v1709450000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Zero Degree Flagship Store"
              className="absolute inset-0 grayscale invert contrast-90 hue-rotate-180 opacity-70 transition-all duration-1000 group-hover:scale-105 group-hover:opacity-90"
            ></iframe>
          </div>

        </div>
      </div>

    </div>
  );
};

export default About;