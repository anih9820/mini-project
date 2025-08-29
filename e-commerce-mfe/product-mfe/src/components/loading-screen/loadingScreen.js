import React from 'react';
import './LoadingScreen.css'; 
import styles from "../../styles/LoadingScreen.module.css"

const LoadingScreen = () => {
  return (
    <div class={styles.loaderContainer}>
    <div class={styles.loader}>
      <div class={styles.innerCircle}></div>
    </div>
  </div>
  );
};

export default LoadingScreen;
