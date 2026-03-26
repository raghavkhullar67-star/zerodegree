import { useState, useEffect } from "react";
import { FaSearch, FaEye } from "react-icons/fa";
import { fetchAllOrders, updateOrderStatus } from "../service/api";

const AdminOrders = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadOrders = async () => {
    try {
      const data = await fetchAllOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to load generic orders mapping:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const customer = order.user?.name || "Unknown";
    return customer.toLowerCase().includes(search.toLowerCase()) && (statusFilter === "All" || order.status === statusFilter);
  });

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "text-emerald-400 bg-emerald-400/10 border-emerald-400/20";
      case "Pending": 
      case "Processing": return "text-indigo-400 bg-indigo-400/10 border-indigo-400/20";
      case "Shipped": return "text-amber-400 bg-amber-400/10 border-amber-400/20";
      case "Cancelled": return "text-rose-400 bg-rose-400/10 border-rose-400/20";
      default: return "text-slate-400 bg-slate-800 border-slate-700";
    }
  };

  if (loading) {
    return <div className="text-white animate-pulse p-10">Loading Mission Control Archives...</div>;
  }

  return (
    <div className="bg-slate-900/40 border border-slate-800/60 p-6 md:p-10 rounded-sm animate-fade-in">
      
      <div className="mb-10 border-b border-slate-800/60 pb-6">
        <h2 className="text-xl md:text-2xl font-light uppercase tracking-[0.15em] text-white">Client Transactions</h2>
        <p className="text-xs uppercase tracking-widest text-slate-400 mt-2">Monitor and manage global orders</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-between mb-8">
        <div className="relative w-full md:w-1/3">
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-400" />
          <input type="text" placeholder="SEARCH CLIENT..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-12 pr-4 py-3 bg-slate-950/50 border border-slate-800 text-xs uppercase tracking-widest text-white focus:border-indigo-400 focus:outline-none placeholder-slate-700 transition-colors rounded-sm" />
        </div>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-3 bg-slate-950/50 border border-slate-800 text-xs uppercase tracking-widest text-slate-300 focus:border-indigo-400 focus:outline-none transition-colors rounded-sm appearance-none cursor-pointer">
          <option value="All">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      <div className="overflow-x-auto custom-scrollbar">
        <table className="w-full text-left whitespace-nowrap">
          <thead>
            <tr className="border-b border-slate-800/60 text-xs uppercase tracking-widest text-slate-400">
              <th className="py-4 px-4 font-normal">Order ID</th>
              <th className="py-4 px-4 font-normal">Client</th>
              <th className="py-4 px-4 font-normal">Date</th>
              <th className="py-4 px-4 font-normal">Status</th>
              <th className="py-4 px-4 font-normal">Amount</th>
              <th className="py-4 px-4 font-normal text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-sm font-light text-slate-300">
            {filteredOrders.length === 0 ? (
                <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-400 text-xs">No orders located.</td>
                </tr>
            ) : (
                filteredOrders.map((order) => (
                <tr key={order._id} className="border-b border-slate-800/40 hover:bg-slate-800/20 transition-colors">
                    <td className="py-5 px-4 font-medium text-slate-400">#{order._id.substring(order._id.length - 6)}</td>
                    <td className="py-5 px-4 text-white">{order.user?.name || "Unknown"}</td>
                    <td className="py-5 px-4 text-slate-400">{order.date || new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-5 px-4">
                    <select 
                        value={order.status}
                        onChange={async (e) => {
                        await updateOrderStatus(order._id, e.target.value);
                        loadOrders();
                        }}
                        className={`px-3 py-1 rounded-sm border outline-none appearance-none cursor-pointer text-xs uppercase tracking-widest ${getStatusColor(order.status)}`}
                    >
                        <option value="Processing" className="bg-slate-900 text-white">Processing</option>
                        <option value="Shipped" className="bg-slate-900 text-white">Shipped</option>
                        <option value="Delivered" className="bg-slate-900 text-white">Delivered</option>
                        <option value="Cancelled" className="bg-slate-900 text-white">Cancelled</option>
                    </select>
                    </td>
                    <td className="py-5 px-4 text-white">₹{order.totalPrice.toLocaleString()}</td>
                    <td className="py-5 px-4 text-right">
                    <button className="inline-flex items-center gap-2 border border-slate-700 text-slate-300 px-4 py-2 text-xs uppercase tracking-widest hover:border-white hover:text-white transition-all duration-300 rounded-sm">
                        <FaEye /> View
                    </button>
                    </td>
                </tr>
                ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminOrders;