import React, { useState } from 'react';
import Quiz from './quiz';

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [timePeriod, setTimePeriod] = useState('1940-1950'); // Default interval
  const [quizData, setQuizData] = useState(
    getRandomQuestions(
      allQuizData.filter((q) => q.time_period === '1940-1950'),
      10
    )
  );
  const [userAnswers, setUserAnswers] = useState([]); // To store user's answers


   // 1c Track quiz start
   const trackEvent = (event, data) => {
    if (window.gtag) {
      window.gtag('event', event, data);
    }
  };

  //2c
   React.useEffect(() => {
      trackEvent('quiz_started', {
        event_category: 'Quiz',
        event_label: `Time Period: ${timePeriod}`,
      });
    }, [timePeriod]);
  

  const handleTimePeriodChange = (e) => {
    const selectedPeriod = e.target.value;
    setTimePeriod(selectedPeriod);

    const filteredQuestions = allQuizData.filter((q) => q.time_period === selectedPeriod);
    const randomQuestions = getRandomQuestions(filteredQuestions, 10);

    setQuizData(randomQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setReviewMode(false);
    setSelectedAnswer('');
    setUserAnswers([]);
    
    //3c
     // Track time period change
     trackEvent('time_period_changed', {
        event_category: 'Quiz',
        event_label: selectedPeriod,
      });

  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);

    //4c
     // Track answer selection
     trackEvent('answer_selected', {
        event_category: 'Quiz',
        event_label: quizData[currentQuestion].question,
        value: e.target.value,
      });
  };

  const handleNext = () => {
    const currentQuestionData = quizData[currentQuestion];

    // Save the user's answer
    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestionData.question,
        selected: selectedAnswer,
        correct: currentQuestionData.answer,
        description: currentQuestionData.description, // Assuming each question has a description field
      },
    ]);

    if (selectedAnswer === currentQuestionData.answer) {
      setScore(score + 1);
    }

    if (currentQuestion < quizData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer('');
    } else {
      setQuizFinished(true);
    

    //5c
     // Track quiz completion
     trackEvent('quiz_completed', {
        event_category: 'Quiz',
        event_label: `Time Period: ${timePeriod}`,
        value: score,
      });

      // Save score to localStorage
      const previousScores = JSON.parse(localStorage.getItem('quizScores')) || [];
      previousScores.push({
        score,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('quizScores', JSON.stringify(previousScores));


    }
    
};


    
  

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setReviewMode(false);
    setSelectedAnswer('');
    setUserAnswers([]);
  };

  const handleReview = () => {
    setCurrentQuestion(0);
    setReviewMode(true);
  };

  const handleReviewNavigation = (direction) => {
    if (direction === 'prev' && currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    } else if (direction === 'next' && currentQuestion < userAnswers.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  //6c
  const getScores = () => JSON.parse(localStorage.getItem('quizScores')) || [];

  const getAnalytics = () => {
    const scores = getScores();
    const totalAttempts = scores.length;
    const highestScore = Math.max(0, ...scores.map((entry) => entry.score));
    const averageScore =
      totalAttempts > 0
        ? scores.reduce((sum, entry) => sum + entry.score, 0) / totalAttempts
        : 0;

    return { totalAttempts, highestScore, averageScore };
  };

  const Scoreboard = () => {
    const scores = getScores();
    const { totalAttempts, highestScore, averageScore } = getAnalytics();

    return (
      <div>
        <h2>Score History</h2>
        <ul>
          {scores.map((entry, index) => (
            <li key={index}>
              {`Score: ${entry.score}, Date: ${new Date(entry.timestamp).toLocaleString()}`}
            </li>
          ))}
        </ul>
        <div>
          <h3>Analytics</h3>
          <p>Total Attempts: {totalAttempts}</p>
          <p>Highest Score: {highestScore}</p>
          <p>Average Score: {averageScore.toFixed(2)}</p>
        </div>
      </div>
    );
  };



  return (
    <div className="quiz-container">
      <div>
        <label htmlFor="time-period">Select Time Period:</label>
        <select
          id="time-period"
          value={timePeriod}
          onChange={handleTimePeriodChange}
          disabled={quizFinished || reviewMode}
        >
          <option value="1940-1950">1940-1950</option>
          <option value="1950-1960">1950-1960</option>
          <option value="1960-1970">1960-1970</option>
        </select>
      </div>

      {!quizFinished && !reviewMode ? (
        <div>
          <h2>{quizData[currentQuestion].question}</h2>
          <div>
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={option}
                  name="quiz"
                  value={option}
                  onChange={handleAnswerChange}
                  checked={selectedAnswer === option}
                />
                <label htmlFor={option}>{option}</label>
              </div>
            ))}
          </div>
          <button onClick={handleNext} disabled={!selectedAnswer}>
            {currentQuestion < quizData.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      ) : quizFinished && !reviewMode ? (
        <div>
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} / {quizData.length}</p>
          <button onClick={handleRestart}>Restart Quiz</button>
          <button onClick={handleReview}>Review Answers</button>
          <Scoreboard />
        </div>
      ) : (
        <div>
          <h2>Review Answers</h2>
          <div>
            <h3>Question {currentQuestion + 1}:</h3>
            <p>{userAnswers[currentQuestion].question}</p>
            <p>
              <strong>Your Answer:</strong> {userAnswers[currentQuestion].selected}
            </p>
            <p>
              <strong>Correct Answer:</strong> {userAnswers[currentQuestion].correct}
            </p>
            <p>
              <strong>Description:</strong> {userAnswers[currentQuestion].description || 'No description available.'}
            </p>
          </div>
          <div>
            <button
              onClick={() => handleReviewNavigation('prev')}
              disabled={currentQuestion === 0}
            >
              Previous
            </button>
            <button
              onClick={() => handleReviewNavigation('next')}
              disabled={currentQuestion === userAnswers.length - 1}
            >
              Next
            </button>
          </div>
          {currentQuestion === userAnswers.length - 1 && (
            <button onClick={handleRestart}>Restart Quiz</button>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
