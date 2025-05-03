import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemplates } from "../../api/gelato";
import Loader from "../../ui/Loader";

/**
 * TemplateList displays a list of Gelato templates with infinite scroll and accessibility.
 * @returns {JSX.Element}
 */
function TemplateList() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
    getTemplates(page)
      .then((data) => {
        setTemplates((prev) => [...prev, ...data]);
        setHasMore(data.length > 0);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load templates"))
      .finally(() => setLoading(false));
  }, [page]);

  function loadMore() {
    if (!loading && hasMore) setPage((p) => p + 1);
  }

  if (error)
    return (
      <div className="p-4 text-red-600" role="alert">
        {error}
      </div>
    );

  return (
    <main className="max-w-4xl mx-auto p-4" aria-label="Template list">
      <h1 className="text-xl font-bold mb-4">Templates</h1>
      <ul
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
        aria-label="Product grid"
      >
        {templates.map((tpl) => (
          <li
            key={tpl.id}
            className="bg-white rounded shadow p-4 flex flex-col gap-2"
          >
            <span className="font-semibold">{tpl.name}</span>
            <span className="text-xs text-gray-500">ID: {tpl.id}</span>
            <Link
              to={`/templates/${tpl.id}`}
              className="text-blue-600 underline focus:underline outline-none"
              tabIndex={0}
              aria-label={`View details for ${tpl.name}`}
            >
              View Details
            </Link>
          </li>
        ))}
      </ul>
      {hasMore && (
        <button
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 focus:outline-none"
          onClick={loadMore}
          disabled={loading}
          aria-label="Load more templates"
        >
          {loading ? (
            <Loader label="Loading more..." size="w-4 h-4" />
          ) : (
            "Load More"
          )}
        </button>
      )}
    </main>
  );
}

export default TemplateList;
