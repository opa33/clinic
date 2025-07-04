import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Button from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";

const HomeScreen: React.FC = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    setPhone(storedPhone);
  }, []);

  const handleGetCode = async () => {
    navigate("/");
  };

  return (
    <div className={styles.confirmScreen}>
      <div className={styles.content}>
        <div className={styles.upContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>Главная страница</h2>
            <p className={styles.subtitle}>Добро пожаловать {phone}!</p>
          </div>
        </div>
        <div className={styles.endContent}>
          <div className={styles.buttonContainer}>
            <Button
              showArrow={false}
              onClick={handleGetCode}
              className={styles.getCodeButton}
            >
              Обратно в начало
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
