import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();
  // We'll simulate checking if a user is logged in
  const userEmail = localStorage.getItem("userEmail") || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 30px',
      background: '#004a99',
      color: 'white',
      height: '60px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.2)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none' }}>VIT MCQ Portal</Link>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <span style={{ fontSize: '0.9rem', opacity: '0.9' }}>{userEmail}</span>
        <div style={{
          width: '35px',
          height: '35px',
          borderRadius: '50%',
          background: '#fff',
          color: '#004a99',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          fontWeight: 'bold',
          cursor: 'pointer'
        }} title="Account Settings">
          {userEmail[0].toUpperCase()}
        </div>
        <button onClick={handleLogout} style={{
          background: 'rgba(255,255,255,0.1)',
          color: 'white',
          border: '1px solid white',
          padding: '5px 12px',
          fontSize: '12px'
        }}>Logout</button>
      </div>
    </nav>
  );
}