import React, { useRef, useState } from "react";
import { supabase } from "../../api/supabase";
import PropTypes from "prop-types";
import Loader from "../../ui/Loader";

/**
 * FileUpload component for uploading files to Supabase Storage.
 * @param {object} props
 * @param {function} [props.onUpload] - Callback with uploaded file URL
 * @param {string} [props.bucket="public"] - Storage bucket name
 * @param {string} [props.pathPrefix="uploads/"] - Path prefix for uploaded files
 * @param {string[]} [props.accept] - Accepted file types (e.g., ["image/*"])
 * @returns {JSX.Element}
 */
function FileUpload({
  onUpload,
  bucket = "public",
  pathPrefix = "uploads/",
  accept = ["image/*"],
}) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(null);
  const inputRef = useRef();

  async function handleFile(file) {
    setUploading(true);
    const path = `${pathPrefix}${Date.now()}_${file.name}`;
    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, file);
    setUploading(false);
    if (error) {
      // Optionally use NotificationManager here
      return;
    }
    const url = supabase.storage.from(bucket).getPublicUrl(data.path)
      .data.publicUrl;
    setPreview(url);
    if (onUpload) onUpload(url);
  }

  function handleChange(e) {
    const file = e.target.files[0];
    if (file) handleFile(file);
  }

  function handleDrop(e) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" || e.key === " ") {
      inputRef.current.click();
    }
  }

  return (
    <div
      className="border-2 border-dashed rounded p-4 text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
      onClick={() => inputRef.current.click()}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      aria-label="File upload dropzone"
    >
      <input
        type="file"
        accept={accept.join(",")}
        ref={inputRef}
        className="hidden"
        onChange={handleChange}
        aria-label="File input"
      />
      {uploading ? (
        <Loader label="Uploading..." />
      ) : preview ? (
        <img
          src={preview}
          alt="Preview"
          className="mx-auto h-32 w-32 object-cover rounded"
        />
      ) : (
        <div>Drag & drop or click to upload a file</div>
      )}
    </div>
  );
}

FileUpload.propTypes = {
  onUpload: PropTypes.func,
  bucket: PropTypes.string,
  pathPrefix: PropTypes.string,
  accept: PropTypes.arrayOf(PropTypes.string),
};

export default FileUpload;
