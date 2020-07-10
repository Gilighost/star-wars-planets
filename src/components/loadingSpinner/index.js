import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.css";

const LoadingSpinner = ({ isSmall }) => (
  <div className={`${styles.spinner} ${isSmall ? styles.small : ""}`}>
    <div className={styles.doubleBounce1}></div>
    <div className={styles.doubleBounce2}></div>
  </div>
);

LoadingSpinner.propTypes = {
  isSmall: PropTypes.bool,
};

export default LoadingSpinner;
