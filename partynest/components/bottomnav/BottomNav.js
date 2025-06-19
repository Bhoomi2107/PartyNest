// 'use client';
// import Link from 'next/link';
// import { FaHome, FaShoppingCart, FaUser, FaBars, FaHeart } from 'react-icons/fa';
// import '@/components/BottomNav/BottomNav.css';
// export default function BottomNav() {
//   return (
//     <nav className="bottom-nav">
//       <Link href="/profile" className="nav-item"><FaUser /><span>Profile</span></Link>
//       <Link href="/menu" className="nav-item"><FaBars /><span>Menu</span></Link>

//       <div className="nav-center">
//         <Link href="/home" className="home-button">
//           <FaHome />
//         </Link>
//         <span className="home-label">Home</span>
//       </div>

//       <Link href="/wishlist" className="nav-item"><FaHeart /><span>Wishlist</span></Link>
//       <Link href="/cart" className="nav-item"><FaShoppingCart /><span>Cart</span></Link>
//     </nav>
//   );
// }


'use client';
import Link from 'next/link';
import { FaHome, FaShoppingCart, FaUser, FaBars, FaHeart } from 'react-icons/fa';
import '@/components/BottomNav/BottomNav.css';

export default function BottomNav() {
  return (
    <nav className="bottom-nav">
      <Link href="/profile" className="nav-item" data-label="Profile">
        <FaUser />
      </Link>

      <Link href="/menu" className="nav-item" data-label="Menu">
        <FaBars />
      </Link>

      <div className="nav-center">
        <Link href="/home" className="home-button" data-label="Home">
          <FaHome />
        </Link>
      </div>

      <Link href="/wishlist" className="nav-item" data-label="Wishlist">
        <FaHeart />
      </Link>

      <Link href="/cart" className="nav-item" data-label="Cart">
        <FaShoppingCart />
      </Link>
    </nav>
  );
}
