import { useState, useEffect } from "react";
import { FaUsers, FaShoppingCart, FaBoxOpen, FaDollarSign } from "react-icons/fa";
import { fetchDashboardStats } from "../service/api";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalOrders: 0,
    totalProducts: 0,
    totalRevenue: 0,
    recentOrders: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStats = async () => {
      try {
        const data = await fetchDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load dashboard statistics:", error);
      } finally {
        setLoading(false);
      }
    };
    loadStats();
  }, []);

  if (loading) {
    return <div className="text-white animate-pulse p-10">Loading Intelligence HQ...</div>;
  }

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-slate-900/40 border border-slate-800/60 p-6 hover:border-slate-600 transition-colors duration-300 rounded-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Total Clients</p>
              <h3 className="text-2xl font-light text-white">{stats.totalClients}</h3>
            </div>
            <FaUsers className="text-slate-400 text-xl" />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 p-6 hover:border-slate-600 transition-colors duration-300 rounded-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Orders</p>
              <h3 className="text-2xl font-light text-white">{stats.totalOrders}</h3>
            </div>
            <FaShoppingCart className="text-slate-400 text-xl" />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 p-6 hover:border-slate-600 transition-colors duration-300 rounded-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Products</p>
              <h3 className="text-2xl font-light text-white">{stats.totalProducts}</h3>
            </div>
            <FaBoxOpen className="text-slate-400 text-xl" />
          </div>
        </div>

        <div className="bg-slate-900/40 border border-slate-800/60 p-6 hover:border-slate-600 transition-colors duration-300 rounded-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">Revenue</p>
              <h3 className="text-2xl font-light text-white">₹{stats.totalRevenue.toLocaleString()}</h3>
            </div>
            <FaDollarSign className="text-indigo-400 text-xl" />
          </div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-sm">
        <h2 className="text-xs uppercase tracking-[0.15em] font-medium text-white mb-6">Recent Transactions</h2>
        <div className="overflow-x-auto custom-scrollbar">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-slate-800/60 text-xs uppercase tracking-widest text-slate-400">
                <th className="py-3 px-2 font-normal">Order ID</th>
                <th className="py-3 px-2 font-normal">Client</th>
                <th className="py-3 px-2 font-normal">Date</th>
                <th className="py-3 px-2 font-normal">Status</th>
                <th className="py-3 px-2 font-normal text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="text-sm font-light text-slate-300">
              {stats.recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="py-6 text-center text-slate-400 text-xs">No transactions yet.</td>
                </tr>
              ) : (
                stats.recentOrders.map(order => (
                  <tr key={order._id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                    <td className="py-4 px-2 text-slate-400">#{order._id.substring(order._id.length - 6)}</td>
                    <td className="py-4 px-2 text-white">{order.user?.name || 'Unknown'}</td>
                    <td className="py-4 px-2 text-slate-400">{order.date || new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-2">
                      <span className={`text-xs uppercase tracking-widest px-2 py-1 border rounded-sm ${order.status === 'Delivered' ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' : order.status === 'Cancelled' ? 'text-rose-400 bg-rose-400/10 border-rose-400/20' : order.status === 'Processing' ? 'text-indigo-400 bg-indigo-400/10 border-indigo-400/20' : 'text-amber-400 bg-amber-400/10 border-amber-400/20'}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-2 text-right text-white">₹{order.totalPrice.toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminDashboard;