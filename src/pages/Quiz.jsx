import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getQuestionsBySubject, getRandomMockExam, getQuestionSet } from '../utils/quizLogic';
import { auth, db } from '../firebase'; // Added Firebase imports
import { collection, addDoc } from 'firebase/firestore'; // Added Firestore imports

export default function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { mode, subject, setNum } = location.state || { mode: 'random' };

  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); 
  const [isFinished, setIsFinished] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    let quizData = [];
    if (mode === 'subject') quizData = getQuestionsBySubject(subject);
    else if (mode === 'set') quizData = getQuestionSet(setNum);
    else quizData = getRandomMockExam();
    setQuestions(quizData);
  }, [mode, subject, setNum]);

  const handleOptionSelect = (opt) => {
    setUserAnswers({ ...userAnswers, [currentIndex]: opt });
  };

  const handleNext = () => {
    if (!userAnswers[currentIndex]) {
      alert("⚠️ Selection Required: Please choose an option before moving to the next question.");
      return;
    }

    if (currentIndex + 1 < questions.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      calculateFinalScore();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const calculateFinalScore = async () => { // Made async for Firebase
    let finalScore = 0;
    questions.forEach((q, index) => {
      if (userAnswers[index] === q.answer) finalScore++;
    });

    const resultEntry = {
      userId: auth.currentUser?.uid || "anonymous", // Added for Real-world tracking
      id: Date.now(),
      subject: subject || (mode === 'set' ? `Set ${setNum}` : "Full Mock"),
      score: finalScore,
      total: questions.length,
      percentage: ((finalScore / questions.length) * 100).toFixed(1),
      date: new Date().toLocaleString(),
      timestamp: new Date().getTime()
    };

    // --- REAL WORLD CLOUD SAVE START ---
    try {
      await addDoc(collection(db, "quizHistory"), resultEntry);
    } catch (error) {
      console.error("Cloud Save Failed:", error);
    }
    // --- REAL WORLD CLOUD SAVE END ---

    // SAVE TO HISTORY (Local remains for instant UI update)
    const existingHistory = JSON.parse(localStorage.getItem('quizHistory') || '[]');
    localStorage.setItem('quizHistory', JSON.stringify([resultEntry, ...existingHistory]));

    // If set mode, update progress
    if (mode === 'set') {
      const completed = JSON.parse(localStorage.getItem('completedSets') || '[]');
      if (!completed.includes(setNum)) {
        completed.push(setNum);
        localStorage.setItem('completedSets', JSON.stringify(completed));
      }
    }

    setScore(finalScore);
    setIsFinished(true);
  };

  if (isFinished) {
    const wrongAnswers = questions.filter((q, idx) => userAnswers[idx] !== q.answer);
    return (
      <div className="auth-page-wrapper" style={{ overflowY: 'auto', padding: '40px 0' }}>
        <div className="auth-card" style={{ maxWidth: '800px', width: '90%' }}>
          <h2 style={{ color: '#002366' }}>Quiz Completed!</h2>
          <div style={{ margin: '30px 0', padding: '20px', background: '#f8f9fa', borderRadius: '20px' }}>
            <h1 style={{ fontSize: '3.5rem', color: '#002366' }}>{score} / {questions.length}</h1>
            <p style={{ fontWeight: '600', color: score > (questions.length/2) ? '#28a745' : '#dc3545' }}>
              {score > (questions.length/2) ? "Excellent Performance!" : "Needs Improvement!"}
            </p>
          </div>

          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', marginBottom: '30px' }}>
            <button className="btn-royal" style={{ width: 'auto' }} onClick={() => navigate("/dashboard")}>Go to Dashboard</button>
            <button className="btn-royal" style={{ width: 'auto', background: '#6c757d' }} onClick={() => setShowReview(!showReview)}>
              {showReview ? "Hide Mistakes" : "Review Mistakes"}
            </button>
          </div>

          {showReview && (
            <div style={{ textAlign: 'left', marginTop: '20px' }}>
              <h3 style={{ marginBottom: '15px', borderBottom: '2px solid #eee', paddingBottom: '10px' }}>Your Mistakes ({wrongAnswers.length})</h3>
              {wrongAnswers.map((q, idx) => (
                <div key={idx} style={{ marginBottom: '20px', padding: '20px', borderRadius: '15px', border: '1px solid #ddd' }}>
                  <p style={{ fontWeight: '600' }}>{q.question}</p>
                  <div style={{ background: '#ffebee', color: '#c62828', padding: '10px', borderRadius: '8px', marginTop: '10px' }}>
                    <strong>Your Choice:</strong> {userAnswers[questions.indexOf(q)]}
                  </div>
                  <div style={{ background: '#e8f5e9', color: '#2e7d32', padding: '10px', borderRadius: '8px', marginTop: '5px' }}>
                    <strong>Correct:</strong> {q.answer}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  if (questions.length === 0) return <div className="auth-page-wrapper"><h1>Loading...</h1></div>;
  const currentQ = questions[currentIndex];

  return (
    <div className="auth-page-wrapper">
      <div className="auth-card" style={{ maxWidth: '900px', width: '95%', textAlign: 'left' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#004a99', fontWeight: 'bold' }}>
          <span>{subject || (mode === 'set' ? `Set ${setNum}` : "Mock Exam")}</span>
          <span>Question {currentIndex + 1} of {questions.length}</span>
        </div>
        <h3 style={{ lineHeight: '1.6', marginBottom: '30px', fontSize: '1.4rem' }}>{currentQ.question}</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          {currentQ.options.map((opt, i) => (
            <button key={i} onClick={() => handleOptionSelect(opt)} 
              style={{ 
                padding: '20px', textAlign: 'left', borderRadius: '18px', display: 'flex', alignItems: 'center',
                border: userAnswers[currentIndex] === opt ? '3px solid #002366' : '1px solid #ddd', 
                background: userAnswers[currentIndex] === opt ? '#eef2ff' : 'white', cursor: 'pointer', fontSize: '1.1rem' 
              }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: userAnswers[currentIndex] === opt ? '#002366' : '#eee', color: userAnswers[currentIndex] === opt ? 'white' : '#333', display: 'flex', justifyContent: 'center', alignItems: 'center', marginRight: '15px', fontWeight: 'bold' }}>
                {String.fromCharCode(65 + i)}
              </div>
              {opt}
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '20px', marginTop: '40px' }}>
          <button className="btn-royal" style={{ background: '#f0f0f0', color: '#333', visibility: currentIndex === 0 ? 'hidden' : 'visible' }} onClick={handlePrevious}>← Previous</button>
          <button className="btn-royal" onClick={handleNext}>{currentIndex + 1 === questions.length ? "Submit Exam" : "Next Question →"}</button>
        </div>
      </div>
    </div>
  );
}