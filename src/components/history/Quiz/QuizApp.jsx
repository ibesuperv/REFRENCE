import React, { useState } from "react";
import Quiz from "./Quiz";
import QuestionCard from "./QuestionCard";
import Filter from "./Filter";
import Result from "./Result";

const QuizApp = () => {
  const [selectedTimePeriod, setSelectedTimePeriod] = useState("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const filteredQuiz = selectedTimePeriod === "all"
    ? Quiz
    : Quiz.filter((q) => q.time_period === selectedTimePeriod);

  const handleAnswer = (answer) => {
    setAnswers({ ...answers, [currentQuestionIndex]: answer });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const previousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleRetry = () => {
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setAnswers({});
  };

  return (
    <div className="min-h-screen w-full flex flex-col bg-white text-black">
      {/* Header */}
      <header className="bg-white border-b shadow-sm text-center py-4">
        <h1 className="text-3xl font-bold"> Quiz</h1>
      </header>
      
      <main className="flex-grow flex items-center justify-center ">
        {!isSubmitted ? (
          <div className="w-full max-w-3xl bg-white border shadow rounded-lg p-6">
            {/* Filter Section */}
            <Filter
              selectedTimePeriod={selectedTimePeriod}
              setSelectedTimePeriod={setSelectedTimePeriod}
            />

            {/* Question Section */}
            {filteredQuiz.length > 0 ? (
              <div>
                <QuestionCard
                  question={filteredQuiz[currentQuestionIndex]}
                  currentQuestionIndex={currentQuestionIndex}
                  totalQuestions={filteredQuiz.length}
                  onAnswer={handleAnswer}
                  selectedAnswer={answers[currentQuestionIndex]}
                />

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-6">
                  <button
                    onClick={previousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600 disabled:bg-gray-300 disabled:text-gray-500"
                  >
                    Previous
                  </button>
                  {currentQuestionIndex === filteredQuiz.length - 1 ? (
                    <button
                      onClick={handleSubmit}
                      className="px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-500"
                    >
                      Submit
                    </button>
                  ) : (
                    <button
                      onClick={nextQuestion}
                      className="px-6 py-3 bg-gray-700 text-white rounded-lg font-medium hover:bg-gray-600"
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <p className="text-gray-500 text-center">
                No questions available for this time period.
              </p>
            )}
          </div>
        ) : (
          <Result
            filteredQuiz={filteredQuiz}
            answers={answers}
            onRetry={handleRetry}
          />
        )}
      </main>
    </div>
  );
};

export default QuizApp;
