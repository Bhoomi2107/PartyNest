import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';
import '@/components/bottomnav/BottomNav.css';


// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PartyNest",
  description: "Your Party Props Destination",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Toaster />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}

