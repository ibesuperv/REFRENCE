import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function FullHistory() {
    const location = useLocation();
    const navigate = useNavigate();
    const historyItem = location.state?.historyItem;

    if (!historyItem) {
        return (
            <div className="p-6 bg-gray-100 min-h-screen">
                <h1 className="text-4xl font-bold text-center text-red-600">
                    No Data Available
                </h1>
                <div className="text-center mt-8">
                    <button
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                        onClick={() => navigate('/history')}
                    >
                        Go Back to Main Page
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 bg-gray-100 min -h-screen">
            <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
                {historyItem.event}
            </h1>
            <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 max-w-3xl mx-auto">
                <p className="text-gray-800 text-lg mb-4">
                    <strong>Year:</strong> {historyItem.year}
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Description:</strong> {historyItem.description}
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Background:</strong> {historyItem.background}
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Key Figures:</strong> {historyItem.key_figures}
                </p>
                <p className="text-gray-700 text-lg mb-4">
                    <strong>Development:</strong> {historyItem.development}
                </p>
                <p className="text-gray-700 text-lg">
                    <strong>Impact:</strong> {historyItem.impact}
                </p>
            </div>
            <div className="text-center mt-8">
                <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    onClick={() => navigate('/history')}
                >
                    Go Back
                </button>
            </div>
        </div>
    );
}

export default FullHistory;
