import { useStores } from "../../root-store-context";
import { observer } from "mobx-react-lite";
import { Navigate, Outlet } from "react-router";

const AdminRoutes = observer(() => {
    const { userStore } = useStores();

    return userStore.user.role === "admin" ? (
        <Outlet />
    ) : (
        <Navigate to="/radio" />
    );
});

export default AdminRoutes;
