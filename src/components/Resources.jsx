import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";
import ReactCurvedText from "react-curved-text";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Resources() {
  const navigate = useNavigate();

  useEffect(() => {
    gsap.to(".dataa", {
      opacity: 1,
      duration: 3,
      scrollTrigger: {
        trigger: ".parent",
        start: "top 80%",
        scrub: 6,
        ease: "power1.inOut",
      },
    });
  }, []);

  return (
    <>
      {/* First Section */}
      <div className="parent w-screen h-screen flex relative bg-black">
        <div className="w-full h-full z-10 flex flex-col lg:flex-row justify-center items-center text-white">
          {/* Left Content */}
          <div
            style={{ width: "100%", maxWidth: "600px" }}
            className="relative dataa opacity-0 z-10 text-center lg:text-left px-4 lg:px-10"
          >
            <div className="py-5 pb-9">
              <p
                onClick={() => navigate("/history")}
                className="text-3xl lg:text-4xl grrey-1 font-bold underline decoration-white cursor-pointer"
              >
                Learn History of India
              </p>
              <p className="text-sm lg:text-base pt-5 font-light leading-relaxed">
                Learning history is essential because it helps us understand how past
                events shape the present and influence the future. It teaches critical
                thinking by analyzing causes and effects, enabling us to learn from
                past successes and mistakes. History also fosters a sense of identity
                and cultural awareness, connecting us to our roots and shared
                humanity. Ultimately, it empowers us to make informed decisions and
                build a better society.
              </p>
              <div className="hidden lg:block">
              <ReactCurvedText
                width={370}
                height={300}
                cx={190}
                cy={120}
                rx={80}
                ry={80}
                startOffset={0}
                reversed={true}
                text="Learn - History . Learn - History . Learn - History . "
                textProps={{ style: { fontSize: 20.5 } }}
                textPathProps={{ fill: "#fff" }}
                svgProps={{
                  style: {
                    animation: "spin 7s linear infinite",
                    transformOrigin: "center",
                  },
                }}
              />
              </div>
              <Link to="/history">
               
              <button className="mt-8 px-6 py-3 text-lg font-medium bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce-in">
                    Explore Now
                </button>
           </Link>
            </div>
          </div>
          {/* Right Image (visible on large screens) */}
          <div
            style={{ width: "50%" }}
            className="dataa opacity-0 hidden lg:block z-10 h-5/6"
          >
            <img
              className="w-full h-full object-cover"
              src="/history.jpg"
              alt="history"
            />
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div
        style={{ overflow: "hidden", width: "100%", height: "100vh" }}
        className="relative parent-2 bg-black flex flex-col md:flex-row justify-center items-center"
      >
        {/* Left Spline */}
        <div
          style={{ zIndex: 5 }}
          className="w-full md:w-1/2 h-full hidden lg:block flex justify-center items-center"
        >
          <Spline scene="https://prod.spline.design/LNhDtMFvW6wM2O-n/scene.splinecode" />
        </div>

        {/* Right Text */}
        <div className="ttxt text-white w-full md:w-1/2 h-full flex flex-col justify-center items-center px-4 text-center">
          <div className="w-full max-w-lg">
            <p className="text-4xl md:text-6xl font-bold">WHAT'S</p>
            <p className="text-xl font-light mt-2">HAPPENING</p>
            <p className="text-2xl grrey mt-4">IN THE WORLD??</p><br/>
              <Link to="/news">
            <button className="mt-8 px-6 py-3 text-lg font-medium bg-blue-600 rounded-full shadow-lg hover:bg-blue-700 transition-all animate-bounce-in">
                    NEWS app✍️
                </button>
              </Link>
           
          </div>
        </div>
      </div>
    </>
  );
}

export default Resources;
