import { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

export const Button = ({
  children,
  variant = "primary",
  ...props
}: {
  variant?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button {...props} className={[styles.button, styles[variant]].join(" ")}>
    {children}
  </button>
);
