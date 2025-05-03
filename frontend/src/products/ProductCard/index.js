import React from "react";
import PropTypes from "prop-types";

/**
 * ProductCard component displays a product's image, title, price, and optional actions.
 * @param {Object} props
 * @param {Object} props.product - Product object { id, title, image, price, description, ... }
 * @param {Function} [props.onClick] - Optional click handler for the card
 * @param {React.ReactNode} [props.actions] - Optional action buttons (e.g., edit, delete)
 * @returns {JSX.Element}
 */
function ProductCard({ product, onClick, actions }) {
  return (
    <div
      className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow border flex flex-col cursor-pointer group"
      tabIndex={0}
      role="button"
      aria-label={`View details for ${product.title}`}
      onClick={onClick}
      onKeyPress={(e) => {
        if (e.key === "Enter" || e.key === " ") onClick && onClick(e);
      }}
    >
      <div className="aspect-w-1 aspect-h-1 w-full bg-gray-100 rounded-t-lg overflow-hidden flex items-center justify-center">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform"
            loading="lazy"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 text-4xl">
            <span role="img" aria-label="No image">
              🖼️
            </span>
          </div>
        )}
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3
          className="font-semibold text-lg text-gray-800 truncate"
          title={product.title}
        >
          {product.title}
        </h3>
        {product.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <span className="text-primary font-bold text-base">
            ${product.price?.toFixed(2) ?? "--"}
          </span>
          {actions && <div className="flex gap-2">{actions}</div>}
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string,
    price: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func,
  actions: PropTypes.node,
};

export default ProductCard;
