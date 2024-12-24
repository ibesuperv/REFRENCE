import gsap from "gsap";
import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Dummy() {
  useEffect(() => {
    gsap.to(".enlarge", {
      scale: 100,
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
    <div className="relative w-screen h-screen aii overflow-hidden">
      {/* Background Circle */}
      <div className="enlarge z-0 absolute overflow-hidden left-0 top-0 rounded-full bg-white w-0 h-0" />

      {/* Text Content */}
      <div className="ai-part w-full h-full text-purple-400 bg-transparent text-5xl z-10 relative flex justify-center items-center">
        <h1 className="text-10xl font-bold text-black">ANYWHERE STUCKED?<span className="text-blue-600 underline text-4xl"> <Link to="/ai">Ask Ai</Link></span></h1>
        
      </div>
    </div>
  );
}

export default Dummy;
