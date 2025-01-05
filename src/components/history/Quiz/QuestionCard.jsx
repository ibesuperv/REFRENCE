import React from "react";

const QuestionCard = ({
  question,
  currentQuestionIndex,
  totalQuestions,
  onAnswer,
  selectedAnswer,
}) => {
  return (
    <div>
      {/* Question Header */}
      <h2 className="text-xl font-bold mb-4">
        Question {currentQuestionIndex + 1} of {totalQuestions}
      </h2>
      <p className="text-lg font-medium mb-6">{question.question}</p>

      {/* Options */}
      <div className="space-y-4">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswer(option)}
            className={`w-full text-left py-3 px-4 rounded-lg border ${
              selectedAnswer === option
                ? "bg-white text-black border-blue-500 font-bold"
                : "bg-gray-100 text-gray-800 border-gray-300"
            } hover:bg-gray-200`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
