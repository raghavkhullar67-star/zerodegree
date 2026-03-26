import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// 1. "register" aur "reset" import karein
import { register, reset } from "../features/auth/authSlice";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // 2. Sahi state variables nikalna (user, isLoading, isError, message)
    const { user, isLoading, isError, message } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // 3. Effect for handling redirect and errors
    useEffect(() => {
        if (isError) {
            alert(message);
        }

        // Agar user register ho gaya (ya pehle se logged in hai), toh home pe bhejo
        if (user) {
            navigate("/");
        }

        dispatch(reset());
    }, [user, isError, message, navigate, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        
        const userData = {
            name,
            email,
            password
        };

        // 4. "register" thunk ko dispatch karein
        dispatch(register(userData));
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black flex flex-col md:flex-row transition-colors duration-500">
            
            {/* LEFT SIDE - Minimalist Registration Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-12 lg:p-24 order-2 md:order-1 transition-colors duration-500">
                <div className="w-full max-w-md">
                    
                    <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.15em] mb-12 border-b border-black/10 dark:border-white/10 pb-4 transition-colors duration-500">
                        Create Account
                    </h1>

                    <form onSubmit={handleSubmit} className="space-y-10">
                        
                        {/* Floating Label Input: Name */}
                        <div className="relative">
                            <input
                                type="text"
                                id="name"
                                className="peer w-full border-b border-black/20 dark:border-white/20 py-3 bg-transparent text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Full Name"
                            />
                            <label 
                                htmlFor="name" 
                                className="absolute left-0 -top-3.5 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black dark:peer-focus:text-white cursor-text"
                            >
                                Full Name *
                            </label>
                        </div>

                        {/* Floating Label Input: Email */}
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                className="peer w-full border-b border-black/20 dark:border-white/20 py-3 bg-transparent text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                            />
                            <label 
                                htmlFor="email" 
                                className="absolute left-0 -top-3.5 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black dark:peer-focus:text-white cursor-text"
                            >
                                Email Address *
                            </label>
                        </div>

                        {/* Floating Label Input: Password */}
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                className="peer w-full border-b border-black/20 dark:border-white/20 py-3 bg-transparent text-sm text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors placeholder-transparent"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Password"
                            />
                            <label 
                                htmlFor="password" 
                                className="absolute left-0 -top-3.5 text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:uppercase peer-focus:tracking-widest peer-focus:text-black dark:peer-focus:text-white cursor-text"
                            >
                                Password *
                            </label>
                        </div>

                        {/* Register Button */}
                        <button 
                            type="submit" 
                            disabled={isLoading}
                            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 text-xs font-medium uppercase tracking-[0.2em] hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-500 mt-4 disabled:opacity-50"
                        >
                            {isLoading ? "Creating..." : "Join Zero Degree"}
                        </button>

                        {/* Sign In Link */}
                        <div className="text-center pt-8 transition-colors duration-500">
                            <span className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest block mb-4 transition-colors duration-500">
                                Already a member?
                            </span>
                            <Link 
                                to="/login" 
                                className="text-xs uppercase tracking-widest border-b border-black dark:border-white pb-1 text-black dark:text-white hover:text-gray-600 hover:border-gray-600 dark:hover:text-gray-400 dark:hover:border-gray-400 transition-colors duration-500"
                            >
                                Sign In Here
                            </Link>
                        </div>

                    </form>
                </div>
            </div>

            {/* RIGHT SIDE - Modern Streetwear Image */}
            <div className="hidden md:block md:w-1/2 relative bg-[#050505] order-1 md:order-2">
                <img 
                    src="https://images.unsplash.com/photo-1551028719-00167b16eac5" 
                    alt="Zero Degree Registration"
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                />
                <div className="absolute inset-0 bg-black/30"></div>
                <div className="absolute top-12 right-12 text-white text-right">
                    <h2 className="text-3xl lg:text-4xl font-light uppercase tracking-[0.2em]">Become a Member</h2>
                    <p className="text-xs uppercase tracking-widest mt-3 text-gray-300">Exclusive Drops & Early Access</p>
                </div>
            </div>

        </div>
    );
};

export default Register;