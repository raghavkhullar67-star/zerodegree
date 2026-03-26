import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated || !user?.isAdmin) {
    return <Navigate to="/" />;
  }

  return children;
};

export default AdminRoute;
