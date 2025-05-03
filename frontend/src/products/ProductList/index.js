import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useProducts from "../../hooks/useProducts";
import ProviderSelector from "../../components/ProviderSelector";
import ProductCard from "../ProductCard";

/**
 * ProductList displays products from the selected provider (Gelato, Printify, Printful).
 * Handles loading, error, empty, and success states. Accessible and production-ready.
 * @param {object} props
 * @param {string} [props.shopId] - Optional shop ID for filtering products
 * @returns {JSX.Element}
 */
export default function ProductList({ shopId }) {
  const [provider, setProvider] = useState("gelato");
  const { products, loading, error, fetchProducts } = useProducts(provider);

  useEffect(() => {
    if (shopId) fetchProducts(shopId);
    else fetchProducts();
  }, [shopId, provider, fetchProducts]);

  return (
    <section aria-label="Product list" className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">
          Products{" "}
          <span className="text-xs text-gray-500">
            ({provider.charAt(0).toUpperCase() + provider.slice(1)})
          </span>
        </h2>
        <ProviderSelector value={provider} onChange={setProvider} />
      </div>
      {loading && (
        <div role="status" aria-live="polite">
          Loading products...
        </div>
      )}
      {error && (
        <div className="text-red-600" role="alert">
          {error}
        </div>
      )}
      {!loading && !error && products.length === 0 && (
        <div className="text-gray-500 text-center py-8" role="status">
          No products found for this provider.
        </div>
      )}
      <ul
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
        aria-label="Product grid"
      >
        {products.map((p) => (
          <li key={p.id}>
            <ProductCard product={p} provider={provider} />
          </li>
        ))}
      </ul>
    </section>
  );
}

ProductList.propTypes = {
  shopId: PropTypes.string,
};
