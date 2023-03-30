import classNames from "classnames";
import React, { useState } from "react";
import InputMask from "react-input-mask";
import styles from "./style.module.scss";

type inputType =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface IInput {
  label: string;
  value: string;
  onChange: (val?: any) => void;
  type: inputType;
  className?: any;
  isMasked?: boolean;
}

export const Input: React.FC<IInput> = ({
  label,
  value,
  onChange,
  type,
  className,
  isMasked,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <label
      className={classNames(styles.label, {
        [styles.focus]: isFocused,
        [className]: className,
      })}
    >
      {label}
      {isMasked ? (
        <InputMask
          mask="+7 999 999 99 99"
          type={type}
          className={styles.input}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          maskChar=" "
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      ) : (
        <input
          type={type}
          className={styles.input}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      )}
    </label>
  );
};
