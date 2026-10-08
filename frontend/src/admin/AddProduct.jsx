import { useState, useEffect } from "react";
import { FaUpload, FaTimes, FaTrash, FaPlus, FaEdit } from "react-icons/fa";
import { fetchProducts, createProduct, deleteProduct, updateProduct, uploadFile } from "../service/api";
import { getImageUrl } from "../utils/imageUtils";

const AddProduct = () => {
  // --- STATES ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(0);
  const [editingId, setEditingId] = useState(null); // New state for editing
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    price: "",
    stock: "",
    description: "",
    image: "", // Yahan image ka URL ya file handle hogi
    images: "", // Comma-separated alternative images
    colors: "" // Comma-separated colors
  });

  // --- FETCH PRODUCTS ---
  const loadProducts = async () => {
    try {
      // Fetch a large limit for the admin list to avoid pagination for now
      const data = await fetchProducts({ limit: 1000 });
      // Depending on backend, data might be { products: [...] } or just an array
      setProducts(data.products || data);
    } catch (error) {
      console.error("Error loading products", error);
    }
  };

  useEffect(() => {
    loadProducts();
  }, []);

  // --- HANDLERS ---
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePasteInInput = async (e, mode) => {
    const cpData = e.clipboardData || e.nativeEvent?.clipboardData;
    if (!cpData) return;
    const items = cpData.items;

    let hasFiles = false;
    for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file' && items[i].type.startsWith('image/')) hasFiles = true;
    }
    
    if (hasFiles) {
        e.preventDefault(); // Stop standard text paste entirely only if files exist
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.kind === 'file' && item.type.startsWith('image/')) {
            const blob = item.getAsFile();
            try {
              setUploadingImage(prev => prev + 1);
              const fd = new FormData();
              fd.append("image", blob);
              const uploadedUrl = await uploadFile(fd);
              
              if (mode === 'primary') {
                  setFormData(prev => ({ ...prev, image: uploadedUrl }));
              } else {
                  setFormData(prev => {
                      let newImagesArr = typeof prev.images === "string" ? (prev.images ? prev.images.split(",").map(i=>i.trim()) : []) : (prev.images || []);
                      newImagesArr.push(uploadedUrl);
                      return { ...prev, images: newImagesArr.join(", ") };
                  });
              }
            } catch (err) {
              alert("Image upload failed");
            } finally {
              setUploadingImage(prev => Math.max(0, prev - 1));
            }
          }
        }
    }
  };

  const handleFileUpload = async (e, mode) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      setUploadingImage(prev => prev + 1);
      const fd = new FormData();
      fd.append("image", file);
      const uploadedUrl = await uploadFile(fd);
      
      if (mode === 'primary') {
          setFormData(prev => ({ ...prev, image: uploadedUrl }));
      } else {
          setFormData(prev => {
              let newImagesArr = typeof prev.images === "string" ? (prev.images ? prev.images.split(",").map(i=>i.trim()) : []) : (prev.images || []);
              newImagesArr.push(uploadedUrl);
              return { ...prev, images: newImagesArr.join(", ") };
          });
      }
    } catch (err) {
      alert("Image upload failed");
    } finally {
      setUploadingImage(prev => Math.max(0, prev - 1));
      e.target.value = null; // reset input
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      
      const payload = { ...formData };
      
      // Convert comma-separated string to arrays
      if (typeof payload.images === "string") {
        payload.images = payload.images.split(",").map(i => i.trim()).filter(i => i);
      }
      if (typeof payload.colors === "string") {
        payload.colors = payload.colors.split(",").map(c => c.trim()).filter(c => c);
      }

      if (editingId) {
         await updateProduct(editingId, payload);
         alert("Piece Updated Successfully 🚀");
         setEditingId(null);
      } else {
         await createProduct(payload);
         alert("Piece Added to Collection 🚀");
      }
      setFormData({ title: "", category: "", price: "", stock: "", description: "", image: "", images: "", colors: "" });
      loadProducts(); // List refresh karein
    } catch (error) {
      alert("Error processing product request");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setEditingId(product._id);
    setFormData({
      title: product.title,
      category: product.category,
      price: product.price,
      stock: product.stock,
      description: product.description,
      image: product.image,
      images: Array.isArray(product.images) ? product.images.join(", ") : "",
      colors: Array.isArray(product.colors) ? product.colors.join(", ") : ""
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", category: "", price: "", stock: "", description: "", image: "", images: "", colors: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to remove this piece?")) {
      try {
        await deleteProduct(id);
        loadProducts();
      } catch (error) {
        alert("Delete failed");
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-10 items-start">
        
        {/* LEFT: ADD PRODUCT FORM */}
        <div className="w-full lg:w-1/2 bg-slate-900/40 border border-slate-800/60 p-6 md:p-10 rounded-sm">
          <div className="mb-8 border-b border-slate-800/60 pb-6 flex justify-between items-center">
            <h2 className="text-xl font-light uppercase tracking-[0.2em] text-white flex items-center gap-3">
              {editingId ? <FaEdit size={16} className="text-amber-400" /> : <FaPlus size={16} className="text-indigo-400" />} 
              {editingId ? "Edit Piece" : "Add New Piece"}
            </h2>
            {editingId && (
              <button 
                onClick={cancelEdit} 
                className="text-xs text-slate-400 uppercase hover:text-white border border-slate-700 px-3 py-1"
              >
                Cancel Edit
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Product Name</label>
              <input name="title" value={formData.title} onChange={handleInputChange} type="text" placeholder="E.G. TECH-JACKET 01" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none transition-colors" required />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Category</label>
                <select name="category" value={formData.category} onChange={handleInputChange} className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none" required>
                  <option value="">Select</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Kids">Kids</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Price (₹)</label>
                <input name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="0" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none" required />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Inventory Stock</label>
                <input name="stock" value={formData.stock} onChange={handleInputChange} type="number" placeholder="Qty" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none" required />
              </div>
              <div>
                 <div className="flex justify-between items-center mb-2">
                   <label className="text-xs uppercase tracking-widest text-slate-400">Primary Image {uploadingImage > 0 && '(Uploading...)'}</label>
                   <label className="cursor-pointer text-[10px] uppercase text-indigo-400 hover:text-indigo-300">
                      Upload File
                      <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'primary')} />
                   </label>
                 </div>
                 <input name="image" value={formData.image} onChange={handleInputChange} onPaste={(e) => handlePasteInInput(e, 'primary')} type="text" placeholder="URL or Paste Image Here" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs uppercase tracking-widest text-slate-400">Additional Images {uploadingImage > 0 && '(Uploading...)'}</label>
                <label className="cursor-pointer text-[10px] uppercase text-indigo-400 hover:text-indigo-300">
                    Upload File
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'additional')} />
                </label>
              </div>
              <input name="images" value={typeof formData.images === "string" ? formData.images : (formData.images || []).join(", ")} onChange={handleInputChange} onPaste={(e) => handlePasteInInput(e, 'additional')} type="text" placeholder="Separate URLs by comma, or Paste image here" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none mb-3" />
              
              {/* Visual Grid for Additional Images */}
              {(() => {
                 let arr = typeof formData.images === "string" ? (formData.images ? formData.images.split(",").map(i=>i.trim()).filter(Boolean) : []) : (formData.images || []);
                 if (arr.length === 0) return null;
                 return (
                   <div className="flex flex-wrap gap-4 mb-3">
                     {arr.map((imgUrl, idx) => (
                       <div key={idx} className="relative group p-2 bg-slate-950/50 border border-slate-800">
                         <img src={getImageUrl(imgUrl)} className="w-16 h-20 object-cover border border-slate-700" alt="additional" />
                         <button type="button" onClick={() => {
                            let newArr = [...arr];
                            newArr.splice(idx, 1);
                            setFormData(prev => ({...prev, images: newArr.join(", ")}));
                         }} className="absolute -top-2 -right-2 bg-rose-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-rose-400">
                            <FaTimes size={10} />
                         </button>
                       </div>
                     ))}
                   </div>
                 )
              })()}
            </div>

            <div>
              <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Colors (Comma Separated Hex/Names)</label>
              <input name="colors" value={formData.colors} onChange={handleInputChange} type="text" placeholder="Black, #ffffff, Blue" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none" />
            </div>

            <div>
              <label className="block mb-2 text-xs uppercase tracking-widest text-slate-400">Description</label>
              <textarea name="description" value={formData.description} onChange={handleInputChange} rows="3" className="w-full bg-slate-950/50 border border-slate-800 py-3 px-4 text-sm text-white focus:border-indigo-400 focus:outline-none resize-none" required></textarea>
            </div>

            {formData.image && (
              <div className="flex items-center gap-4 bg-slate-950/50 p-3 border border-slate-800">
                <img src={getImageUrl(formData.image)} className="w-16 h-20 object-cover border border-slate-700" alt="preview" />
                <button type="button" onClick={() => setFormData(prev => ({...prev, image: ""}))} className="text-rose-500 text-xs uppercase tracking-widest hover:text-rose-400">Remove</button>
              </div>
            )}

            <button type="submit" disabled={loading || uploadingImage > 0} className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.3em] hover:bg-indigo-400 transition-all">
              {loading ? "Processing..." : (editingId ? "Update Piece" : "Publish Piece")}
            </button>
          </form>
        </div>

        {/* RIGHT: MANAGE PRODUCTS LIST */}
        <div className="w-full lg:w-1/2 bg-slate-900/20 border border-slate-800/40 p-6 rounded-sm min-h-[600px]">
          <div className="mb-8">
            <h2 className="text-xl font-light uppercase tracking-[0.2em] text-white">Live Archive</h2>
            <p className="text-xs text-slate-400 uppercase tracking-widest mt-2">{products.length} Items currently listed</p>
          </div>

          <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2 custom-scrollbar">
            {products.map((item) => (
              <div key={item._id} className="group flex items-center gap-4 bg-slate-950/40 border border-slate-800/60 p-3 hover:border-slate-600 transition-all">
                <img src={getImageUrl(item.image)} alt="" className="w-12 h-16 object-cover bg-slate-900" />
                <div className="flex-1">
                  <h3 className="text-xs uppercase tracking-widest text-white truncate w-40">{item.title}</h3>
                  <p className="text-xs text-slate-400 mt-1">₹{item.price} — {item.category}</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                        <p className="text-xs uppercase text-slate-400">Stock</p>
                        <p className={`text-xs ${item.stock < 5 ? 'text-rose-500' : 'text-emerald-500'}`}>{item.stock}</p>
                    </div>
                    <button 
                        onClick={() => handleEdit(item)}
                        className="p-3 text-slate-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all rounded-sm mr-2"
                        title="Edit Product"
                    >
                        <FaEdit size={14} />
                    </button>
                    <button 
                        onClick={() => handleDelete(item._id)}
                        className="p-3 text-slate-400 hover:text-rose-500 hover:bg-rose-500/10 transition-all rounded-sm"
                        title="Delete Product"
                    >
                        <FaTrash size={14} />
                    </button>
                </div>
              </div>
            ))}

            {products.length === 0 && (
                <div className="text-center py-20 text-slate-400 uppercase text-xs tracking-widest">
                    No products found in database
                </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddProduct;