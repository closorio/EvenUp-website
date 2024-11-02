import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/store";

type ProtectedRouteProps = {
  redirectPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
    redirectPath,
}) => {
    const auth = useAppSelector((state) => state.auth);
    //if (!auth.isAuthenticated) {
    //    return <Navigate to={redirectPath} replace />
    //}
    return <Outlet />;
}

export default ProtectedRoute;

