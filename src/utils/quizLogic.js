import allQuestions from '../data/questions.json';

// Function to shuffle any array (Fisher-Yates algorithm)
const shuffle = (array) => {
  let currentIndex = array.length, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
};

// Mode 1: Get questions for a specific subject
export const getQuestionsBySubject = (subject) => {
  return allQuestions.filter(q => q.course === subject);
};

// Mode 2: Get 100 random questions for a Mock Exam
export const getRandomMockExam = () => {
  const shuffled = shuffle([...allQuestions]);
  return shuffled.slice(0, 100);
};

// Mode 3: Practice Sets (e.g., questions 1-100, 101-200)
export const getQuestionSet = (setNumber) => {
  const start = (setNumber - 1) * 100;
  return allQuestions.slice(start, start + 100);
};

export const getQuestionsByRange = (start, end) => {
  // index is range - 1 (because array starts at 0)
  return allQuestions.slice(start - 1, end);
};