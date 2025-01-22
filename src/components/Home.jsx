import Spline from '@splinetool/react-spline';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home-section w-full h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-black text-white flex flex-col items-center justify-center relative">
            
            <div className=" hidden lg:block bg-black absolute inset-0">
                <Spline scene="https://prod.spline.design/4wB3rcUK6U-Z-640/scene.splinecode" />
            </div>

            {/* Text content for the landing page */}
            <div className="relative lg:hidden z-10 text-center p-5 md:p-10">
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-wide animate-fade-in">
                    POLITICAL HISTORY OF INDIA
                </h1>
                <p className="mt-4 md:mt-6 text-lg md:text-2xl max-w-2xl mx-auto opacity-90 animate-fade-in-delay">
                    Discover the rich and diverse political heritage of India. From ancient kingdoms to modern democracy, dive deep into the history that shaped the nation.
                </p>
                <Link to="/history">
                <button className="mt-8 px-6 py-3 text-lg font-medium bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce-in">
                    Explore Now
                </button>
                </Link>
            </div>

            {/* Background Overlay for better contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-60 md:hidden"></div>
        </div>
    );
}

export default Home;
