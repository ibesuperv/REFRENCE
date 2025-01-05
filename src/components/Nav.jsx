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

    const handleAbout = () => {
        const element = document.querySelector(".about-section");
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="fixed top-0 w-full h-auto bg-transparent flex justify-center items-center z-[9999]">
            <div className="z-[9999] w-1/3 h-14 bg-zinc-800 mt-5 text-xl py-4 rounded-full shadow-lg">
                <ul className="flex justify-evenly cursor-pointer text-white">
                    <li>
                        <a onClick={handleHome} className="hover:underline">HOME</a>
                    </li>
                    <span>|</span>
                    <li>
                        <a onClick={handleAbout} className="hover:underline">ABOUT US</a>
                    </li>
                    <span>|</span>
                    <li>
                        <a onClick={handleContact} className="hover:underline">CONTACT US</a>
                    </li>
                    <span>|</span>
                    <li>
                        <Link to="/history" className="hover:underline">HISTORY</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default Nav;
