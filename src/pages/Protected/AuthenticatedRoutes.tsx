import { useStores } from "../../root-store-context";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router";

const AuthenticatedRoutes = observer(() => {
    const { userStore } = useStores();

    return userStore.access_token ? <Outlet /> : <Navigate to="/auth" />;
});

export default AuthenticatedRoutes;
