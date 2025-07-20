import React from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Rocket, Star } from "lucide-react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 text-white">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex justify-between items-center p-6 shadow-2xl bg-white/10 backdrop-blur-md rounded-b-3xl"
      >
        <h1 className="text-3xl font-bold flex items-center gap-2 text-white cursor-pointer">
          <ShoppingBag className="w-8 h-8 " /> Marketify
        </h1>
        <nav className="flex gap-6 text-lg font-medium items-center">
          <a href="/home" className="hover:text-yellow-300 cursor-pointer">Features</a>
          <a href="/home" className="hover:text-yellow-300  cursor-pointer">Products</a>
          <a href="#contact" className="hover:text-yellow-300 cursor-pointer">Contact</a>
         
              <Link to={'/login'}>
                  <button className="ml-4 bg-white text-purple-700 px-4 py-2 rounded-full shadow hover:scale-105 transition font-semibold cursor-pointer text-sm">
                    Sign Up
                  </button>
              </Link>
         
        </nav>
      </motion.header>

      {/* Hero Section */}
      <section className="flex flex-col md:flex-row justify-between items-center px-10 py-20">
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 space-y-6"
        >
          <h2 className="text-5xl font-bold leading-tight">
            Smart Market <span className="text-yellow-300">Platform</span>
          </h2>
          <p className="text-lg">
            Manage your products with ease. Boost your business with our modern and intuitive marketplace.
          </p>
        
             <Link to={'/register'}>
                  <button className="bg-white text-purple-700 px-6 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition cursor-pointer">
                    Get Started
                  </button>
             </Link>
         
        </motion.div>

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="md:w-1/2 mt-10 md:mt-0"
        >
          <img
            src="https://img.pikbest.com/wp/202409/digital-marketing-social-media-premium-photo-pink-background-3d-megaphone-for_9736799.jpg!bw700"
            alt="Marketplace Illustration"
            className="w-full max-w-lg mx-auto rounded-2xl"
          />
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-10 py-20 bg-white/10 rounded-3xl shadow-inner">
        <h3 className="text-4xl font-bold text-center mb-12">Why Choose Us?</h3>
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 p-8 rounded-2xl shadow-xl cursor-pointer"
          >
            <Rocket className="w-12 h-12 mx-auto text-yellow-300" />
            <h4 className="text-2xl font-semibold mt-4">Fast Onboarding</h4>
            <p className="mt-2">Get started in minutes with our easy-to-use interface.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 p-8 rounded-2xl shadow-xl cursor-pointer"
          >
            <Star className="w-12 h-12 mx-auto text-yellow-300" />
            <h4 className="text-2xl font-semibold mt-4">Top Features</h4>
            <p className="mt-2">Packed with powerful tools to manage products and customers.</p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white/20 p-8 rounded-2xl shadow-xl cursor-pointer"
          >
            <ShoppingBag className="w-12 h-12 mx-auto text-yellow-300" />
            <h4 className="text-2xl font-semibold mt-4">Stylish Interface</h4>
            <p className="mt-2">A modern look that matches your brand identity perfectly.</p>
          </motion.div>
        </div>
      </section>

      {/* More Content Section */}
      <section className="px-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="bg-white/20 backdrop-blur-md p-10 rounded-2xl shadow-xl"
        >
          <h3 className="text-4xl font-bold text-center mb-6">Trusted by Thousands</h3>
          <p className="text-center text-lg max-w-3xl mx-auto">
            Our platform is used by businesses around the globe to simplify their inventory, manage customer relations, and supercharge their growth. Join the revolution and take your market game to the next level.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="mt-20 bg-white/10 text-white px-10 py-10 rounded-t-3xl shadow-2xl"
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div>
            <h4 className="text-2xl font-bold mb-2">Marketify</h4>
            <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
          </div>
          <div className="flex gap-4 text-2xl mt-4 md:mt-0">
            <FaInstagram className="hover:text-yellow-300 cursor-pointer" />
            <FaTwitter className="hover:text-yellow-300 cursor-pointer" />
            <FaFacebook className="hover:text-yellow-300 cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
