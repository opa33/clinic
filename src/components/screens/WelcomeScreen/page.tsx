import React, { useState, useEffect } from "react";
import { WelcomeSVG, SpecializationSVG, FirstPriemSVG } from "./WelcomeSVG";
import styles from "./styles.module.css";
import Button from "@/components/ui/Button/Button";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Slide {
  id: number;
  title: string | string[];
  description: string | string[];
  illustration: React.ReactNode;
}

const WelcomeScreen: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatingDot, setAnimatingDot] = useState<number | null>(null);
  const [startAnim, setStartAnim] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const slides: Slide[] = [
    {
      id: 1,
      title: ["", "Добро Пожаловать!"],
      description: [
        "Мы поможем вам эффективно и легко",
        "записываться на прием к врачам.",
        "Давайте начнем!",
      ],
      illustration: <WelcomeSVG />,
    },
    {
      id: 2,
      title: ["Выберите", "Специализацию"],
      description: [
        "Выберите нужную вам медицинскую",
        "специализацию, чтобы мы могли",
        "адаптировать ваш опыт.",
      ],
      illustration: <SpecializationSVG />,
    },
    {
      id: 3,
      title: ["Запланируйте Свой", "Первый Прием"],
      description: [
        "Выберите удобное время и дату для",
        "встречи с желаемым врачом.",
        "Начните свой путь к лучшему здоровью!",
      ],
      illustration: <FirstPriemSVG />,
    },
  ];

  useEffect(() => {
    setAnimatingDot(currentSlide);
    const timer = setTimeout(() => {
      setAnimatingDot(null);
    }, 600);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  useEffect(() => {
    if (currentSlide === 0 && startAnim) {
      const timer = setTimeout(() => {
        setShowContent(true);
        setStartAnim(false);
      }, 1500);
      return () => clearTimeout(timer);
    }
    if (currentSlide !== 0 && startAnim) {
      setStartAnim(false);
      setShowContent(true);
    }
  }, [currentSlide, startAnim]);

  const handleSlideChange = (index: number) => {
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide === slides.length - 1) {
      navigate("/auth");
    } else {
      handleSlideChange(currentSlide + 1);
    }
  };

  return (
    <div className={styles.welcomescr}>
      <div className={styles.content}>
        <div
          className="slides-container"
          style={{ position: "relative", minHeight: 400 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[currentSlide].id}
              className={styles.slide}
              initial={{ opacity: 0.5 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0.5 }}
              transition={{ duration: 0.2 }}
            >
              {currentSlide === 0 && startAnim ? (
                <motion.div
                  className={styles["illustration-container"]}
                  initial={{
                    position: "fixed",
                    top: "50%",
                    left: "45%",
                    transform: "translate(-49%, 45%)",
                    zIndex: 1000,
                    scale: 1.2,
                  }}
                  animate={{
                    position: "relative",
                    top: "50%",
                    left: "auto",
                    transform: "none",
                    zIndex: 1,
                    scale: 1,
                  }}
                  transition={{
                    duration: 1.7,
                    delay: 1,
                    ease: [0.175, 0.885, 0.32, 1.275],
                  }}
                >
                  {slides[currentSlide].illustration}
                </motion.div>
              ) : (
                <motion.div
                  className={styles["illustration-container"]}
                  initial={{ opacity: 0, y: 1 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {slides[currentSlide].illustration}
                </motion.div>
              )}

              <motion.div
                className={styles.textcont}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: currentSlide === 0 ? (showContent ? 1 : 0) : 1,
                  y: currentSlide === 0 ? (showContent ? 0 : 20) : 0,
                }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: currentSlide === 0 ? 0.3 : 0.3,
                  delay: currentSlide === 0 ? (showContent ? 0.3 : 0) : 0,
                  ease: [0.175, 0.885, 0.32, 1.275],
                }}
              >
                <h1 className={styles.title}>
                  {Array.isArray(slides[currentSlide].title)
                    ? slides[currentSlide].title.map((line, idx) => (
                        <React.Fragment key={idx}>
                          {line}
                          <br />
                        </React.Fragment>
                      ))
                    : slides[currentSlide].title}
                </h1>
                <p className={styles.description}>
                  {Array.isArray(slides[currentSlide].description)
                    ? slides[currentSlide].description.map((line, idx) => (
                        <span key={idx}>
                          {line}
                          <br />
                        </span>
                      ))
                    : slides[currentSlide].description}
                </p>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <motion.div
          className={styles.pagination}
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: currentSlide === 0 ? (showContent ? 1 : 0) : 1,
            y: currentSlide === 0 ? (showContent ? 0 : 20) : 0,
          }}
          transition={{
            duration: currentSlide === 0 ? 0.6 : 0.3,
            delay: currentSlide === 0 ? (showContent ? 0.5 : 0) : 0,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              className={`${styles.dot} ${
                index === currentSlide ? styles.active : ""
              } ${animatingDot === index ? styles.animated : ""}`}
              onClick={() => handleSlideChange(index)}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: currentSlide === 0 ? (showContent ? 1 : 0) : 1,
            y: currentSlide === 0 ? (showContent ? 0 : 20) : 0,
          }}
          transition={{
            duration: currentSlide === 0 ? 0.6 : 0.3,
            delay: currentSlide === 0 ? (showContent ? 0.7 : 0) : 0,
            ease: [0.175, 0.885, 0.32, 1.275],
          }}
        >
          <Button children="Далее" onClick={handleNext} />
        </motion.div>
      </div>
    </div>
  );
};

export default WelcomeScreen;
