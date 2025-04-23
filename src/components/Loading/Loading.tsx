// system
import React from "react";

// styles
import styles from './Loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__spinner}></div>
      <span className={styles.loading__text}>Carregando...</span>
    </div>
  );
};