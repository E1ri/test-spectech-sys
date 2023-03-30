import classNames from "classnames";
import React from "react";
import styles from "./style.module.scss";

interface IModal {
  children: JSX.Element;
  isExtra?: boolean;
}

export const Modal: React.FC<IModal> = ({ children, isExtra }) => {
  return (
    <div className={classNames(styles.modal, { [styles.extra]: isExtra })}>
      {children}
    </div>
  );
};
