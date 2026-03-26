import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // React Router v6 mein jab ek route wrapper ki tarah dusre routes ko enclose
  // karta hai <Route element={<wrapper>}>, tab children undefined hota hai.
  // Isliye humein <Outlet /> return karna chahiye taaki andar ke routes render ho.
  return <Outlet />;
};

export default ProtectedRoute;
