import React from "react";
import styles from "./Button.module.css";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  disabled,
  children,
  ...props
}) => {
  return (
    <button className={""} disabled={disabled || loading} {...props}>
      {loading ? <span className={styles.spinner} /> : children}
    </button>
  );
};
