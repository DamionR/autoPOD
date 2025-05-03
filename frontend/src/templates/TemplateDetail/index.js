import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTemplate } from "../../api/gelato";
import Loader from "../../ui/Loader";

/**
 * TemplateDetail displays details for a Gelato template, including variants and placeholders.
 * @returns {JSX.Element}
 */
function TemplateDetail() {
  const { id } = useParams();
  const [template, setTemplate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    getTemplate(id)
      .then((data) => {
        setTemplate(data);
        setError(null);
      })
      .catch((err) => setError(err.message || "Failed to load template"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <Loader label="Loading template..." />;
  if (error)
    return (
      <div className="p-4 text-red-600" role="alert">
        {error}
        <div className="mt-2">
          <Link to="/templates" className="underline text-blue-600">
            Back to Templates
          </Link>
        </div>
      </div>
    );
  if (!template) return null;

  return (
    <main className="max-w-2xl mx-auto p-4" aria-label="Template detail">
      <Link
        to="/templates"
        className="text-blue-600 underline mb-4 inline-block"
      >
        &larr; Back to Templates
      </Link>
      <h1 className="text-xl font-bold mb-2">{template.name || template.id}</h1>
      <div className="mb-2 text-gray-600">ID: {template.id}</div>
      {template.description && (
        <div className="mb-2">{template.description}</div>
      )}
      {template.metadata && (
        <div className="mb-2 text-xs text-gray-500">
          Metadata: {JSON.stringify(template.metadata)}
        </div>
      )}
      <section aria-label="Variants" className="mb-4">
        <h2 className="font-semibold mb-1">Variants</h2>
        <ul className="list-disc list-inside">
          {template.variants?.map((variant) => (
            <li key={variant.id} className="mb-1">
              <span className="font-medium">{variant.name}</span> (ID:{" "}
              {variant.id})
              {variant.placeholders && (
                <ul className="ml-4 list-disc list-inside text-xs">
                  {variant.placeholders.map((ph) => (
                    <li key={ph.name}>
                      {ph.name} ({ph.type})
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default TemplateDetail;
