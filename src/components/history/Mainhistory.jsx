import React from 'react';
import { useNavigate } from 'react-router-dom';
import history from './history';

function Mainhistory() {
  const navigate = useNavigate();

  const handleReadMore = (item) => {
    navigate('/fullhistory', { state: { historyItem: item } });
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-10">Historical Events</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {history.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4">
              {/* Headline */}
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{item.event}</h2>

              {/* Year */}
              <p className="text-sm text-gray-500 mb-4">{item.year}</p>

              {/* Image with caption */}
              <div className="mb-4">
                <img
                  src={item.images[0]?.link}
                  alt={item.event}
                  className="w-full h-64 object-cover rounded-lg mb-2"
                />
                <p className="text-center text-sm text-gray-500">{item.images[0]?.caption}</p>
              </div>

              {/* Article Excerpt */}
              <p className="text-gray-700 text-base mb-4">
                {item.description.length > 200
                  ? item.description.substring(0, 200) + '...'
                  : item.description}
              </p>

              {/* "Read More" button */}
              <button
                onClick={() => handleReadMore(item)}
                className="text-white bg-blue-700 px-6 py-2 rounded-full text-lg hover:bg-blue-800 transition-all"
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
