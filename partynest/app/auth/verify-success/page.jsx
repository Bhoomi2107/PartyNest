import React from 'react';
import Link from 'next/link';

export default function VerifySuccess() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Email Verified Successfully! ✅</h2>
        <p>You can now login to your account.</p>
        <Link href="/login" style={styles.link}>Go to Login</Link>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#fef6f8',
  },
  card: {
    padding: '3rem',
    background: 'white',
    borderRadius: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    textAlign: 'center',
  },
  link: {
    marginTop: '1rem',
    display: 'inline-block',
    background: '#a14e20',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  }
};
