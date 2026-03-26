import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 font-sans selection:bg-black selection:text-white dark:selection:bg-indigo-500/30 dark:selection:text-white pb-20 transition-colors duration-500">
      {/* NO COMMENTS BEFORE THIS MAIN DIV! */}

      {/* Hero Section - Pure Typographic Luxury */}
      <div className="pt-32 pb-16 md:pt-40 md:pb-24 text-center border-b border-black/10 dark:border-slate-800/60 px-4 bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] mb-6 text-black dark:text-slate-100 transition-colors duration-500">
          Client Care
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-widest max-w-xl mx-auto leading-relaxed transition-colors duration-500">
          We are here to assist you. Reach out for inquiries, styling advice, or support.
        </p>
      </div>

      {/* Main Section - Split Layout */}
      <div className="container mx-auto px-6 lg:px-12 py-20 grid lg:grid-cols-2 gap-16 lg:gap-24">

        {/* Left Side: Contact Info */}
        <div className="flex flex-col">
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-400/80 mb-10 border-b border-black/10 dark:border-slate-800/60 pb-4 transition-colors duration-500">
            Direct Lines
          </h2>

          <div className="space-y-10 flex-1">
            {/* Phone */}
            <div className="flex items-start gap-6 group">
              <FaPhoneAlt className="text-indigo-600/60 dark:text-indigo-500/60 text-xl mt-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2 transition-colors duration-500">Phone</h3>
                <p className="text-sm font-light tracking-wider text-slate-700 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer">
                  +91 98765 43210
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-6 group">
              <FaEnvelope className="text-indigo-600/60 dark:text-indigo-500/60 text-xl mt-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2 transition-colors duration-500">Email</h3>
                <p className="text-sm font-light tracking-wider text-slate-700 dark:text-slate-200 group-hover:text-black dark:group-hover:text-white transition-colors cursor-pointer">
                  support@zerodegree.com
                </p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-6 group">
              <FaMapMarkerAlt className="text-indigo-600/60 dark:text-indigo-500/60 text-xl mt-1 group-hover:text-indigo-500 dark:group-hover:text-indigo-400 transition-colors" />
              <div>
                <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-2 transition-colors duration-500">Flagship Location</h3>
                <p className="text-sm font-light tracking-wider text-slate-700 dark:text-slate-200 leading-relaxed transition-colors duration-500">
                  16, AC Market Rd, Fatehgarh Mohalla, <br />
                  Ludhiana, Punjab 141008
                </p>
              </div>
            </div>
          </div>

          {/* Social Icons - Minimalist */}
          <div className="mt-12 pt-8 border-t border-black/10 dark:border-slate-800/60 transition-colors duration-500">
            <h3 className="text-xs uppercase tracking-[0.15em] text-slate-500 dark:text-slate-400 mb-6 transition-colors duration-500">Socials</h3>
            <div className="flex gap-6">
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors duration-300">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-slate-400 dark:text-slate-500 hover:text-black dark:hover:text-white transition-colors duration-300">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Side: Contact Form */}
        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-600/80 dark:text-indigo-400/80 mb-10 border-b border-black/10 dark:border-slate-800/60 pb-4 transition-colors duration-500">
            Send an Inquiry
          </h2>

          <form className="space-y-10">
            {/* Floating-style Minimalist Inputs */}
            <div className="relative">
              <input
                type="text"
                id="name"
                placeholder="FULL NAME"
                className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-3 text-sm text-slate-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors placeholder-slate-500 dark:placeholder-slate-600"
              />
            </div>

            <div className="relative">
              <input
                type="email"
                id="email"
                placeholder="EMAIL ADDRESS"
                className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-3 text-sm text-slate-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors placeholder-slate-500 dark:placeholder-slate-600"
              />
            </div>

            <div className="relative">
              <textarea
                id="message"
                rows="4"
                placeholder="YOUR MESSAGE..."
                className="w-full bg-transparent border-b border-slate-300 dark:border-slate-700 py-3 text-sm text-slate-900 dark:text-white uppercase tracking-widest focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 transition-colors placeholder-slate-500 dark:placeholder-slate-600 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-slate-900 dark:bg-slate-200 text-white dark:text-slate-950 py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-black dark:hover:bg-white hover:shadow-lg dark:hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 mt-4"
            >
              Submit
            </button>
          </form>
        </div>

      </div>

      {/* Google Map - Dark Mode Edition */}
      <div className="container mx-auto px-6 lg:px-12 mt-10">
        <div className="w-full h-80 md:h-[450px] border border-black/10 dark:border-slate-800/60 relative overflow-hidden bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-500">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d109744.22709340579!2d75.77546376595438!3d30.90026974775952!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391a837462345a7d%3A0x681102348ec60610!2sLudhiana%2C%20Punjab!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Shop Location"
            className="absolute inset-0 opacity-80 dark:grayscale dark:invert dark:contrast-90 dark:hue-rotate-180 dark:opacity-70 transition-all duration-500"
          ></iframe>
        </div>
      </div>

    </div>
  );
};

export default Contact;