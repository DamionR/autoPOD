import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import ProductList from "../products/ProductList";
import ProductDetail from "../products/ProductDetail";
import ProductCreate from "../products/ProductCreate";
import TemplateList from "../templates/TemplateList";
import TemplateDetail from "../templates/TemplateDetail";
import FileUpload from "../storage/FileUpload";
import ImagePreview from "../storage/ImagePreview";
import AIGenerateImage from "../ai/AIGenerateImage";
import AIGenerateContent from "../ai/AIGenerateContent";

/**
 * MainRoutes defines all main/protected app routes.
 * @returns {JSX.Element}
 */
function MainRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard"
          element={<Navigate to="/products" replace />}
        />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/templates" element={<TemplateList />} />
        <Route path="/templates/:id" element={<TemplateDetail />} />
        <Route path="/ai/generate-image" element={<AIGenerateImage />} />
        <Route path="/ai/generate-content" element={<AIGenerateContent />} />
        <Route path="/storage/upload" element={<FileUpload />} />
        <Route path="/storage/preview" element={<ImagePreview />} />
      </Route>
    </Routes>
  );
}

export default MainRoutes;
