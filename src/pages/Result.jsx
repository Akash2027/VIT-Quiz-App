import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend
} from 'recharts';

export default function Result() {
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem('quizHistory') || '[]');
  const name = localStorage.getItem("userName") || "Student";
  const regNo = localStorage.getItem("regNo") || "";

  // Data for Radar Chart
  const subjects = ["DSA", "DBMS", "OS", "CN", "COA", "Java", "Python", "Software Engineering"];
  const radarData = subjects.map(sub => {
    const subTests = history.filter(h => h.subject === sub);
    const avgScore = subTests.length 
      ? subTests.reduce((acc, curr) => acc + parseFloat(curr.percentage), 0) / subTests.length 
      : 0;
    return { subject: sub, score: Math.round(avgScore) };
  });

  // Data for Line Chart (X-axis: Attempt #, Y-axis: Percentage)
  const lineData = [...history].reverse().map((h, idx) => ({
    attempt: `Test ${idx + 1}`,
    percentage: parseFloat(h.percentage)
  }));

  const chartBoxStyle = {
    background: 'white',
    padding: '30px',
    borderRadius: '25px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '450px', // Roughly 12cm on most laptop screens
    height: '450px' // Square shaped
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="avatar-circle">{name[0]}</div>
        <h2 style={{ textAlign: 'center', marginTop: '10px' }}>{name}</h2>
        <p style={{ textAlign: 'center', opacity: 0.7 }}>{regNo}</p>
        <button className="btn-royal" style={{ marginTop: '40px', background: 'transparent', border: '1px solid white' }} onClick={() => navigate("/dashboard")}>
          ← Dashboard
        </button>
      </div>

      <div className="main-content" style={{ padding: '40px', overflowY: 'auto' }}>
        <h1 style={{ color: '#002366', marginBottom: '40px' }}>Performance Analytics</h1>

        {history.length === 0 ? (
          <div className="auth-card" style={{ maxWidth: '100%', padding: '50px' }}>
            <h3>No Data Available</h3>
            <button className="btn-royal" onClick={() => navigate("/dashboard")}>Start Practice</button>
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginBottom: '50px', flexWrap: 'wrap' }}>
              
              {/* RADAR CHART BOX */}
              <div style={chartBoxStyle}>
                <h4 style={{ color: '#002366', marginBottom: '20px' }}>Subject Mastery (%)</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid />
                    {/* Added padding to prevent text overflow */}
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#666', fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value}%`, "Accuracy"]}
                    />
                    <Radar 
                      name="Score" 
                      dataKey="score" 
                      stroke="#002366" 
                      fill="#002366" 
                      fillOpacity={0.6} 
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>

              {/* LINE CHART BOX */}
              <div style={chartBoxStyle}>
                <h4 style={{ color: '#002366', marginBottom: '20px' }}>Improvement Timeline</h4>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="attempt" tick={{ fontSize: 12 }} />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} />
                    <Tooltip 
                      contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
                      formatter={(value) => [`${value}%`, "Score"]}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="percentage" 
                      stroke="#002366" 
                      strokeWidth={4} 
                      dot={{ r: 6, fill: '#002366', strokeWidth: 2, stroke: '#fff' }} 
                      activeDot={{ r: 8 }} 
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* SESSIONS TABLE */}
            <div style={{ background: 'white', padding: '30px', borderRadius: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '20px', color: '#002366' }}>Recent Session History</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #eee', textAlign: 'left', color: '#666' }}>
                    <th style={{ padding: '15px' }}>Date</th>
                    <th>Module</th>
                    <th>Score</th>
                    <th>Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {history.map((h, i) => (
                    <tr key={i} style={{ borderBottom: '1px solid #f9f9f9' }}>
                      <td style={{ padding: '15px', fontSize: '0.9rem' }}>{h.date}</td>
                      <td style={{ fontWeight: '600' }}>{h.subject}</td>
                      <td>{h.score} / {h.total}</td>
                      <td>
                        <span style={{ 
                          padding: '5px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold',
                          background: parseFloat(h.percentage) >= 50 ? '#e8f5e9' : '#ffebee',
                          color: parseFloat(h.percentage) >= 50 ? '#2e7d32' : '#c62828'
                        }}>
                          {h.percentage}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}