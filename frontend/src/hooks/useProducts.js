import { useState, useCallback } from "react";
import * as gelatoApi from "../api/gelato";
import * as printifyApi from "../api/printify";
import * as printfulApi from "../api/printful";

/**
 * useProducts - fetches and manages products for the selected provider.
 * @param {string} provider - 'gelato', 'printify', or 'printful'
 */
export default function useProducts(provider = "gelato") {
  let api;
  if (provider === "printful") api = printfulApi;
  else if (provider === "printify") api = printifyApi;
  else api = gelatoApi;

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(
    async (shopId) => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.getProducts(shopId);
        setProducts(res.products || res.data || []);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    },
    [api]
  );

  const getProduct = useCallback(
    (shopId, productId) => api.getProduct(shopId, productId),
    [api]
  );
  const createProduct = useCallback(
    (shopId, payload) => api.createProduct(shopId, payload),
    [api]
  );

  return { products, loading, error, fetchProducts, getProduct, createProduct };
}
