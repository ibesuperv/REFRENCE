import React from 'react';
import { useNavigate } from 'react-router-dom';
import history from './history';

function Mainhistory() {
    const navigate = useNavigate();

    const handleReadMore = (item) => {
        navigate('/fullhistory', { state: { historyItem: item } });
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                Historical Events
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {history.map((item, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:bg-gray-200"
                    >
                        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                            {item.event}
                        </h2>
                        <p className="text-gray-700 text-sm mb-4">
                            Year: <span className="font-medium">{item.year}</span>
                        </p>
                        <p className="text-gray-700">{item.description}</p>

                        <div className="text-center mt-4">
                            <button
                                onClick={() => handleReadMore(item)}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
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
