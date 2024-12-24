import React, { useState } from 'react';
import Mainhistory from './components/history/Mainhistory';
import QuizApp from './components/history/QuizApp';
import TestTimeline from './components/history/Time';
import { Link } from 'react-router-dom';

function History() {
  // State to track the selected component
  const [selectedComponent, setSelectedComponent] = useState('mainhistory');

  // Function to handle component selection
  const handleSelection = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="bg-gradient-to-r from-blue-50 via-gray-200 to-gray-400 w-full min-h-screen text-black p-5">
     
      <h1 className="text-gray-600 text-5xl  text-center font-bold py-5 drop-shadow-lg">
        Political History of India
      </h1>

      {/* Home Button */}
      <div className="text-center mb-5 absolute top-9 right-9">
        <Link to="/">
          <button
            className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out"
          >
            Home
          </button>
        </Link>
      </div>

      {/* Grid Layout for Sections */}
      <div className="flex gap justify-evenly mt-9">
        <div
          onClick={() => handleSelection('mainhistory')}
          className="w-96 h-20 border-2 border-blue-500 p-5 cursor-pointer rounded-lg shadow-lg bg-white hover:bg-blue-50 hover:shadow-xl transform transition-all duration-300 ease-in-out"
        >
          <h2 className="text-3xl font-semibold text-center text-blue-600">Main History</h2>
        </div>
        <div
          onClick={() => handleSelection('quiz')}
          className="w-96 h-20 border-2 border-green-500 p-5 cursor-pointer rounded-lg shadow-lg bg-white hover:bg-green-50 hover:shadow-xl transform transition-all duration-300 ease-in-out"
        >
          <h2 className="text-3xl font-semibold text-center text-green-600">Quiz</h2>
        </div>
        <div
          onClick={() => handleSelection('timeline')}
          className="w-96 h-20 border-2 border-indigo-500 p-5 cursor-pointer rounded-lg shadow-lg bg-white hover:bg-indigo-50 hover:shadow-xl transform transition-all duration-300 ease-in-out"
        >
          <h2 className="text-3xl font-semibold text-center text-indigo-600">Timeline</h2>
        </div>
      </div>

      {/* Conditional Rendering of Components */}
      <div className="mt-10">
        {selectedComponent === 'mainhistory' && (
          <div className="transition-all duration-500 ease-in-out">
            <Mainhistory />
          </div>
        )}
        {selectedComponent === 'quiz' && (
          <div className="transition-all duration-500 ease-in-out">
            <QuizApp />
          </div>
        )}
        {selectedComponent === 'timeline' && (
          <div className="transition-all duration-500 ease-in-out">
            <TestTimeline />
          </div>
        )}
      </div>
    </div>
  );
}

export default History;
