import { Stack, Typography } from "@mui/material";
import Table from "../../components/admin/Table";
import EditCategories from "./EditCategories";
import { observer } from "mobx-react-lite";

const AdminRadio = observer(() => {
    return (
        <>
            <Typography variant="h4">Radio</Typography>

            <hr />

            {/* <Table></Table> */}

            <EditCategories />
        </>
    );
});

export default AdminRadio;
