import { Navigate, useParams } from "react-router";

export const LegacyProductRedirect = () => {
  const { id = "" } = useParams();
  return <Navigate to={`/products/${encodeURIComponent(id)}`} replace />;
};

export const LegacyCategoryRedirect = () => {
  const { category = "" } = useParams();
  return <Navigate to={`/categories/${encodeURIComponent(category.toLowerCase())}`} replace />;
};
