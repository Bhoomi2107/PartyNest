"use client";
import React from "react";
import "./home.css";
import BottomNav from '@/components/bottomnav/BottomNav';

export default function HomePage() {
  return (
    <div className="home-container">
      <h1>Welcome to PartyNest</h1>
      <p>Explore amazing party props and decorations.</p>

      <section className="highlight">
        <h2>Featured Collections</h2>
        <div className="cards">
          <div className="card">🎈 Balloons</div>
          <div className="card">🎂 Cake Toppers</div>
          <div className="card">🎁 Gift Boxes</div>
        </div>
        <BottomNav />
      </section>
      
    </div>
  );
}
