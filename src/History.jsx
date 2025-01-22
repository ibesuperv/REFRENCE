import React, { useState } from "react";
import Mainhistory from "./components/history/Mainhistory";
import { Link } from "react-router-dom";
import Timeline from "./components/history/Timeline";
import QuizApp from "./components/history/Quiz/QuizApp";
import CaseCards from "./caseStudies/CaseCards";

function History() {
  const [selectedComponent, setSelectedComponent] = useState("mainhistory");
  const [menuOpen, setMenuOpen] = useState(false); // State for mobile menu toggle

  const handleSelection = (component) => {
    setSelectedComponent(component);
    setMenuOpen(false); // Close the menu after selection
  };

  return (
    <div className="bg-gray-50 text-black min-h-screen">
      {/* Navbar */}
      <nav className="relative bg-white shadow-md">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          {/* Brand Section */}
          <h1 className="text-2xl font-extrabold text-blue-700">
            Political History of India
          </h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6">
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
            <button
              onClick={() => handleSelection("caseStudies")}
              className={`px-4 py-2 rounded-lg text-lg font-semibold transition ${
                selectedComponent === "caseStudies"
                  ? "bg-amber-300 text-white"
                  : "text-amber-300 hover:bg-amber-50"
              }`}
            >
              Case Studies
            </button>
            <Link to="/">
              <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
                Home
              </button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-blue-700 text-3xl focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden absolute top-0 left-0 w-full h-screen bg-black bg-opacity-50 z-50">
            <div className="bg-white w-3/4 h-full p-6">
              <button
                className="text-2xl text-gray-700 mb-8 focus:outline-none"
                onClick={() => setMenuOpen(false)}
              >
                ✕
              </button>
              <div className="space-y-6">
                <button
                  onClick={() => handleSelection("mainhistory")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition ${
                    selectedComponent === "mainhistory"
                      ? "bg-blue-600 text-white"
                      : "text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  Main History
                </button>
                <button
                  onClick={() => handleSelection("quiz")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition ${
                    selectedComponent === "quiz"
                      ? "bg-green-600 text-white"
                      : "text-green-600 hover:bg-green-50"
                  }`}
                >
                  Quiz
                </button>
                <button
                  onClick={() => handleSelection("timeline")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition ${
                    selectedComponent === "timeline"
                      ? "bg-indigo-600 text-white"
                      : "text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  Timeline
                </button>
                <button
                  onClick={() => handleSelection("caseStudies")}
                  className={`w-full text-left px-4 py-2 rounded-lg text-lg font-semibold transition ${
                    selectedComponent === "caseStudies"
                      ? "bg-amber-300 text-white"
                      : "text-amber-300 hover:bg-amber-50"
                  }`}
                >
                  Case Studies
                </button>
                <Link to="/">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-lg shadow-md hover:bg-blue-700 transition">
                    Home
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Selected Component */}
      <div className="transition-all duration-500 ">
        {selectedComponent === "mainhistory" && <Mainhistory />}
        {selectedComponent === "quiz" && <QuizApp />}
        {selectedComponent === "timeline" && <Timeline />}
        {selectedComponent === "caseStudies" && <CaseCards />}
      </div>
    </div>
  );
}

export default History;
