import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Button from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import OtpInput from "@/components/ui/OtpInput/OtpInput";

const RESEND_SECONDS = 60;

const ConfirmScreen: React.FC = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [phone, setPhone] = useState<string | null>(null);
  const [timer, setTimer] = useState(RESEND_SECONDS);

  useEffect(() => {
    const storedPhone = localStorage.getItem("phone");
    setPhone(storedPhone);

    setTimer(RESEND_SECONDS);
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleGetCode = async () => {
    navigate("/home");
  };

  const handleResend = () => {
    setTimer(RESEND_SECONDS);
  };

  return (
    <div className={styles.confirmScreen}>
      <div className={styles.content}>
        <div className={styles.upContent}>
          <div
            className={styles.back}
            onClick={() => navigate(-1)}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex={0}
            aria-label="Назад"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") navigate(-1);
            }}
          >
            <div className={styles.svgCont}>
              <svg
                width="11"
                height="18"
                viewBox="0 0 11 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0.420898 8.71191C0.420898 8.36768 0.54541 8.09668 0.816406 7.83301L8.15527 0.721191C8.36768 0.508789 8.62402 0.40625 8.93164 0.40625C9.5542 0.40625 10.0449 0.896973 10.0449 1.51221C10.0449 1.8125 9.92041 2.09814 9.70068 2.31055L3.06494 8.70459L9.70068 15.106C9.92041 15.3257 10.0449 15.5967 10.0449 15.9116C10.0449 16.5269 9.5542 17.0176 8.93164 17.0176C8.63135 17.0176 8.36768 16.9077 8.15527 16.6953L0.816406 9.59082C0.54541 9.32715 0.420898 9.04883 0.420898 8.71191Z"
                  fill="#2B3134"
                />
              </svg>
            </div>
            <span className={styles.textBack}>Назад</span>
          </div>
          <div className={styles.header}>
            <h2 className={styles.title}>Код подтверждения</h2>
            <p className={styles.subtitle}>
              Код отправлен на {phone}
              <br />
              Введите код из SMS
            </p>
          </div>

          <OtpInput value={otp} onChange={setOtp} length={4} />
          {timer > 0 ? (
            <p className={styles.subtitle}>Запросить повторно через: {timer}</p>
          ) : (
            <Button
              className={styles.resendButton}
              onClick={handleResend}
              showArrow={false}
            >
              Отправить код повторно
            </Button>
          )}
        </div>
        <div className={styles.endContent}>
          <div className={styles.buttonContainer}>
            <Button
              showArrow={false}
              onClick={handleGetCode}
              className={styles.getCodeButton}
              disabled={otp.length < 4}
            >
              Продолжить
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmScreen;
