import { FaBars, FaTimes, FaArrowLeft } from "react-icons/fa"; // Naya icon add kiya hai
import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/admin") return location.pathname === "/admin";
    return location.pathname.startsWith(path);
  };

  return (
    <div className="flex h-screen w-full bg-slate-950 text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-white overflow-hidden">
      
      {/* FIXED SIDEBAR */}
      <aside className={`bg-slate-950 border-r border-slate-800/60 w-64 flex-shrink-0 transition-transform duration-300 flex flex-col absolute md:relative z-50 h-full ${sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        
        <div className="flex justify-between items-center p-6 mb-6">
          <h2 className="text-xl font-light uppercase tracking-[0.2em] text-white">
            Zero <span className="text-slate-400">HQ</span>
          </h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="md:hidden text-slate-400 hover:text-white transition-colors"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Admin Navigation Links */}
        <ul className="space-y-2 flex-1 px-4">
          <li>
            <Link onClick={() => setSidebarOpen(false)} to="/admin" className={`block text-xs uppercase tracking-[0.15em] py-3 px-4 rounded-sm transition-colors ${isActive("/admin") ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"}`}>
              Dashboard
            </Link>
          </li>
          <li>
            <Link onClick={() => setSidebarOpen(false)} to="/admin/products" className={`block text-xs uppercase tracking-[0.15em] py-3 px-4 rounded-sm transition-colors ${isActive("/admin/products") ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"}`}>
              Products
            </Link>
          </li>
          <li>
            <Link onClick={() => setSidebarOpen(false)} to="/admin/orders" className={`block text-xs uppercase tracking-[0.15em] py-3 px-4 rounded-sm transition-colors ${isActive("/admin/orders") ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"}`}>
              Orders
            </Link>
          </li>
          <li>
            <Link onClick={() => setSidebarOpen(false)} to="/admin/users" className={`block text-xs uppercase tracking-[0.15em] py-3 px-4 rounded-sm transition-colors ${isActive("/admin/users") ? "text-indigo-300 bg-indigo-500/10 border border-indigo-500/20" : "text-slate-400 hover:text-white hover:bg-slate-900 border border-transparent"}`}>
              Users
            </Link>
          </li>
        </ul>

        {/* BOTTOM SECTION: Back to Store & Version */}
        <div className="border-t border-slate-800/60 p-6 mt-auto">
          {/* BACK TO STORE BUTTON */}
          <Link 
            to="/" 
            className="flex items-center gap-3 text-xs uppercase tracking-[0.15em] text-slate-400 hover:text-white transition-colors mb-4 px-2 group"
          >
            <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" /> 
            Back to Store
          </Link>
          
          <p className="text-xs uppercase tracking-widest text-slate-400 px-2">System v2.0 Live</p>
        </div>
      </aside>

      {/* MOBILE OVERLAY */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 md:hidden" onClick={() => setSidebarOpen(false)}></div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* FIXED TOP NAVBAR */}
        <header className="bg-slate-950/80 backdrop-blur-md flex-shrink-0 border-b border-slate-800/60 p-4 lg:px-8 flex justify-between items-center z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="text-slate-400 hover:text-white transition-colors md:hidden"
            >
              <FaBars size={20} />
            </button>
            <h1 className="text-sm font-medium uppercase tracking-[0.15em] text-white hidden sm:block">
              HQ Control Panel
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-widest text-slate-400 hidden sm:block">Admin Session</span>
            <div className="w-8 h-8 bg-slate-800 border border-slate-700 flex items-center justify-center text-white text-xs font-medium cursor-pointer hover:border-white transition-colors rounded-sm">
              A
            </div>
          </div>
        </header>

        {/* SCROLLABLE OUTLET */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-4 lg:p-8">
          <Outlet /> 
        </div>

      </main>

    </div>
  );
};

export default AdminLayout;