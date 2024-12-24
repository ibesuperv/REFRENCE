import Contact from "./components/Contact";
import Dummy from "./components/Dummy";
import Home from "./components/Home";
import Nav from "./components/nav";
import Resources from "./components/Resources";

function Holder() {
    return (
        <div className='w-full min-h-screen bg-black text-white text-center'>
            <Nav />
            <Home />
            <Resources />
            <Dummy />

            <Contact />

            {/* <Ai/> */}
            {/* <News/> */}
        </div>


    );
}

export default Holder;