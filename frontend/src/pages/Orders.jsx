import { useSelector, useDispatch } from "react-redux";
import { Navigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { getMyOrdersThunk, cancelOrderThunk } from "../features/order/orderslice";
const Orders = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const allOrders = useSelector((state) => state.orders?.orders || []);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  useEffect(() => {
    if (user) {
      dispatch(getMyOrdersThunk());
    }
  }, [dispatch, user]);

  const orders = allOrders.slice(); // Not needed to filter anymore since backend only returns for this user

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black pb-32 pt-10 transition-colors duration-500">

      {/* LUXURY ANIMATIONS */}
      <style>
        {`
          @keyframes reveal {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .order-card { animation: reveal 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards; opacity: 0; }
          .status-dot { width: 6px; height: 6px; border-radius: 50%; display: inline-block; margin-right: 8px; }
          .status-processing { background: #fbbf24; box-shadow: 0 0 10px #fbbf24; }
          .status-shipped { background: #3b82f6; box-shadow: 0 0 10px #3b82f6; }
          .status-cancelled { background: #ef4444; box-shadow: 0 0 10px #ef4444; }
        `}
      </style>

      <div className="container mx-auto px-4 lg:px-12 py-10 max-w-6xl">

        {/* Cinematic Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-black/10 dark:border-white/10 pb-10 mb-16 gap-6 transition-colors duration-500">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.5em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Member Archive</span>
            <h1 className="text-4xl md:text-6xl font-light uppercase tracking-[0.2em] text-black dark:text-white transition-colors duration-500">
              Orders
            </h1>
          </div>
          <div className="flex flex-col items-start md:items-end">
            <span className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-1 transition-colors duration-500">Authenticated Account</span>
            <span className="text-xs uppercase tracking-widest text-black dark:text-white border border-black/20 dark:border-white/20 px-4 py-1 rounded-full transition-colors duration-500">
              {user.name || "Client"} — {orders.length} Records
            </span>
          </div>
        </header>

        {/* Empty State - Advanced Design */}
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 border border-dashed border-black/10 dark:border-white/10 rounded-sm transition-colors duration-500">
            <p className="text-xs uppercase tracking-[0.4em] text-gray-500 dark:text-gray-400 mb-8 transition-colors duration-500">
              No acquisitions found in your history.
            </p>
            <Link
              to="/products"
              className="group relative px-12 py-4 border border-black dark:border-white text-black dark:text-white text-xs font-medium uppercase tracking-[0.3em] overflow-hidden transition-all duration-500"
            >
              <span className="relative z-10 group-hover:text-white dark:group-hover:text-black transition-colors duration-500">Explore Collection</span>
              <div className="absolute inset-0 bg-black dark:bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </Link>
          </div>
        ) : (
          <div className="space-y-10">
            {orders.map((order, index) => (
              <div
                key={order._id}
                className="order-card bg-white dark:bg-[#0a0a0a] border border-black/5 dark:border-white/5 hover:border-black/20 dark:hover:border-white/20 transition-all duration-700 p-6 md:p-10 relative overflow-hidden group shadow-sm dark:shadow-none"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Background Decoration */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-[60px] group-hover:bg-black/[0.05] dark:group-hover:bg-white/[0.05] transition-all duration-700"></div>

                {/* Card Top: Metadata */}
                <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-6 border-b border-black/5 dark:border-white/5 pb-8 mb-8 transition-colors duration-500">
                  <div className="space-y-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Identification No.</p>
                    <h2 className="text-sm font-light uppercase tracking-[0.1em] text-black dark:text-white transition-colors duration-500">
                      #{order._id.substring(order._id.length - 6)}
                    </h2>
                  </div>

                  <div className="flex flex-col md:items-end gap-1">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Order Placed</p>
                    <p className="text-[11px] uppercase tracking-widest text-black dark:text-white transition-colors duration-500">{order.date}</p>
                  </div>

                  <div className="flex flex-col md:items-end gap-2">
                    <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Status</p>
                    <div className="flex items-center">
                      <span className={`status-dot ${order.status === "Cancelled" ? "status-cancelled" :
                          order.status === "Processing" ? "status-processing" : "status-shipped"
                        }`}></span>
                      <span className={`text-xs font-bold uppercase tracking-[0.2em] ${order.status === "Cancelled" ? "text-red-500" : "text-black dark:text-white"
                        } transition-colors duration-500`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Ordered Items List */}
                <div className="space-y-8 mb-10">
                  {order.orderItems.map((item) => (
                    <div key={item._id || Math.random()} className="flex items-center gap-6 group/item">
                      <div className="relative w-20 h-24 md:w-24 md:h-32 overflow-hidden bg-gray-100 dark:bg-[#111] transition-colors duration-500">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover grayscale-[40%] group-hover/item:grayscale-0 group-hover/item:scale-110 transition-all duration-1000"
                        />
                      </div>

                      <div className="flex-1 space-y-2">
                        <h3 className="text-xs md:text-xs uppercase tracking-[0.2em] font-light text-black dark:text-white group-hover/item:text-indigo-600 dark:group-hover/item:text-indigo-400 transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-widest transition-colors duration-500">
                          Quantity: {item.quantity} / {item.selectedSize || 'N/A'}
                        </p>
                        <p className="text-xs font-bold text-black dark:text-white md:hidden transition-colors duration-500">₹{item.price * item.quantity}</p>
                      </div>

                      <div className="hidden md:block text-xs font-bold text-black dark:text-white tracking-widest transition-colors duration-500">
                        ₹{item.price * item.quantity}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer Section */}
                <div className="flex flex-col md:flex-row md:justify-between md:items-center pt-8 border-t border-black/5 dark:border-white/5 gap-8 transition-colors duration-500">
                  <div className="flex gap-12">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Payment</p>
                      <p className="text-xs uppercase tracking-widest text-black dark:text-white transition-colors duration-500">{order.paymentMethod || "Direct"}</p>
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 transition-colors duration-500">Total Value</p>
                      <p className="text-sm font-bold tracking-widest text-black dark:text-white transition-colors duration-500">₹{order.totalPrice}</p>
                    </div>
                  </div>

                  {/* Cancellation Logic */}
                  {order.status === "Processing" && (
                    <button
                      onClick={() => dispatch(cancelOrderThunk(order._id))}
                      className="group flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-gray-500 dark:text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <span className="w-4 h-[1px] bg-gray-400 dark:bg-gray-700 group-hover:bg-red-500 transition-all"></span>
                      Request Cancellation
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Global Shop Action */}
        {orders.length > 0 && (
          <div className="mt-24 text-center">
            <Link
              to="/products"
              className="text-xs uppercase tracking-[0.5em] text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white border-b border-black/10 dark:border-white/10 hover:border-black dark:hover:border-white transition-all pb-2"
            >
              Back to Archive
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;