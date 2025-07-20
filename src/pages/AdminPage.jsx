// AdminDashboard.jsx
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaBoxOpen, FaUserShield, FaSignOutAlt } from "react-icons/fa";
import { adminAddapi, adminDeleteApi, adminEditapi, adminGetapi } from "../services/allApi";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const categoryOptions = ["Beauty", "Fragrances", "Furniture", "Groceries"];

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    brand: "",
    category: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    images: ""
  });
  const [editId, setEditId] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    fetchCustomProducts();
  }, []);

  const fetchCustomProducts = async () => {
    try {
      const res = await adminGetapi();
      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {
      title,
      description,
      price,
      brand,
      category,
      discountPercentage,
      rating,
      stock,
      images
    } = formData;

    if (!title || !description || !price || !brand || !category || !discountPercentage || !rating || !stock || !images) {
      return setError("All fields are required");
    }
    setError("");
    try {
      const updatedData = { ...formData, images: images.split(',') };
      if (editId) {
        await adminEditapi(updatedData, editId);
        setEditId(null);
      } else {
        await adminAddapi(updatedData);
      }
      setFormData({
        title: "",
        description: "",
        price: "",
        brand: "",
        category: "",
        discountPercentage: "",
        rating: "",
        stock: "",
        images: ""
      });
      fetchCustomProducts();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (product) => {
    const { _id, createdAt, updatedAt, __v, ...cleanData } = product;
    setFormData({
      ...cleanData,
      images: cleanData.images.join(',')
    });
    setEditId(product._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await adminDeleteApi(id);
        fetchCustomProducts();
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-100 to-purple-100">
      {/* Header */}
      <header className="bg-pink-800 text-white py-5 px-6 flex justify-between items-center shadow-lg sticky top-0 z-10">
        <div className="flex items-center gap-3 text-2xl font-bold">
          <FaUserShield className="text-yellow-300" /> Admin Dashboard
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 bg-white text-pink-800 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 transition shadow cursor-pointer">
          <FaSignOutAlt /> Logout
        </button>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/3 bg-pink-200 p-6 shadow-2xl">
          <motion.h2
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-xl font-bold mb-4 text-pink-800"
          >
            {editId ? "Edit Product" : "Add Product"}
          </motion.h2>

          {error && <p className="text-red-600 font-medium mb-2">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-3">
            <input name="title" placeholder="Title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <input name="brand" placeholder="Brand" value={formData.brand} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <select name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow">
              <option value="">Select Category</option>
              {categoryOptions.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <input name="discountPercentage" type="number" placeholder="Discount %" value={formData.discountPercentage} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <input name="rating" type="number" step="0.1" placeholder="Rating" value={formData.rating} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <input name="stock" type="number" placeholder="Stock" value={formData.stock} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <input name="images" placeholder="Image URLs (comma separated)" value={formData.images} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none" />
            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2 border-2 border-pink-400 rounded-lg shadow focus:outline-none"></textarea>
            <button type="submit" className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl font-bold shadow-xl hover:scale-105 transition">
              {editId ? <FaEdit className="inline mr-2" /> : <FaPlus className="inline mr-2" />} {editId ? "Update" : "Add"} Product
            </button>
          </form>
        </aside>

        {/* Main Content */}
        <main className="w-full lg:w-2/3 p-6">
          {/* Chart */}
          <div className="mb-8 rounded-lg shadow-xl p-4 bg-pink-200 ">
            <h3 className="text-xl font-semibold mb-4 text-pink-700">Product Stock Overview</h3>
            <ResponsiveContainer width="100%" height={200} >
              <BarChart data={products}>
                <CartesianGrid strokeDasharray="3 3" stroke="#888" />
                <XAxis dataKey="title" tick={{ fontSize: 10 }} interval={0} angle={-45} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="stock" fill="#db2777" barSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Product List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
            {products.map((product) => (
              <div key={product._id} className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 p-4 text-white rounded-xl shadow-2xl border border-purple-300 hover:shadow-pink-400 transition-all duration-300">
                <img src={product.images[0]} alt={product.title} className="w-50 h-40 object-cover rounded-md shadow-md" />
                <h3 className="text-lg font-bold  mt-2">{product.title}</h3>
                <p className="text-sm  line-clamp-2">{product.description}</p>
                <p className=" font-semibold mt-1">${product.price}</p>
                <p className="text-xs ">Brand: {product.brand} | Category: {product.category}</p>
                <div className="flex justify-between mt-3">
                  <button onClick={() => handleEdit(product)} className="bg-yellow-400 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:scale-105"><FaEdit /> Edit</button>
                  <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-3 py-1 rounded-lg flex items-center gap-1 hover:scale-105"><FaTrash /> Delete</button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="mt-16 text-center py-6 bg-pink-800 text-white font-medium shadow-inner">
        &copy; {new Date().getFullYear()} Marketify Admin Panel. Designed by Aashin
      </footer>
    </div>
  );
};

export default AdminDashboard;
