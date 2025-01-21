import React, { useState } from "react";
import Slider from "react-slick"; // Only if using react-slick for sliding functionality
import caseStudies from "./caseStudies";

function CaseCards() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCaseStudy, setSelectedCaseStudy] = useState(null);

  const handleReadMore = (item) => {
    setSelectedCaseStudy(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCaseStudy(null);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-5xl font-bold text-center text-blue-800 mb-10">Case Studies</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {caseStudies.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg p-6 border border-gray-300 hover:shadow-2xl transition-all duration-300"
          >
            <div className="mb-4">
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{item.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{item.year}</p>
              <div className="mb-4">
                <img
                  src={item.contents[0].images[0].image1}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-lg mb-2"
                />
              </div>

              <p className="text-gray-700 text-base mb-4">
                {item.contents[0].description.length > 200
                  ? item.contents[0].description.slice(0, 200) + "..."
                  : item.contents[0].description}
              </p>

              <button
                onClick={() => handleReadMore(item)}
                className="text-white bg-blue-700 px-6 py-2 rounded-full text-lg hover:bg-blue-800 transition-all"
              >
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedCaseStudy && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-8 rounded-lg w-3/4 max-w-3xl relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-5 text-2xl text-gray-500"
            >
              x
            </button>

            <h2 className="text-3xl font-bold mb-4">{selectedCaseStudy.title}</h2>
            <p className="text-lg text-gray-700 mb-4">{selectedCaseStudy.year}</p>

            <Slider {...sliderSettings}>
              {selectedCaseStudy.contents.map((content, index) => (
                <div key={index} className="text-center">
                  <h3 className="text-xl font-semibold mb-2">{content.key}</h3>
                  <p className="text-md text-gray-600 mb-4">{content.description}</p>
                  <div className="flex justify-center gap-4">
                    {content.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img[`image${idx + 1}`]}
                        alt={`Slide ${idx + 1}`}
                        className="w-48 h-48 object-cover object-center rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}

export default CaseCards;
