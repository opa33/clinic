import React, { useRef } from "react";
import styles from "./OtpInput.module.css";

interface OtpInputProps {
  value: string;
  onChange: (val: string) => void;
  length?: number;
}

const OtpInput: React.FC<OtpInputProps> = ({ value, onChange, length = 4 }) => {
  const inputs = Array.from({ length });
  const refs = useRef<Array<HTMLInputElement | null>>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    idx: number
  ) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) return;
    const newValue =
      value.substring(0, idx) + val[0] + value.substring(idx + 1);
    onChange(newValue);
    if (val && idx < length - 1) {
      refs.current[idx + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    idx: number
  ) => {
    if (e.key === "Backspace") {
      if (value[idx]) {
        const newValue =
          value.substring(0, idx) + "" + value.substring(idx + 1);
        onChange(newValue);
      } else if (idx > 0) {
        refs.current[idx - 1]?.focus();
        const newValue =
          value.substring(0, idx - 1) + "" + value.substring(idx);
        onChange(newValue);
      }
      e.preventDefault();
    }
  };

  return (
    <div className={styles.otpContainer}>
      {inputs.map((_, idx) => (
        <input
          key={idx}
          ref={(el) => {
            refs.current[idx] = el;
          }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className={styles.otpInput}
          value={value[idx] || ""}
          onChange={(e) => handleChange(e, idx)}
          onKeyDown={(e) => handleKeyDown(e, idx)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
