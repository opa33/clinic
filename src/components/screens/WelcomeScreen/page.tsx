import React, { useState } from "react";

interface Slide {
  id: number;
  title: string;
  description: string;
  illustration: React.ReactNode;
}

const WelcomeScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides: Slide[] = [
    {
      id: 1,
      title: "Добро Пожаловать!",
      description:
        "Мы поможем вам эффективно и легко записываться на приём к врачам. Давайте начнем!",
      illustration: <div className="illustration"></div>,
    },
    {
      id: 2,
      title: "Выберите Специализацию",
      description:
        "Выберите нужную вам медицинскую специализацию, чтобы мы могли адаптировать ваш опыт.",
      illustration: <div className="illustration"></div>,
    },
  ];

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      console.log("");
    } else {
      handleSlideChange(currentSlide + 1);
    }
  };

  return (
    <div className="welcome-screen">
      <div className="content">
        <div className="slides-container">
          <div key={slides[currentSlide].id} className="slide">
            <div className="illustration-container">
              {slides[currentSlide].illustration}
            </div>

            <div className="text-content">
              <h1 className="title">{slides[currentSlide].title}</h1>

              <p className="description">{slides[currentSlide].description}</p>
            </div>
          </div>
        </div>

        <div className="pagination">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? "active" : ""}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </div>

        <button className="next-button" onClick={handleNext}>
          <span>Далее</span>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M7 4L13 10L7 16"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
