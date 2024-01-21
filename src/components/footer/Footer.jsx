import React from "react";
import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div>©2024 Harsh. All rights reserved.</div>
      <div className={styles.social}>
        <img src="/1.png" width={15} height={15} className={styles.icon} alt="#" />
        <img src="/2.png" width={15} height={15} className={styles.icon} alt="#" />
        <img src="/3.png" width={15} height={15} className={styles.icon} alt="#" />
        <img src="/4.png" width={15} height={15} className={styles.icon} alt="#" />
      </div>
    </div>
  );
};

export default Footer;
