import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); // Added password state
  const [name, setName] = useState('');
  const [regNo, setRegNo] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    
    // Strict VIT Email Check
    if (!email.toLowerCase().endsWith("@vitstudent.ac.in")) {
      alert("⚠️ Access Denied: Use your @vitstudent.ac.in email address.");
      return;
    }

    try {
      // 1. Create User in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Save detailed profile to Firestore Cloud Database
      await setDoc(doc(db, "users", user.uid), {
        name: name.toUpperCase(),
        regNo: regNo.toUpperCase(),
        email: email.toLowerCase(),
        uid: user.uid,
        createdAt: new Date()
      });

      alert("✅ Account created successfully! Please login.");
      navigate("/login");
    } catch (error) {
      console.error(error);
      alert("❌ Error: " + error.message);
    }
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card">
        <h2>Join the Portal</h2>
        <p>Comprehensive Exam Practice Portal</p>
        <form onSubmit={handleSignup}>
          <input type="text" placeholder="Full Name" onChange={(e) => setName(e.target.value)} required />
          <input type="text" placeholder="Register Number (e.g. 21BCE1234)" onChange={(e) => setRegNo(e.target.value)} required />
          <input type="email" placeholder="VIT Student Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Create Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="btn-royal">Create Account</button>
        </form>
        <div style={{marginTop: '20px'}}>
          Already have an account? <Link to="/login" style={{color: '#0056b3', fontWeight: 'bold', textDecoration: 'none'}}>Login</Link>
        </div>
      </div>
    </div>
  );
}