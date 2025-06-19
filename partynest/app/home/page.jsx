"use client";
import "./home.css";
import BottomNav from '@/components/bottomnav/BottomNav';
import { FaHeart, FaShoppingCart, FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function HomePage() {
  const [userAddress, setUserAddress] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    // Mocked profile fetch – replace this with real API call later
    const fetchUserProfile = async () => {
      // Simulate an API call delay
      await new Promise((res) => setTimeout(res, 500));

      // Replace this mock with actual fetch from DB or API
      const mockProfile = {
        name: "John Doe",
        address: "123 Main St, Mumbai, Maharashtra"
      };

      setUserProfile(mockProfile);
    };

    fetchUserProfile();
  }, []);
  
  return (
    <div className="home-container">
      <header className="home-header">
        <div className="search-wrapper">
          <input type="text" placeholder="Search for products..." className="search-bar" />
          <FaSearch className="search-icon"/>
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
      <BottomNav />
    </div>
  );
}
