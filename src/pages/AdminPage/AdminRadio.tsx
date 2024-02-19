import { Stack, Typography } from "@mui/material";
import Table from "../../components/admin/Table";
import EditCategory from "./Categories/EditCategory";
import { observer } from "mobx-react-lite";

const AdminRadio = observer(() => {
    return (
        <>
            <Typography variant="h4">Radio</Typography>

            <hr />

            {/* <Table></Table> */}

            <EditCategory />
        </>
    );
});

export default AdminRadio;
