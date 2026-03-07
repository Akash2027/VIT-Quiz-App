import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Authenticate with Firebase
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Fetch User Profile from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        // Sync to localStorage for the Dashboard to read immediately
        localStorage.setItem("userName", userData.name);
        localStorage.setItem("regNo", userData.regNo);
        localStorage.setItem("userEmail", userData.email);
        localStorage.setItem("userUid", user.uid);
      }

      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      alert("❌ Login Failed: Check your credentials or sign up first.");
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p>Comprehensive Exam Practice Portal</p>
        <form onSubmit={handleLogin}>
          <input type="email" placeholder="Student Email ID" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-royal">Login to Practice</button>
        </form>
        <div style={{marginTop: '25px'}}>
          New here? <Link to="/signup" style={{color: '#0056b3', fontWeight: 'bold', textDecoration: 'none'}}>Create Account</Link>
        </div>
      </div>
    </div>
  );
}