import { IoSend } from "react-icons/io5";
import { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Link } from "react-router-dom";

const apiKey = "AIzaSyB6mWlKKUwJwmMzhnJBMyYC2UsVf-CyYHk";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt, setStoresearch) {
    try {
        setStoresearch(prev => [...prev, { user: prompt, ai: "", loading: true }]);

        const chatSession = model.startChat({ generationConfig, history: [] });
        const result = await chatSession.sendMessage(prompt);

        setStoresearch(prev => {
            const updatedStore = prev.map(item => {
                if (item.user === prompt && item.loading === true) {
                    return { ...item, ai: result.response.text().replace(/[*]+/g, ""), loading: false };
                }
                return item;
            });
            return updatedStore;
        });
    } catch (error) {
        console.error("Error during AI generation:", error);
        setStoresearch(prev => [...prev, { user: prompt, ai: "An error occurred while generating a response.", loading: false }]);
    }
}

function Ai() {
    const [searchAI, setSearchAI] = useState('');
    const [storesearch, setStoresearch] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleSend = () => {
        if (searchAI.trim() && searchAI.length <= 200) {
            setSearchAI('');
            run(searchAI, setStoresearch);
        }
    };

    return (
        <div className="flex flex-col cursor-default items-center justify-between min-h-screen bg-gradient-to-b from-blue-50 to-purple-100 py-6 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center space-y-4 mb-6">
                <Link to="/">
                    <button
                        className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-lg shadow-md hover:from-red-600 hover:to-pink-600 focus:outline-none transition duration-300 ease-in-out"
                    >
                        Return to Home
                    </button>
                </Link>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900">AI Chat Assistant</h1>
                <p className="text-sm sm:text-lg text-gray-700">Ask me anything and I'll do my best to provide you with an answer!</p>
            </div>

            {/* Chat messages container */}
            <div className="flex-grow w-full max-w-3xl bg-white rounded-xl shadow-xl p-4 sm:p-6 overflow-y-auto min-h-[60vh] max-h-[70vh] mb-24">
                {storesearch.length > 0 ? (
                    <div className="space-y-4">
                        {storesearch.map((item, index) => (
                            <div className="single-chat" key={index}>
                                <div className="flex">
                                    <div className="font-semibold text-blue-600">You:</div>
                                    <div className="ml-2 text-purple-700 font-bold">{item.user}</div>
                                </div>
                                <div className="flex mt-3">
                                    <div className="font-semibold text-green-600">AI:</div>
                                    <div className="ml-2 text-gray-800">
                                        {item.loading ? (
                                            <div className="spinner animate-spin border-4 border-t-4 border-blue-500 w-6 h-6 rounded-full"></div>
                                        ) : item.ai || "No response yet"}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="font-semibold text-gray-700 text-center">ASK YOUR QUESTIONS</div>
                )}
            </div>

            {/* Fixed bottom-centered input and button */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-full max-w-3xl p-4 bg-white shadow-lg rounded-lg z-10">
                <div className="flex items-center justify-between space-x-4">
                    <input
                        type="text"
                        value={searchAI}
                        onChange={(e) => setSearchAI(e.target.value)}
                        className="w-full p-3 sm:p-4 bg-gray-100 border-2 border-gray-300 rounded-xl text-sm sm:text-lg text-gray-800 focus:outline-none focus:border-blue-500 placeholder-gray-400 transition duration-200 ease-in-out"
                        placeholder="Ask any questions"
                        required
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading}
                        className="p-3 sm:p-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-full hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 focus:outline-none disabled:bg-gray-300 transition duration-300 ease-in-out"
                    >
                        <IoSend size={20} sm={24} />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Ai;
