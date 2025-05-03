import React from "react";
import PropTypes from "prop-types";

/**
 * ImagePreview component for displaying an image with fallback and accessibility.
 * @param {object} props
 * @param {string} props.src - Image source URL
 * @param {string} [props.alt] - Alt text for the image
 * @param {string} [props.className] - Additional class names
 * @returns {JSX.Element}
 */
function ImagePreview({ src, alt = "Image preview", className = "" }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`object-cover rounded shadow ${className}`}
      aria-label={alt}
      onError={(e) => {
        e.target.onerror = null;
        e.target.src = "/logo192.png";
      }}
    />
  );
}

ImagePreview.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImagePreview;
