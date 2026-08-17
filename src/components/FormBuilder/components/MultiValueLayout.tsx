import { ReactNode } from "react";
import styles from "./MultiValueLayout.module.css";

export const MultiValueWrapper = ({ children }: { children: ReactNode }) => (
  <div className={styles.checkboxesWrapper}>{children}</div>
);

export const MultiValues = ({ children }: { children: ReactNode }) => (
  <div className={styles.checkboxes}>{children}</div>
);

export const MultiValue = ({ children }: { children: ReactNode }) => (
  <div className={styles.checkbox}>{children}</div>
);
