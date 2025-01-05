import React, { useState } from "react";
import Mainhistory from "./components/history/Mainhistory";
import { Link } from "react-router-dom";
import Timeline from "./components/history/Timeline";
import QuizApp from "./components/history/Quiz/QuizApp";

function History() {
  const [selectedComponent, setSelectedComponent] = useState("mainhistory");

  const handleSelection = (component) => {
    setSelectedComponent(component);
  };

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
        <h1 className="text-2xl font-bold text-blue-700">Political History of India</h1>
        <div className="flex space-x-6">
          <button
            onClick={() => handleSelection("mainhistory")}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
              selectedComponent === "mainhistory"
                ? "bg-blue-600 text-white"
                : "text-blue-600 hover:bg-blue-50"
            }`}
          >
            Main History
          </button>
          <button
            onClick={() => handleSelection("quiz")}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
              selectedComponent === "quiz"
                ? "bg-green-600 text-white"
                : "text-green-600 hover:bg-green-50"
            }`}
          >
            Quiz
          </button>
          <button
            onClick={() => handleSelection("timeline")}
            className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
              selectedComponent === "timeline"
                ? "bg-indigo-600 text-white"
                : "text-indigo-600 hover:bg-indigo-50"
            }`}
          >
            Timeline
          </button>
        </div>
        <Link to="/">
          <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
            Home
          </button>
        </Link>
      </nav>

      {/* Component Display */}
      <div className="transition-all duration-500">
        {selectedComponent === "mainhistory" && <Mainhistory />}
        {selectedComponent === "quiz" && <QuizApp />}
        {selectedComponent === "timeline" && <Timeline />}
      </div>
    </div>
  );
}

export default History;
