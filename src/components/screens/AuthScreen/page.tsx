import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import Button from "@/components/ui/Button/Button";
import { useNavigate } from "react-router-dom";
import PhoneInput from "@/components/ui/PhoneInput/PhoneInput";

interface AuthScreenProps {
  onBack?: () => void;
  onComplete?: (phoneNumber: string) => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete }) => {
  const [error, setError] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("+7");
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleGetCode = async () => {
    const cleaned = phoneNumber.replace(/\D/g, "");

    if (cleaned.length !== 11) {
      setError(
        "С момента последней отправки прошло слишком мало времени, повторите попытку позднее.\nЕсли у вас включен VPN, выключите и повторите попытку."
      );
      return;
    }

    setError(null);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const success = Math.random() > 0.3;

      if (success) {
        if (onComplete) onComplete(phoneNumber);
        localStorage.setItem("phone", phoneNumber);
        navigate("/confirm");
      } else {
        setError(
          "С момента последней отправки прошло слишком мало времени, повторите попытку позднее.\nЕсли у вас включен VPN, выключите и повторите попытку."
        );
      }
    } catch {
      setError("Произошла ошибка. Попробуйте еще раз.");
    }
  };

  return (
    <div className={styles.authScreen}>
      <div className={styles.content}>
        <div className={styles.upContent}>
          <div className={styles.header}>
            <h2 className={styles.title}>Авторизация</h2>
            <p className={styles.subtitle}>
              Войдите, чтобы управлять своими записями,
              <br />
              управлять аккаунтом и смотреть ход лечения.
            </p>
          </div>

          <div className={styles.inputSection}>
            <label className={styles.label}>Номер Телефона</label>
            <PhoneInput
              ref={inputRef}
              value={phoneNumber}
              onChange={setPhoneNumber}
              onClear={() => setPhoneNumber("+7")}
            />
          </div>
        </div>
        <div className={styles.endContent}>
          <div className={styles.agreementText}>
            <p>
              Нажимая "Получить код" вы принимаете условия
              <br />
              <span>Пользовательского соглашения</span> и{" "}
              <span>
                Политики
                <br />
                конфиденциальности
              </span>
              , а также разрешаете
              <br />
              обработку своих данных
            </p>
          </div>
          <div className={styles.buttonContainer}>
            <Button
              showArrow={false}
              onClick={handleGetCode}
              disabled={phoneNumber.length < 16}
              className={styles.getCodeButton}
            >
              Получить код
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className={styles.errorContainer}>
          <button
            className={styles.errorIcon}
            onClick={() => setError(null)}
            type="button"
            aria-label="Закрыть ошибку"
            style={{
              background: "none",
              border: "none",
              padding: 0,
              cursor: "pointer",
            }}
          >
            <svg
              width="33"
              height="33"
              viewBox="0 0 33 33"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect width="32.5" height="32.5" rx="6.84211" fill="#FF0400" />
              <path
                d="M21.1315 21.1316L16 16M16 16L10.8684 10.8684M16 16L21.1316 10.8684M16 16L10.8684 21.1316"
                stroke="white"
                strokeWidth="1.71053"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className={styles.errorContent}>
            <h3 className={styles.errorTitle}>Ошибка</h3>
            <div className={styles.errorMessage}>
              {error.split("\n").map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthScreen;
