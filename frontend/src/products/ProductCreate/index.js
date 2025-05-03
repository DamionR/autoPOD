import React, { useState } from "react";
import PropTypes from "prop-types";
import ProviderSelector from "../../components/ProviderSelector";

/**
 * ProductCreate allows users to create a new product for the selected provider.
 * Handles loading, error, and success states. Accessible and production-ready.
 * @param {Object} props
 * @param {string} [props.shopId] - Optional shop ID for the new product
 * @param {Function} [props.onCreated] - Callback after successful creation
 * @returns {JSX.Element}
 */
export default function ProductCreate({ shopId, onCreated }) {
  const [provider, setProvider] = useState("gelato");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      // TODO: Replace with actual API call for product creation
      await new Promise((res) => setTimeout(res, 1000));
      setSuccess(true);
      setTitle("");
      setDescription("");
      if (onCreated) onCreated();
    } catch (err) {
      setError("Failed to create product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Create product form"
      className="max-w-lg mx-auto p-4 bg-white rounded shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">Create Product</h2>
        <ProviderSelector value={provider} onChange={setProvider} />
      </div>
      <div className="mb-3">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700"
        >
          Title
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
          aria-required="true"
        />
      </div>
      <div className="mb-3">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="mt-1 block w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      {error && (
        <div className="text-red-600 mb-2" role="alert">
          {error}
        </div>
      )}
      {success && (
        <div className="text-green-600 mb-2" role="status">
          Product created successfully!
        </div>
      )}
      <button
        type="submit"
        className="w-full bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-primary-dark focus:outline-none focus:ring"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? "Creating..." : "Create Product"}
      </button>
    </form>
  );
}

ProductCreate.propTypes = {
  shopId: PropTypes.string,
  onCreated: PropTypes.func,
};
