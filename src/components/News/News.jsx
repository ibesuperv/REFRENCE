import { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";
import { Link } from "react-router-dom";

function News() {
    const [data, setData] = useState([]);
    const [search, setSearch] = useState('india');
    const [loading, setLoading] = useState(false);

    const API_KEY = "bda49b820d014e29ba8b7570ed9575f6";

    const getData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`);
            const filteredArticles = response.data.articles.filter(article => article.author !== null);
            setData(filteredArticles);
        } catch (error) {
            console.error("Error fetching data:", error);
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getData();
    }, [search]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-6 px-4">
                <div className="max-w-4xl mx-auto flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">News App</h1>
                        <p className="mt-1 text-sm text-gray-200">
                            Stay updated with the latest news from around the world.
                        </p>
                    </div>
                    <Link to="/">
                    <button
                        className="bg-white text-blue-500 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
                        >
                        Return to Home
                    </button>
                        </Link>
                </div>
            </header>

            {/* Search Bar */}
            <div className="bg-white text-black shadow-md p-6 flex items-center justify-center space-x-4">
                <input
                    type="text"
                    placeholder="Search for news"
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full max-w-lg p-3 border-2 border-gray-300 rounded-lg text-lg focus:outline-none focus:border-blue-500"
                />
                <button
                    onClick={getData}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Search
                </button>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mt-6">
                {['politics', 'sports', 'entertainment', 'health', 'fitness'].map(category => (
                    <button
                        key={category}
                        onClick={() => setSearch(category)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full transition"
                    >
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                ))}
            </div>

            <hr className="my-6 border-gray-300" />

            {/* Loading or Results */}
            {loading ? (
                <h1 className="text-center text-xl font-semibold text-gray-700 mt-10">Please wait...</h1>
            ) : (
                data.length > 0 ? (
                    <Cards data={data} />
                ) : (
                    <h1 className="text-center text-xl font-semibold text-gray-700 mt-10">No results found</h1>
                )
            )}
        </div>
    );
}

export default News;
