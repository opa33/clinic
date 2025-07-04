import React, { forwardRef } from "react";
import styles from "./PhoneInput.module.css";
import { FlagSVG } from "./InputSVG";
import { DeleteSVG } from "./InputSVG";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

const formatPhoneNumber = (number: string) => {
  const cleaned = number.replace(/\D/g, "");
  const match = cleaned.match(/^7(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);

  if (match) {
    const formatted = [
      "+7",
      match[1] ? " " + match[1] : "",
      match[2] ? " " + match[2] : "",
      match[3] ? " " + match[3] : "",
      match[4] ? " " + match[4] : "",
    ].join("");
    return formatted;
  }
  return number;
};

const handleInputChange =
  (onChange: (value: string) => void) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    if (!value.startsWith("+7")) {
      onChange("+7");
      return;
    }

    const cleaned = value.slice(2).replace(/\D/g, "");

    if (cleaned.length <= 10) {
      onChange(formatPhoneNumber("+7" + cleaned));
    }
  };

const PhoneInput = forwardRef<HTMLInputElement, PhoneInputProps>(
  ({ value, onChange, onClear }, ref) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    React.useImperativeHandle(ref, () => inputRef.current as HTMLInputElement);

    return (
      <div className={styles.phoneInputContainer}>
        <div className={styles.flagContainer}>
          <FlagSVG />
        </div>
        <input
          ref={inputRef}
          type="tel"
          value={value}
          onChange={handleInputChange(onChange)}
          className={styles.phoneInput}
          placeholder="+7"
          maxLength={16}
        />
        <button className={styles.clearButton} onClick={onClear} type="button">
          <DeleteSVG />
        </button>
      </div>
    );
  }
);

export default PhoneInput;
