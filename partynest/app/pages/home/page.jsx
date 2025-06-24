"use client";
import "./home.css";
import BottomNav from '@/components/bottomnav/BottomNav';
import {FaHeart, FaShoppingCart, FaSearch, FaMapMarkerAlt, FaUserCircle} from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [pin, setPin] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      await new Promise((res) => setTimeout(res, 500));
      setUserProfile({
        name: "Bhoomi",
        avatar: "/user.png"
      });
    };

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to load products", error);
      }
    };

    fetchUser();
    fetchProducts();
  }, []);

  const handlePinSubmit = async (e) => {
    e.preventDefault();
    if (!pin.trim()) return;

    try {
      const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
      const data = await res.json();

      if (data[0].Status === "Success") {
        const area = data[0].PostOffice[0].District;
        setDeliveryInfo(`${area} - ${pin}`);
      } else {
        setDeliveryInfo("Invalid PIN code");
      }
    } catch (error) {
      console.error("PIN fetch error:", error);
      setDeliveryInfo("Error fetching area info");
    }
  };

  return (
    <div className="home-container">
      {/* Mobile View */}
      <div className="mobile-view">
        <header className="home-header">
          <div className="profile-section">
            <FaUserCircle className="profile-icon" />
            <span className="username">{userProfile?.name}</span>
          </div>
          <div className="header-icons">
            <FaHeart className="icon" />
            <Link href="/cart" className="cart-icon">
              <FaShoppingCart className="icon" />
            </Link>
          </div>
        </header>

        <div className="search-wrapper">
          <input type="text" placeholder="Search for products..." className="search-bar" />
          <FaSearch className="search-icon" />
        </div>

        <form className="location-bar" onSubmit={handlePinSubmit}>
          <FaMapMarkerAlt className="location-icon" /><span className="delivery-label">Deliver to</span>
          {deliveryInfo && <p className="delivery-info">{deliveryInfo}</p>}
          <input
            type="text"
            placeholder="Enter PIN Code"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="pin-input"
          />
          <button type="submit" className="pin-submit">Go</button>
        </form>
      </div>

      {/* Desktop View */}
      <div className="desktop-view">
        <header className="home-header">
          <div className="search-wrapper">
            <input type="text" placeholder="Search for products..." className="search-bar" />
            <FaSearch className="search-icon" />
          </div>
          <div className="header-icons">
            <FaHeart className="icon" />
            <Link href="/cart" className="cart-icon">
              <FaShoppingCart className="icon" />
            </Link>
          </div>
        </header>

        {userProfile?.address && (
          <div className="location-bar">
            <FaMapMarkerAlt className="location-icon" />
            <div className="location-text">
              <span className="delivered-label">Delivered to</span>
              <span className="user-info">
                {userProfile.name}, {userProfile.address}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Product Listing */}
      <section className="product-grid">
        <h2>Products</h2>
        {products.map((product) => (
          <div className="product-card" key={product._id}>
            <img src={product.imageUrl} alt={product.title} className="product-img" />
            <span>{product.title}</span>
            <p>₹{product.price}</p>
            <button className="buy-btn">Add to Cart</button>
          </div>
        ))}
      </section>

      <BottomNav />
    </div>
  );
}
