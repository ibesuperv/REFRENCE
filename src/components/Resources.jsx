import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Spline from "@splinetool/react-spline";
import ReactCurvedText from "react-curved-text";
import '../App.css';
import { Link, useNavigate } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Resources() {
  const navigate = useNavigate();


  useEffect(() => {
    gsap.to(".dataa", {
      opacity: 10, // Adjusted opacity to the correct range (0–1)
      duration: 3,
      scrollTrigger: {
        trigger: ".parent",
        start: "top 40%",
        scrub: 6,
        ease: "power1.inOut",
      },
    });
  }, []);

  return (
    <>

      <div className="parent overflow-x-hidden w-screen h-screen flex relative">
        <div className="w-screen h-full z-10 flex justify-center items-center bg-transparent text-2xl overflow-hidden">
          <div
            style={{ width: "45%" }}
            className="relative dataa opacity-0 z-10 text-8xl font-bold h-full"
          >
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer py-5 pb-9">
              <p onClick={() => navigate("/history")} className="text-4xl grrey-1 text-white underline decoration-white">Learn History of india</p>
              <p className="text-xs pt-7 font-thin">

              Learning history is essential because it helps us understand how past events shape the present and influence the future. It teaches critical thinking by analyzing causes and effects, enabling us to learn from past successes and mistakes. History also fosters a sense of identity and cultural awareness, connecting us to our roots and shared humanity. Ultimately, it empowers us to make informed decisions and build a better society.
              </p>
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
                    animation: "spin 7s linear infinite", // Apply the spin animation
                    transformOrigin: "center", // Ensure it rotates around the center
                  },
                }}
              />
            </div>
          </div>
          <div
            style={{ width: "50%" }}
            className="dataa opacity-0 z-10 h-5/6"
          >
            <img
              className="w-full h-full"
              src="/history.jpg"
              alt="history"
              srcSet=""
            />
          </div>
        </div>
      </div>

      <div
        style={{ overflow: "hidden", width: "100%", height: "100vh" }}
        className="relative parent-2 bg-black flex justify-center items-center"
      >
        <div style={{ zIndex: 5 }} className=" w-1/2 bg-black h-full ">
        <Spline scene="https://prod.spline.design/LNhDtMFvW6wM2O-n/scene.splinecode" />
        </div>

        <div className="ttxt text-white w-1/2 h-full text-7xl font-bold flex flex-col justify-center items-center">
          <div className=" w-5/5">

          <p className=" text-center ">
              WHAT's</p> <p className="text-xl font-light">HAPPENING</p> <p className="grrey">IN THE WORLD??
            </p>
            <p className="text-sm cursor-pointer border-none font-light text-blue-400 mt-10"><Link to="/news">click to know</Link></p>
        


              </div>

        </div>
      </div>
    </>
  );
}

export default Resources;
