/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { useState, forwardRef } from "react";
import classNames from "classnames";
import images from "../../assets/images";
import styles from "./Images.module.scss";
import PropTypes from "prop-types";

const Images = forwardRef(
  (
    {
      src,
      alt,
      className,
      fallback: customFallback = images.noImage,
      ...props
    },
    ref
  ) => {
    const [fallback, setFallback] = useState("");
    const handleError = () => {
      setFallback(customFallback);
    };
    return (
      <img
        className={classNames(styles.wrapper, className)}
        ref={ref}
        src={fallback || src}
        alt={alt}
        {...props}
        onError={handleError}
      />
    );
  }
);

Images.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  fallback: PropTypes.string,
};
export default Images;
