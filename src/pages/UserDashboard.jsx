import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { ShoppingBag } from "lucide-react";
import { adminGetapi } from "../services/allApi";

const UserDashboard = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [categoryFilter, setCategoryFilter] = useState("all");

    const navigate = useNavigate();
    const username = JSON.parse(sessionStorage.getItem("existingUser"))?.username || "User";

    useEffect(() => {
        fetchProducts();
    }, []);

    useEffect(() => {
        filterProducts();
    }, [search, products, categoryFilter]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const dummyRes = await fetch(`https://dummyjson.com/products`);
            const dummyData = await dummyRes.json();

            const customRes = await adminGetapi();
            const formattedCustom = customRes.data.map(p => ({
                ...p,
                id: p._id,
                thumbnail: p.images?.[0] || "https://via.placeholder.com/150",
                category: p.category?.toLowerCase().trim() || "uncategorized"
            }));


            const mergedProducts = [...dummyData.products, ...formattedCustom];
            setProducts(mergedProducts);
            setFilteredProducts(mergedProducts);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };



    const filterProducts = () => {
        let result = [...products];
        if (search) {
            result = result.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }
        if (categoryFilter !== "all") {
            result = result.filter(
                (item) => item.category?.toLowerCase().trim() === categoryFilter
            );
        }

        setFilteredProducts(result);
    };

    const handleProductClick = (id) => {
        navigate(`/product/${id}`);
    };

    // Helper function to capitalize only the first letter
    const capitalize = (str) =>
        str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    // Get unique normalized categories
    const uniqueCategories = [
        "all",
        ...new Set(
            products
                .map((p) => p.category?.toLowerCase().trim()) // normalize
                .filter(Boolean)
        ),
    ];


    const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    navigate("/login");
  };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-300 via-white to-blue-300 text-gray-800">
            {/* Header */}
            <motion.header
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col md:flex-row justify-between items-center p-6 shadow-2xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white sticky top-0 z-10 rounded-b-3xl"
            >
                <Link to={'/'}>
                    <div className="flex items-center gap-2 text-2xl font-bold">
                        <ShoppingBag className="w-7 h-7 text-yellow-200" /> Marketify Dashboard
                    </div>
                </Link>

                <div className="relative my-4 md:my-0 w-full md:w-1/3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-white bg-white text-gray-800 shadow-xl focus:outline-none focus:ring-2 focus:ring-yellow-300"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" />
                </div>

                <div className="flex items-center gap-4">
                    <FaUserCircle className="text-3xl text-yellow-200" />
                    <span className="font-semibold text-white text-lg">{username}</span>
                    <button onClick={handleLogout} className="bg-white text-pink-600 px-4 py-1.5 rounded-full shadow-md hover:scale-105 hover:bg-yellow-300 transition flex items-center gap-2">
                        <FaSignOutAlt /> Logout
                    </button>
                </div>
            </motion.header>

            {/* Filter Dropdown */}
            <div className="w-full flex ms-5 mt-6  ">
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="px-4 py-2 rounded-full bg-pink-200 border border-pink-500 text-pink-900 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                >
                    {uniqueCategories.map((cat) => (
                        <option key={cat} value={cat}>
                            {capitalize(cat)}
                        </option>

                    ))}
                </select>
            </div>

            {/* Content */}
            <main className="p-6">
                {loading ? (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-center text-xl text-blue-500 mt-10"
                    >
                        Loading products...
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {filteredProducts.map((product) => (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                onClick={() => handleProductClick(product.id)}
                                className="cursor-pointer bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 text-white rounded-2xl shadow-2xl p-4 border border-pink-300 hover:border-purple-500 transition duration-300 hover:shadow-purple-800 hover:shadow-3xl"
                                key={product.id}
                            >
                                <img
                                    src={product.thumbnail}
                                    alt={product.title}
                                    className="w-75 h-40 object-cover rounded-lg mb-4 shadow-md"
                                />
                                <h2 className="text-xl font-bold text-yellow-300">{product.title}</h2>
                                <p className="text-sm text-gray-300 mt-1 line-clamp-2">{product.description}</p>
                                <p className="mt-2 text-pink-400 font-bold text-lg">${product.price}</p>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </main>

            {/* Footer */}
            <footer className="mt-16 bg-gradient-to-r from-pink-500 to-blue-500 py-6 shadow-inner text-center text-gray-700 border-t border-white">
                <p>&copy; 2025 Marketify. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default UserDashboard;
