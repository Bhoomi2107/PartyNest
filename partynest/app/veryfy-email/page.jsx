"use client";
import { useEffect, useState } from "react";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState("Verifying...");

  useEffect(() => {
    const verify = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const token = searchParams.get("token");

      if (!token) {
        setStatus("Invalid verification link.");
        return;
      }

      try {
        const res = await fetch(`/api/verify-email?token=${token}`);
        const text = await res.text();
        if (res.ok) {
          setStatus("✅ Email verified successfully! You can now log in.");
        } else {
          setStatus(`❌ ${text}`);
        }
      } catch (err) {
        setStatus("Something went wrong. Please try again later.");
      }
    };

    verify();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2>{status}</h2>
        {status.includes("successfully") && (
          <a href="/login" style={styles.button}>Go to Login</a>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#f9f2f7",
  },
  box: {
    textAlign: "center",
    padding: "3rem",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
  },
  button: {
    marginTop: "2rem",
    display: "inline-block",
    backgroundColor: "#682000",
    color: "white",
    padding: "1rem 2rem",
    borderRadius: "8px",
    textDecoration: "none",
  },
};
