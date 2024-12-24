import React, { useState, useEffect } from 'react';
import Quiz from './quiz'; // Adjust the import path accordingly

const getRandomQuestions = (questions, count) => {
  const shuffled = [...questions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [reviewMode, setReviewMode] = useState(false);
  const [timePeriod, setTimePeriod] = useState('1940-1950');
  const [quizData, setQuizData] = useState(
    getRandomQuestions(
      Quiz.filter((q) => q.time_period === '1940-1950'),
      10
    )
  );
  const [userAnswers, setUserAnswers] = useState([]);

  const trackEvent = (event, data) => {
    if (window.gtag) {
      window.gtag('event', event, data);
    }
  };

  useEffect(() => {
    trackEvent('quiz_started', {
      event_category: 'Quiz',
      event_label: `Time Period: ${timePeriod}`,
    });
  }, [timePeriod]);

  const handleTimePeriodChange = (e) => {
    const selectedPeriod = e.target.value;
    setTimePeriod(selectedPeriod);

    // Filter the questions based on the selected time period
    const filteredQuestions = Quiz.filter((q) => q.time_period === selectedPeriod);
    
    // Update the quiz data with a random set of questions
    const randomQuestions = getRandomQuestions(filteredQuestions, 10);

    setQuizData(randomQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setQuizFinished(false);
    setReviewMode(false);
    setSelectedAnswer('');
    setUserAnswers([]);

    // Track the event for time period change
    trackEvent('time_period_changed', {
      event_category: 'Quiz',
      event_label: selectedPeriod,
    });
  };

  const handleAnswerChange = (e) => {
    setSelectedAnswer(e.target.value);
    trackEvent('answer_selected', {
      event_category: 'Quiz',
      event_label: quizData[currentQuestion].question,
      value: e.target.value,
    });
  };

  const handleNext = () => {
    const currentQuestionData = quizData[currentQuestion];

    setUserAnswers([
      ...userAnswers,
      {
        question: currentQuestionData.question,
        selected: selectedAnswer,
        correct: currentQuestionData.answer,
        description: currentQuestionData.description || 'No description available.',
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
      trackEvent('quiz_completed', {
        event_category: 'Quiz',
        event_label: `Time Period: ${timePeriod}`,
        value: score,
      });

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
      <div className="p-6 bg-gray-50 border-t border-gray-200 rounded-lg shadow-lg mt-4">
        <h2 className="text-2xl font-semibold mb-4">Score History</h2>
        <ul className="space-y-3">
          {scores.map((entry, index) => (
            <li key={index} className="text-sm text-gray-700">
              {`Score: ${entry.score}, Date: ${new Date(entry.timestamp).toLocaleString()}`}
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <h3 className="font-medium text-lg">Analytics</h3>
          <p>Total Attempts: {totalAttempts}</p>
          <p>Highest Score: {highestScore}</p>
          <p>Average Score: {averageScore.toFixed(2)}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-lg mt-6">
      <div className="mb-6">
        <label htmlFor="time-period" className="block text-xl font-medium text-gray-800">Select Time Period:</label>
        <select
          id="time-period"
          value={timePeriod}
          onChange={handleTimePeriodChange}
          className="mt-2 p-3 border border-gray-300 rounded-md w-full text-lg"
          disabled={quizFinished || reviewMode}
        >
          <option value="1940-1950">1940-1950</option>
          <option value="1950-1960">1950-1960</option>
          <option value="1960-1970">1960-1970</option>
        </select>
      </div>

      {!quizFinished && !reviewMode ? (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">{quizData[currentQuestion].question}</h2>
          <div className="space-y-4">
            {quizData[currentQuestion].options.map((option, index) => (
              <div key={index} className="flex items-center text-lg">
                <input
                  type="radio"
                  id={option}
                  name="quiz"
                  value={option}
                  onChange={handleAnswerChange}
                  checked={selectedAnswer === option}
                  className="mr-3 p-2 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
                />
                <label htmlFor={option} className="text-gray-700">{option}</label>
              </div>
            ))}
          </div>
          <button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-md disabled:bg-gray-400 hover:bg-blue-700 transition duration-200"
          >
            {currentQuestion < quizData.length - 1 ? 'Next' : 'Finish'}
          </button>
        </div>
      ) : quizFinished && !reviewMode ? (
        <div>
          <h2 className="text-3xl font-bold text-green-600 mb-4">Quiz Completed!</h2>
          <p className="text-xl text-gray-800 mb-4">Your Score: {score} / {quizData.length}</p>
          <div className="flex space-x-4 mb-6">
            <button onClick={handleRestart} className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">Restart Quiz</button>
            <button onClick={handleReview} className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200">Review Answers</button>
          </div>
          <Scoreboard />
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Review Answers</h2>
          <div className="space-y-4">
            <h3 className="text-xl">Question {currentQuestion + 1}:</h3>
            <p className="text-lg text-gray-700">{userAnswers[currentQuestion].question}</p>
            <p><strong>Your Answer:</strong> {userAnswers[currentQuestion].selected}</p>
            <p><strong>Correct Answer:</strong> {userAnswers[currentQuestion].correct}</p>
            <p><strong>Description:</strong> {userAnswers[currentQuestion].description}</p>
          </div>
          <div className="mt-6 flex space-x-4">
            <button onClick={() => handleReviewNavigation('prev')} disabled={currentQuestion === 0} className="px-6 py-3 bg-gray-300 text-white rounded-md disabled:bg-gray-400">Previous</button>
            <button onClick={() => handleReviewNavigation('next')} disabled={currentQuestion === userAnswers.length - 1} className="px-6 py-3 bg-gray-300 text-white rounded-md disabled:bg-gray-400">Next</button>
          </div>
          {currentQuestion === userAnswers.length - 1 && (
            <button onClick={handleRestart} className="mt-6 px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200">Restart Quiz</button>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizApp;
