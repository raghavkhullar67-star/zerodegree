import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { login, googleLoginThunk, reset } from "../features/auth/authSlice";
import { GoogleLogin } from '@react-oauth/google';
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state se data nikalna
  const { user, isLoading, isError, message } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError) {
      toast.error(message || "Login failed");
    }

    // Agar user logged in hai, toh automatically home pe bhej do
    if (user) {
      toast.success("Successfully logged in");
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill in all fields");
      return;
    }
    // Redux authSlice wale login thunk ko call karna
    dispatch(login(formData));
  };

  const onGoogleSuccess = (credentialResponse) => {
    dispatch(googleLoginThunk({ token: credentialResponse.credential }));
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] flex items-center justify-center px-4 font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black transition-colors duration-500">
      
      {/* Background Subtle Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>

      <div className="w-full max-w-md bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/10 p-8 md:p-12 rounded-sm shadow-2xl relative z-10 transition-colors duration-500">
        
        <div className="text-center mb-10">
          <h1 className="text-2xl md:text-3xl font-light uppercase tracking-[0.3em] text-black dark:text-white mb-2 transition-colors duration-500">
            Welcome Back
          </h1>
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-500">
            Enter your credentials to access your archive
          </p>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 font-medium transition-colors duration-500">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="NAME@EXAMPLE.COM"
              className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 py-3 px-4 text-sm text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors duration-500 placeholder:text-gray-400 dark:placeholder:text-gray-800"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-2 font-medium transition-colors duration-500">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="••••••••"
              className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 py-3 px-4 text-sm text-black dark:text-white focus:border-black dark:focus:border-white focus:outline-none transition-colors duration-500 placeholder:text-gray-400 dark:placeholder:text-gray-800"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 mt-4 text-xs font-medium uppercase tracking-[0.3em] hover:bg-black/80 dark:hover:bg-gray-200 transition-all duration-500 disabled:opacity-50"
          >
            {isLoading ? "Authenticating..." : "Sign In"}
          </button>
        </form>

        {/* Separator */}
        <div className="flex items-center my-6">
          <div className="flex-1 border-t border-black/10 dark:border-white/10 transition-colors duration-500"></div>
          <span className="px-4 text-xs uppercase tracking-widest text-gray-500 bg-transparent transition-colors duration-500">Or</span>
          <div className="flex-1 border-t border-black/10 dark:border-white/10 transition-colors duration-500"></div>
        </div>

        {/* Google OAuth Injection */}
        <div className="w-full flex justify-center mb-6">
           <GoogleLogin 
             onSuccess={onGoogleSuccess}
             onError={() => toast.error("Google Authentication Failed")}
             theme="filled_black"
             text="continue_with"
             shape="square"
           />
        </div>

        <div className="mt-8 text-center transition-colors duration-500">
          <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-black dark:text-white border-b border-black/30 dark:border-white/30 hover:border-black dark:hover:border-white transition-colors duration-500 ml-1">
              Create One
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;