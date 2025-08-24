// SimpleSlider.jsx
import React, { useState, useEffect, useRef } from 'react';
import './Home.css';

export default function SimpleSlider({ slides = [], autoPlay = true, interval = 3000 }) {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    if (!autoPlay) return;
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      goNext();
    }, interval);
    return () => resetTimeout();
  }, [index, autoPlay, interval]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  function goPrev() {
    setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));
  }

  function goNext() {
    setIndex((i) => (i === slides.length - 1 ? 0 : i + 1));
  }

  if (!slides || slides.length === 0) {
    slides = [
      '/slider1.jpg',
      '/image4.jpg',
      '/image5.jpg',
    ];
  }

  return (
    <div className="container">
      {/* Top welcome text */}
      <div className="slider-top-text">
        <h1>Welcome to AverElite Luxury Creations</h1>
        <p>
          Experience the perfect blend of craftsmanship and elegance. We create luxury designs that speak for themselves.
        </p>
      </div>

      {/* Slider */}
      <div className="simple-slider">
        <div className="simple-slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((src, i) => (
            <div className="simple-slider__slide" key={i}>
              <img src={src} alt={`slide-${i}`} />
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="simple-slider__controls">
          <button className="simple-slider__btn" onClick={goPrev}>◀</button>
          <button className="simple-slider__btn" onClick={goNext}>▶</button>
        </div>

        {/* Dots */}
        <div className="simple-slider__dots">
          {slides.map((_, i) => (
            <div
              key={i}
              className={`simple-slider__dot ${i === index ? 'active' : ''}`}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>

      {/* Bottom firm description */}
      <div className="slider-bottom-text">
        <p>
          At AverElite, we believe in delivering nothing but the finest. Our designs are meticulously crafted to bring your vision to life, offering unmatched luxury and sophistication for every occasion.
        </p>
      </div>
      <br /><br /><br />
    </div>
  );
}
