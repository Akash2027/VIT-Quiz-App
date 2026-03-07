import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  const name = localStorage.getItem("userName") || "STUDENT";
  const regNo = localStorage.getItem("regNo") || "REG-NO-MISSING";

  // Mode Selection Logic
  const startQuiz = (mode, subject = null, setNum = null) => {
    navigate('/quiz', { state: { mode, subject, setNum } });
  };

  const subjects = [
    "DSA", "DBMS", "OS", "CN", 
    "COA", "Java", "Python", "Software Engineering"
  ];

  // Logic to determine which set the user is currently on
  const completedSets = JSON.parse(localStorage.getItem('completedSets') || '[]');
  const currentSet = completedSets.length + 1;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="dashboard-container">
      {/* LEFT SIDEBAR: User Profile */}
      <div className="sidebar">
        <div className="avatar-circle">{name[0]}</div>
        <h2 style={{ textAlign: 'center', fontSize: '1.8rem', marginTop: '10px' }}>{name}</h2>
        <p style={{ textAlign: 'center', opacity: 0.7, fontSize: '1.1rem', letterSpacing: '2px', marginTop: '5px', color: '#e0e0e0' }}>
          {regNo}
        </p>
        
        <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
           <p style={{ fontSize: '0.8rem', opacity: 0.5, textTransform: 'uppercase', marginLeft: '10px' }}>Menu</p>
           <button className="btn-royal" style={{ background: 'rgba(255,255,255,0.1)', textAlign: 'left' }} onClick={() => navigate("/dashboard")}>Dashboard</button>
           <button className="btn-royal" style={{ background: 'transparent', textAlign: 'left', border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => navigate("/result")}>History</button>
        </div>

        <button onClick={handleLogout} style={{ marginTop: 'auto', background: 'transparent', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '15px', borderRadius: '15px', cursor: 'pointer', fontWeight: '600' }}>
          Logout
        </button>
      </div>

      {/* RIGHT CONTENT: Fixed Alignment and 2x4 Grid */}
      <div className="main-content" style={{ paddingLeft: '80px', paddingRight: '40px' }}>
        <header style={{ marginBottom: '40px' }}>
          <h1 style={{ color: '#002366', fontSize: '2.5rem' }}>Comprehensive Exam Practice</h1>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>Track your progress across 1165+ questions.</p>
        </header>

        {/* TOP SECTION: Exam Modes */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
          {/* Full Mock Exam (100 Random) */}
          <div style={{ background: 'var(--dynamic-gradient)', padding: '30px', borderRadius: '30px', color: 'white', boxShadow: '0 15px 30px rgba(0,35,102,0.2)' }}>
            <h2 style={{ fontSize: '1.5rem' }}>Random Mock Exam</h2>
            <p style={{ opacity: 0.9, margin: '10px 0 20px 0', fontSize: '0.9rem' }}>100 Random questions from all modules.</p>
            <button className="btn-royal" style={{ background: 'white', color: '#002366', width: 'auto', padding: '10px 30px' }} onClick={() => startQuiz('random')}>Start Random</button>
          </div>

          {/* Full Syllabus Progress (Set Based) */}
          <div style={{ background: 'white', padding: '30px', borderRadius: '30px', border: '2px solid #002366' }}>
            <h2 style={{ fontSize: '1.5rem', color: '#002366' }}>Syllabus Practice (Set {currentSet}/12)</h2>
            <p style={{ color: '#666', margin: '10px 0 20px 0', fontSize: '0.9rem' }}>Complete all 1165 questions sequentially.</p>
            <button className="btn-royal" style={{ width: 'auto', padding: '10px 30px' }} onClick={() => startQuiz('set', null, currentSet)}>Resume Set {currentSet}</button>
          </div>
        </div>

        {/* GRID: Subject-wise Practice (2x4 Layout) */}
        <h3 style={{ color: '#002366', marginBottom: '20px', fontSize: '1.5rem' }}>Module Wise Practice</h3>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', /* 2x4 Layout */
          gap: '25px' 
        }}>
          {subjects.map((sub) => (
            <div key={sub} style={{ background: 'white', padding: '25px', borderRadius: '25px', boxShadow: '0 5px 15px rgba(0,0,0,0.05)', border: '1px solid #f0f0f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ color: '#002366', fontSize: '1.2rem' }}>{sub}</h4>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>Practice {sub} module.</p>
              </div>
              <button className="btn-royal" style={{ width: 'auto', fontSize: '0.9rem', padding: '10px 20px' }} onClick={() => startQuiz('subject', sub)}>Practice</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}