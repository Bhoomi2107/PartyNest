"use client";
import Image from "next/image";
import Link from "next/link";
import "../styles/landingpage.css";

export default function landingpagePage() {

  return (
    <>
      <header className="header">
        <div className="logo">PartyNest</div>
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="hamburger">☰</label>
        <nav className="nav">
          <Link href="/auth/login">Login</Link>
          <Link href="/auth/signup">Signup</Link>
        </nav>
      </header>

      <section className="hero">
        <div className="hero-image">
          <Image
            src="/image/image-carousel1.png"
            alt="PartyNest Hero Banner"
            layout="fill"
            objectFit="cover"
            priority
          />
        </div> 
        <div className="content-glass">
          <div className="content">
            <h3 className="fade-in-text">Welcome to <span>PartyNest</span></h3>
            <p>Your one-stop shop for party props, decorations, and more!</p>
            <a href="/pages/home" className="btn fade-inbutton">Shop Now</a>
          </div>
        </div>
      </section>
    </>
  );
}



