import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";
import { createOrder, getRazorpayConfig, createRazorpayOrder, verifyRazorpayPayment } from "../service/api";
import { clearCart } from "../features/cart/cartSlice";
import toast from "react-hot-toast";

const indiaData = {
  "Punjab": ["Ludhiana", "Amritsar", "Jalandhar", "Patiala", "Bathinda"],
  "Delhi": ["New Delhi", "North Delhi", "South Delhi", "West Delhi"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Thane", "Nashik"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubballi", "Mangaluru"],
  "Haryana": ["Gurugram", "Faridabad", "Panipat", "Ambala"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Noida", "Agra", "Varanasi"],
  "Gujarat": ["Ahmedabad", "Surat", "Vadodara", "Rajkot"],
  "Rajasthan": ["Jaipur", "Jodhpur", "Udaipur", "Kota"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Salem"],
  "West Bengal": ["Kolkata", "Howrah", "Durgapur", "Siliguri"]
};

// Helper to load Razorpay script
const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
};

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [address, setAddress] = useState({
    fullName: "", phone: "", houseNo: "", area: "", landmark: "", city: "", state: "", pincode: "",
  });

  const [showStates, setShowStates] = useState(false);
  const [showCities, setShowCities] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
    if (name === "state") setShowStates(true);
    if (name === "city") setShowCities(true);
  };

  // State selection handler
  const selectState = (stateName) => {
    setAddress({ ...address, state: stateName, city: "" }); // State select hote hi city reset
    setShowStates(false);
  };

  // City selection handler
  const selectCity = (cityName) => {
    setAddress({ ...address, city: cityName });
    setShowCities(false);
  };

  const filteredStates = useMemo(() => {
    return Object.keys(indiaData).filter(s =>
      s.toLowerCase().includes(address.state.toLowerCase())
    );
  }, [address.state]);

  const filteredCities = useMemo(() => {
    const cities = indiaData[address.state] || Object.values(indiaData).flat();
    return cities.filter(c =>
      c.toLowerCase().includes(address.city.toLowerCase())
    );
  }, [address.state, address.city]);

  const totalPrice = items.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleOrderSubmit = async (razorpayPaymentId = null) => {
    if (items.length === 0) return;
    if (!user) return navigate("/login");
    
    // Address Validation
    if(!address.fullName || !address.phone || !address.houseNo || !address.city || !address.state || !address.pincode) {
      toast.error("Please fill all shipping details.");
      return;
    }

    setLoading(true);
    
    try {
      if (paymentMethod === "online" && !razorpayPaymentId) {
        setLoading(false);
        const res = await loadRazorpayScript();
        if (!res) {
          toast.error("Razorpay SDK failed to load. Are you online?");
          return;
        }

        const { key } = await getRazorpayConfig();
        const order = await createRazorpayOrder(totalPrice);

        const options = {
          key: key,
          amount: order.amount,
          currency: "INR",
          name: "Zero Degree",
          description: "Transaction for Zero Degree Purchase",
          order_id: order.id,
          handler: async function (response) {
            try {
              const verifyRes = await verifyRazorpayPayment({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              });

              if (verifyRes.message === "success") {
                await handleOrderSubmit(response.razorpay_payment_id);
              }
            } catch (err) {
               toast.error("Payment verification failed!");
            }
          },
          prefill: {
            name: address.fullName,
            email: user.email,
            contact: address.phone,
          },
          theme: {
            color: "#0a0a0a",
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        return;
      }

      const formattedItems = items.map(i => ({
        title: i.title,
        quantity: i.quantity,
        image: i.image,
        price: i.price,
        product: i._id || i.id, // ID resolving
        selectedSize: i.selectedSize
      }));

      const newOrder = { 
        orderItems: formattedItems, 
        totalPrice, 
        shippingAddress: address, 
        paymentMethod: paymentMethod === 'online' ? `Razorpay (${razorpayPaymentId})` : paymentMethod, 
        date: new Date().toLocaleString() 
      };

      await createOrder(newOrder);
      dispatch(clearCart());
      toast.success("Order Placed Successfully!");
      setLoading(false);
      navigate("/order-success");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to create order");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#050505] text-black dark:text-white font-sans pb-20 pt-28 md:pt-32 transition-colors duration-500">
      
      <div className="container mx-auto px-4 lg:px-12 max-w-7xl">
        <h1 className="text-3xl md:text-5xl font-light uppercase tracking-[0.2em] mb-12 border-b border-black/10 dark:border-white/10 pb-8 transition-colors duration-500">Secure Checkout</h1>

        <div className="flex flex-col lg:flex-row gap-16">
          <div className="flex-1 space-y-16">
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-500">1</span>
                <h2 className="text-xs uppercase tracking-[0.3em] font-semibold">Shipping Details</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-black/5 dark:border-white/5 rounded-lg transition-colors duration-500">
                <input type="text" name="fullName" placeholder="Full Name" value={address.fullName} onChange={handleAddressChange} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />
                <input type="number" name="phone" placeholder="Mobile Number" value={address.phone} onChange={handleAddressChange} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />
                <input type="text" name="houseNo" placeholder="Address" value={address.houseNo} onChange={handleAddressChange} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all md:col-span-2 placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />

                {/* --- STATE FIELD --- */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-500">State</label>
                  <input type="text" name="state" autoComplete="off" placeholder="Punjab" value={address.state} onChange={handleAddressChange} onFocus={() => setShowStates(true)} onBlur={() => setTimeout(() => setShowStates(false), 200)} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />
                  {showStates && filteredStates.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 z-50 max-h-40 overflow-y-auto transition-colors duration-500 shadow-xl">
                      {filteredStates.map(s => (
                        <div key={s} onMouseDown={() => selectState(s)} className="suggestion-item px-4 py-2 text-xs uppercase cursor-pointer transition-colors text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                          {s}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* --- CITY FIELD --- */}
                <div className="flex flex-col gap-2 relative">
                  <label className="text-xs uppercase tracking-widest text-gray-500 dark:text-gray-400 transition-colors duration-500">City</label>
                  <input type="text" name="city" autoComplete="off" placeholder="Ludhiana" value={address.city} onChange={handleAddressChange} onFocus={() => setShowCities(true)} onBlur={() => setTimeout(() => setShowCities(false), 200)} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />
                  {showCities && filteredCities.length > 0 && (
                    <div className="absolute top-full left-0 w-full bg-gray-50 dark:bg-[#111] border border-black/10 dark:border-white/10 z-50 max-h-40 overflow-y-auto transition-colors duration-500 shadow-xl">
                      {filteredCities.map(c => (
                        <div key={c} onMouseDown={() => selectCity(c)} className="suggestion-item px-4 py-2 text-xs uppercase cursor-pointer transition-colors text-black dark:text-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                          {c}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <input type="number" name="pincode" placeholder="141001" value={address.pincode} onChange={handleAddressChange} className="w-full border-b border-black/20 dark:border-white/20 bg-transparent py-2 text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:border-black dark:focus:border-white focus:shadow-[0_1px_0_0_#000] dark:focus:shadow-[0_1px_0_0_#fff] outline-none transition-all placeholder:text-[10px] md:placeholder:text-xs placeholder:tracking-widest" />
              </div>
            </section>

            {/* Payment Section (Same as before) */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <span className="bg-black text-white dark:bg-white dark:text-black text-xs font-bold w-6 h-6 flex items-center justify-center rounded-full transition-colors duration-500">2</span>
                <h2 className="text-xs uppercase tracking-[0.3em] font-semibold">Payment</h2>
              </div>
              <div className="bg-white dark:bg-[#0a0a0a] p-8 md:p-12 border border-black/5 dark:border-white/5 rounded-lg transition-colors duration-500">
                <div className="flex flex-wrap gap-4 mb-6">
                  {["cod", "online"].map(m => (
                    <button 
                      key={m} 
                      onClick={() => setPaymentMethod(m)} 
                      className={`px-8 py-4 text-xs uppercase border transition-all ${paymentMethod === m ? "bg-black dark:bg-white text-white dark:text-black border-black dark:border-white" : "border-black/10 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-black/40 dark:hover:border-white/40"}`}
                    >
                      {m === "cod" ? "Cash on Delivery" : "Pay Online"}
                    </button>
                  ))}
                </div>

                {paymentMethod === "online" && (
                  <div className="mt-8 pt-6 border-t border-black/10 dark:border-white/10 transition-colors duration-500">
                    <h3 className="text-xs uppercase font-bold tracking-widest text-black dark:text-white mb-4 transition-colors duration-500">Secure Online Payment</h3>
                    <p className="text-gray-500 dark:text-gray-400 text-xs tracking-widest uppercase transition-colors duration-500">You will be redirected to Razorpay to complete your payment securely via Cards, UPI, or Netbanking.</p>
                  </div>
                )}
                
                {paymentMethod === "cod" && (
                  <p className="text-gray-500 dark:text-gray-400 text-xs tracking-widest mt-6 uppercase transition-colors duration-500">You will pay via Cash on Delivery when the package arrives.</p>
                )}
              </div>
            </section>
          </div>

          <aside className="w-full lg:w-[420px]">
            <div className="bg-gray-50 dark:bg-[#111] text-black dark:text-white p-10 sticky top-28 shadow-xl dark:shadow-black/50 border border-black/5 dark:border-white/5 transition-colors duration-500 rounded-sm">
              <h2 className="text-xs font-bold uppercase tracking-[0.3em] mb-10 border-b border-black/10 dark:border-white/10 pb-6 transition-colors duration-500">Order Summary</h2>
              <div className="space-y-6 mb-8 max-h-[30vh] overflow-y-auto pr-2 custom-scrollbar">
                {items.map(item => (
                  <div key={item._id} className="flex justify-between items-center group">
                    <div className="flex gap-4">
                      <img src={item.image} className="w-12 h-16 object-cover opacity-90 group-hover:opacity-100 transition-opacity" />
                      <div><p className="text-xs font-bold uppercase">{item.title}</p><p className="text-xs text-gray-500 dark:text-gray-400 uppercase transition-colors duration-500">{item.selectedSize} x {item.quantity}</p></div>
                    </div>
                    <span className="text-xs font-bold">₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-black/10 dark:border-white/10 pt-6 transition-colors duration-500">
                <div className="flex justify-between text-lg font-bold"><span>Total</span><span>₹{totalPrice}</span></div>
                
                <button 
                  onClick={() => handleOrderSubmit(null)} 
                  disabled={loading} 
                  className="w-full py-5 mt-10 bg-black dark:bg-white text-white dark:text-black text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-gray-800 dark:hover:bg-gray-200 transition-all"
                >
                  {loading ? "Processing..." : (paymentMethod === "online" ? "Pay Securely & Place Order" : "Place Order Now")}
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;