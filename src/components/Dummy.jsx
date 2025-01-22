import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Dummy() {
  useEffect(() => {
    gsap.to(".enlarge", {
      scale: 100,
      color:"black",
      height: "100rem",
      width: "100rem",
      duration: 3,
      scrollTrigger: {
        trigger: ".aii",
        start: "top 28%",
        scrub: 6,
        ease: "power1.inOut",
      },
      onComplete: () => {
        gsap.set(".enlarge", {
          scale: 0,
          clearProps: "all",
        });
      },
    });
  }, []);

  return (
    <div className="relative w-screen h-screen text-gray-700 aii overflow-hidden">
      {/* Background Circle */}
      <div className="enlarge z-0 absolute overflow-hidden left-0 top-0 rounded-full bg-white w-0 h-0" />

      {/* Text Content */}
      <div className="ai-part w-full h-full bg-transparent text-5xl z-10 relative flex flex-col justify-center items-center">
        <h1 className="text-10xl font-bold ">ANYWHERE STUCKED?</h1> 
          <Link to="/ai">
        <button className="mt-8 px-6 py-3 text-lg font-medium bg-blue-600 rounded-full text-white shadow-lg hover:bg-blue-700 transition-all animate-bounce-in">
                    ASK AI
                </button>
          </Link>
           
      </div>
    </div>
  );
}

export default Dummy;
