import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import useProducts from "../../hooks/useProducts";

/**
 * ProductDetail displays detailed information for a single product.
 * Handles loading, error, and not found states. Accessible and production-ready.
 * @param {Object} props
 * @param {string} props.productId - The product ID to display
 * @param {string} [props.shopId] - Optional shop ID for filtering
 * @param {string} [props.provider] - Provider name (gelato, printify, printful)
 * @returns {JSX.Element}
 */
export default function ProductDetail({
  productId,
  shopId,
  provider = "gelato",
}) {
  const { products, loading, error, fetchProducts } = useProducts(provider);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProducts(shopId).then(() => {
      setProduct(products.find((p) => p.id === productId));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId, shopId, provider]);

  if (loading) {
    return (
      <div role="status" aria-live="polite">
        Loading product...
      </div>
    );
  }
  if (error) {
    return (
      <div className="text-red-600" role="alert">
        {error}
      </div>
    );
  }
  if (!product) {
    return (
      <div className="text-gray-500" role="status">
        Product not found.
      </div>
    );
  }

  return (
    <section
      aria-label="Product details"
      className="max-w-2xl mx-auto p-4 bg-white rounded shadow"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-shrink-0 w-full md:w-1/2">
          {product.image ? (
            <img
              src={product.image}
              alt={product.title}
              className="object-cover w-full h-64 rounded"
              loading="lazy"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-64 bg-gray-100 text-gray-300 text-4xl rounded">
              <span role="img" aria-label="No image">
                🖼️
              </span>
            </div>
          )}
        </div>
        <div className="flex-1 flex flex-col">
          <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <span className="text-primary font-bold text-lg mb-2">
            ${product.price?.toFixed(2) ?? "--"}
          </span>
          {/* Add more product details here as needed */}
        </div>
      </div>
    </section>
  );
}

ProductDetail.propTypes = {
  productId: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  shopId: PropTypes.string,
  provider: PropTypes.string,
};
