import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile, updateUserProfile, uploadFile } from "../service/api";
import { logout } from "../features/auth/authSlice";
import toast from "react-hot-toast";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) return;
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();
        setName(data.name);
        setEmail(data.email);
        setAvatar(data.avatar || "");
      } catch (error) {
        toast.error("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const updatedUser = await updateUserProfile({ name, email, password, avatar });
      toast.success("Profile Updated");
      // Optionally update Redux state via an action, but token/basic info is stored in LocalStorage.
      localStorage.setItem("userInfo", JSON.stringify(updatedUser));
      setPassword("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);
      try {
        setUploading(true);
        const imagePath = await uploadFile(formData);
        // Ensure the path properly handles local server paths for display.
        // Assuming your backend serves /uploads relative to root
        setAvatar(`http://127.0.0.1:5000${imagePath}`);
      } catch (error) {
        toast.error("Failed to upload image");
      } finally {
        setUploading(false);
      }
    }
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white transition-colors duration-500">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans pt-32 pb-24 px-4 md:px-8 transition-colors duration-500 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl font-light uppercase tracking-[0.15em] mb-12 transition-colors duration-500">Account Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Sidebar */}
          <div className="md:col-span-1 space-y-8">
            <div className="flex flex-col items-center p-8 bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-500">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 dark:bg-[#111] mb-6 border border-black/10 dark:border-white/10 flex items-center justify-center transition-colors duration-500">
                {avatar ? (
                  <img src={avatar} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-3xl uppercase transition-colors duration-500">{name.charAt(0)}</span>
                )}
              </div>
              <h3 className="text-xl font-light uppercase tracking-widest text-center transition-colors duration-500">{name}</h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 tracking-[0.2em] mt-2 transition-colors duration-500">{email}</p>
              
              <button 
                onClick={logoutHandler}
                className="mt-8 text-xs uppercase tracking-widest text-red-500 dark:text-red-400 border-b border-red-500/50 dark:border-red-400/50 hover:text-red-600 hover:border-red-600 dark:hover:text-red-300 dark:hover:border-red-300 pb-1 transition-colors"
              >
                Sign Out
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2">
            <form onSubmit={submitHandler} className="space-y-6 bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-black/5 dark:border-white/5 shadow-sm dark:shadow-none transition-colors duration-500">
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Full Name</label>
                <input 
                  type="text" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors duration-500"
                />
              </div>
              
              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Email Address</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 transition-colors duration-500"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">Avatar URL or Local Upload</label>
                <div className="flex items-center gap-4">
                  <input 
                    type="text" 
                    value={avatar} 
                    onChange={(e) => setAvatar(e.target.value)}
                    placeholder="URL..."
                    className="flex-1 bg-transparent dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 placeholder-gray-400 dark:placeholder-slate-600 transition-colors duration-500"
                  />
                  <div className="relative overflow-hidden cursor-pointer h-full">
                    <button type="button" className="bg-black/5 dark:bg-white/10 text-black dark:text-white px-4 py-3 text-xs uppercase tracking-widest hover:bg-black/10 dark:hover:bg-white/20 transition cursor-pointer h-full border border-black/10 dark:border-white/10">
                      {uploading ? "Uploading..." : "Upload"}
                    </button>
                    <input 
                      type="file" 
                      onChange={uploadFileHandler}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      disabled={uploading}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-500">New Password (Optional)</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Leave blank to keep current"
                  className="w-full bg-transparent dark:bg-black border border-black/10 dark:border-white/10 p-3 text-sm text-black dark:text-white focus:outline-none focus:border-black/40 dark:focus:border-white/40 placeholder-gray-400 dark:placeholder-slate-600 transition-colors duration-500"
                />
              </div>

              <div className="pt-4">
                <button 
                  disabled={loading}
                  type="submit" 
                  className="bg-black dark:bg-white text-white dark:text-black px-10 py-4 text-xs uppercase tracking-[0.2em] hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors w-full md:w-auto"
                >
                  {loading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
