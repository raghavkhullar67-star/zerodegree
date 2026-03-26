import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPasswordAPI } from "../service/api";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    
    try {
      setLoading(true);
      const res = await forgotPasswordAPI({ email });
      setMessage(res.message || "Email sent successfully");
      toast.success(res.message || "Email sent");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans px-4 transition-colors duration-500">
      <div className="w-full max-w-md bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-2xl transition-colors duration-500">
        <h2 className="text-2xl font-light uppercase tracking-[0.2em] mb-2 text-center transition-colors duration-500">Reset Password</h2>
        <p className="text-xs text-gray-500 tracking-widest text-center mb-8 transition-colors duration-500">Enter your email to receive a reset link</p>

        {message && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-4 text-xs uppercase tracking-widest mb-6 text-center">
            {message}
          </div>
        )}

        <form onSubmit={submitHandler} className="space-y-6">
          <div>
            <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Email Address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 placeholder-gray-500 dark:placeholder-slate-600 transition-colors duration-500"
              placeholder="name@example.com"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-4 bg-black dark:bg-white text-white dark:text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link to="/login" className="text-xs tracking-widest uppercase text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-transparent hover:border-black dark:hover:border-white pb-1 transition-all">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
