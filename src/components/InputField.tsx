import { forwardRef, HTMLProps, useState } from "react";
import { FieldError } from "react-hook-form";
import styles from "./InputField.module.css";

type InputFieldProps = {
  label?: string;
  labelledBy?: string;
  error?: FieldError;
  password?: boolean;
} & HTMLProps<HTMLInputElement>;

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  (
    { label, error, name, className, labelledBy, password, type, ...rest },
    ref
  ) => {
    const attributes: Record<string, string> = {};
    if (labelledBy) attributes["aria-labelledby"] = labelledBy;
    return (
      <div className={[styles.container, className].join(" ")}>
        {label && <label htmlFor={name}>{label}</label>}
        <div className={styles.inputWrapper}>
          <input
            ref={ref}
            {...rest}
            name={name}
            id={name}
            className={styles.inputField}
            {...attributes}
          />
        </div>
        {error && <div>{error.message}</div>}
      </div>
    );
  }
);
