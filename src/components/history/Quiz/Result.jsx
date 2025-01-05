import React from "react";

const Result = ({ filteredQuiz, answers, onRetry }) => {
  const calculateScore = () => {
    return filteredQuiz.reduce((score, question, index) => {
      if (answers[index] === question.answer) {
        return score + 1;
      }
      return score;
    }, 0);
  };

  const score = calculateScore();

  return (
    <div className="w-full max-w-5xl p-8 bg-white border shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Your Results</h2>
      <p className="text-lg mb-6">
        You scored <span className="font-bold">{score}</span> out of{" "}
        <span className="font-bold">{filteredQuiz.length}</span>.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQuiz.map((question, index) => (
          <div
            key={index}
            className={`p-4 border rounded-lg ${
              answers[index] === question.answer
                ? "border-green-500 bg-green-50"
                : "border-red-500 bg-red-50"
            }`}
          >
            <p className="font-semibold mb-2">{question.question}</p>
            <p>
              Your Answer:{" "}
              <span
                className={
                  answers[index] === question.answer
                    ? "text-green-600 font-bold"
                    : "text-red-600 font-bold"
                }
              >
                {answers[index] || "Not Answered"}
              </span>
            </p>
            <p>Correct Answer: {question.answer}</p>
          </div>
        ))}
      </div>

      <button
        onClick={onRetry}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-500"
      >
        Retry Quiz
      </button>
    </div>
  );
};

export default Result;
