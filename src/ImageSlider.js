import React, { useState } from "react";
import { ChevronRight, ChevronLeft } from "react-feather";

const ImageSlider = ({ slides }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }
  return (
    <div>
      <div className="flex flex-cols">
        <ChevronLeft onClick={prevSlide} className="w-24 h-6 mt-10" />
        {slides.map((slide, index) => {
          return (
            <div
              className={index === current ? "slide active" : "slide"}
              key={index}
            >
              {index === current && <img src={slide} alt="cars" />}
            </div>
          );
        })}
        <ChevronRight onClick={nextSlide} className="w-24 h-6 mt-10" />
      </div>
    </div>
  );
};

export default ImageSlider;
