import React from 'react';
import Link from 'next/link';

export default function VerifyFailed() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Verification Failed ❌</h2>
        <p>Your link is either expired or invalid.</p>
        <Link href="/signup" style={styles.link}>Create a new account</Link>
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
    background: '#fff4f4',
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
    background: '#b00020',
    color: 'white',
    padding: '0.8rem 2rem',
    borderRadius: '0.5rem',
    textDecoration: 'none',
  }
};
