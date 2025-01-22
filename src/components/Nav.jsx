import { Link } from "react-router-dom";

function Nav() {
    const handleContact = () => {
        const element = document.querySelector(".contact-section");
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleHome = () => {
        const element = document.querySelector(".home-section");
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed top-0 w-full bg-transparent flex justify-center items-center z-[9999]">
            <div className="w-full md:w-2/3 lg:w-1/3 h-auto bg-zinc-800 mt-5 text-lg md:text-lg py-3  rounded-full shadow-lg">
                <ul className="flex justify-around items-center px-4 sm:text-sm text-white">
                    <li>
                        <a onClick={handleHome} className="hover:underline cursor-pointer">HOME</a>
                    </li>
                    <span className="hidden md:inline">|</span>
                    <li>
                        <a onClick={handleContact} className="hover:underline cursor-pointer">CONTACT US</a>
                    </li>
                    <span className="hidden md:inline">|</span>
                    <li>
                        <Link to="/history" className="hover:underline">HISTORY</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
