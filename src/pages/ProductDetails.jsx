// src/pages/ProductDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft, FaStar, FaBoxOpen } from "react-icons/fa";
import { adminGetSingleApi } from "../services/allApi";


const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        let data;
        if (id.length <= 3) {
          // DummyJSON
          const res = await fetch(`https://dummyjson.com/products/${id}`);
          data = await res.json();
        } else {
          // Backend product
          const res = await adminGetSingleApi(id);
          data = res.data;
        }
        setProduct(data);
      } catch (err) {
        console.error("Error fetching product details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-400 to-rose-500 text-white">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="bg-pink-500 text-white p-6 shadow-lg sticky top-0 z-10 flex justify-between items-center rounded-b-2xl">
          <Link to={'/'}><h1 className="text-3xl font-extrabold tracking-wide">Marketify</h1></Link>
          <button
            onClick={() => navigate(-1)}
            className="bg-white text-pink-700 px-5 py-2 rounded-full shadow-lg hover:bg-yellow-200 transition flex items-center gap-2 font-semibold"
          >
            <FaArrowLeft /> Back to Products
          </button>
        </div>
      </motion.header>

      <main className="max-w-7xl mx-auto p-6">
        {loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-xl text-white mt-20"
          >
            Loading product details...
          </motion.div>
        ) : (
          product && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gradient-to-br from-gray-900 via-purple-900 to-blue-900 bg-opacity-80 rounded-3xl shadow-2xl p-10 border-4 border-blue-300"
            >
              <div className="flex flex-col md:flex-row gap-10">
                {/* Image Gallery */}
                <div className="md:w-1/2">
                  <img
                    src={product.images?.[currentImage] || "https://via.placeholder.com/300"}
                    alt="Product"
                    className="w-full h-96 object-cover rounded-2xl border-4 border-white shadow-lg bg-purple-600"
                  />

                  <div className="flex gap-3 mt-4 overflow-x-auto">
                    {product.images?.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        onClick={() => setCurrentImage(idx)}
                        className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition border-2 ${currentImage === idx
                          ? "border-yellow-400 scale-110"
                          : "border-white hover:scale-105"
                          }`}
                        alt="thumb"
                      />
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="md:w-1/2 space-y-5">
                  <h2 className="text-4xl font-bold text-white drop-shadow">{product.title}</h2>
                  <p className="text-lg text-pink-100">{product.description}</p>

                  <div className="flex items-center gap-3 mt-4">
                    <span className="text-lg font-semibold text-yellow-200">Brand:</span>
                    <span>{product.brand}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-yellow-200">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-yellow-200">Discount:</span>
                    <span>{product.discountPercentage}%</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaStar className="text-yellow-300" />
                    <span className="text-lg">Rating: {product.rating}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <FaBoxOpen className="text-green-300" />
                    <span className={`text-lg ${product.stock > 0 ? "text-green-100" : "text-red-300"}`}>
                      {product.stock > 0 ? `In Stock (${product.stock})` : "Out of Stock"}
                    </span>
                  </div>
                  <p className="text-3xl font-extrabold text-yellow-300 mt-6">${product.price}</p>
                </div>
              </div>
            </motion.div>
          )
        )}
      </main>

      <footer className="mt-20 bg-pink-500 text-white text-center py-6 shadow-inner rounded-t-3xl text-lg">
        <p>&copy; {new Date().getFullYear()} <span className="font-semibold">Marketify</span>. Designed by Aashin</p>
      </footer>
    </div>
  );
};

export default ProductDetails;
