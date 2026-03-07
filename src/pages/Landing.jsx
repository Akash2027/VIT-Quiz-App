import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '750px', width: '90%', padding: '50px' }}>
        <h1 style={{ color: '#002366', fontSize: '2.8rem', marginBottom: '10px' }}>
          Comprehensive Quiz Portal
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#555', fontWeight: '600', marginBottom: '30px' }}>
          Exclusive for M.Tech Integrated Software Engineering Students
        </p>

        <div style={{ background: '#f8f9fa', padding: '25px', borderRadius: '20px', textAlign: 'left', borderLeft: '6px solid #002366', marginBottom: '30px' }}>
          <h3 style={{ color: '#002366', marginBottom: '10px' }}>Project Overview:</h3>
          <ul style={{ lineHeight: '1.8', color: '#333', fontSize: '1rem' }}>
            <li><strong>Source Material:</strong> All 1,165+ questions are curated from the official 
              <a href="https://drive.google.com/file/d/1ooKpvppA5JlDr7EDrBFrKTwAOp_boHGy/view?usp=sharing" 
                 target="_blank" rel="noreferrer" style={{ color: '#0056b3', textDecoration: 'underline', marginLeft: '5px' }}>
                VTOP Course PDF
              </a>.
            </li>
            <li><strong>How to Use:</strong> Login with your VIT ID to access 12 structured practice sets or attempt the randomized 100-question Mock Exam.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
          <button className="btn-royal" style={{ width: '250px' }} onClick={() => navigate('/login')}>
            Proceed to Login
          </button>
          <button className="btn-royal" style={{ width: '250px', background: 'transparent', color: '#002366', border: '2px solid #002366' }} onClick={() => navigate('/signup')}>
            Create Account
          </button>
        </div>

        <hr style={{ margin: '40px 0', border: '0', borderTop: '1px solid #eee' }} />

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: '#777', fontSize: '0.9rem' }}>Report incorrect answers or queries to:</p>
          <h4 style={{ margin: '5px 0', color: '#002366' }}>Akash K</h4>
          <a href="https://www.linkedin.com/in/akash-k-bb9a20274/" target="_blank" rel="noreferrer" 
             style={{ color: '#0077b5', textDecoration: 'none', fontWeight: 'bold' }}>
             Connect on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
}