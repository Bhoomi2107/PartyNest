'use client';
import Link from 'next/link';
import { FaHome, FaShoppingCart, FaUser, FaBars, FaBoxOpen } from 'react-icons/fa';
import '@/components/BottomNav/BottomNav.css';
export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <div className="circle"><div className="inner-circle"><Link href="/orders" className="nav-item"><FaBoxOpen /><span className="label">My orders</span></Link></div></div>
      <div className="circle"><div className="inner-circle"><Link href="/home" className="nav-item"><FaHome /><span className="label">Home</span></Link></div></div>
      <div className="circle"><div className="inner-circle"><Link href="/cart" className="nav-item"><FaShoppingCart /><span className="label">Cart</span></Link></div></div>
      <div className="circle"><div className="inner-circle"><Link href="/menu" className="nav-item"><FaBars /><span className="label">Menu</span></Link></div></div>
    </nav>
  );
}