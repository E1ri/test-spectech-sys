import React from "react";
import styles from "./style.module.scss";

interface IButton {
  onClick: (arg?: any) => void;
  label: string;
}

export const Button: React.FC<IButton> = ({ onClick, label }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {label.toLocaleUpperCase()}
    </button>
  );
};
