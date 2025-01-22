import React from "react";
import { useNavigate } from "react-router-dom";
import history from "./history";

function Mainhistory() {
  const navigate = useNavigate();

  const handleReadMore = (item) => {
    navigate("/fullhistory", { state: { historyItem: item } });
  };

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl md:text-5xl font-bold text-center text-blue-800 mb-8 md:mb-10">
        Historical Events
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300"
          >
            {/* Image */}
            <img
              src={item.images[0]?.link}
              alt={item.event}
              className="w-full h-32 md:h-48 object-cover"
            />

            <div className="p-4">
              {/* Headline */}
              <h2 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 truncate">
                {item.event}
              </h2>

              {/* Year */}
              <p className="text-sm text-gray-500 mb-3">{item.year}</p>

              {/* Shortened Article Excerpt */}
              <p className="text-gray-700 text-sm md:text-base mb-4 line-clamp-3">
                {item.description}
              </p>

              {/* "Read More" button */}
              <button
                onClick={() => handleReadMore(item)}
                className="text-white bg-blue-600 px-4 py-2 rounded-full text-sm hover:bg-blue-700 transition-all"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Mainhistory;
