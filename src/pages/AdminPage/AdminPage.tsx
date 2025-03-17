import { Button, Box, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { Outlet, useLocation, useNavigate } from "react-router";

const AdminPage = observer(() => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();

    let themeColor = theme.palette.mode === "dark" ? "black" : "white";

    return (
        <Stack
            sx={{
                height: "100%",
            }}
            bgcolor="custom.bg.main"
            color="text.primary"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Stack
                sx={{
                    height: "800px",
                    width: "1000px",
                }}
                bgcolor="custom.bg.secondary"
                borderRadius="10px"
                boxShadow={`0px 0px 10px ${themeColor}`}
                display="flex"
                justifyContent="center"
                alignItems="center"
            >
                <Stack
                    sx={{
                        height: "700px",
                        width: "850px",
                    }}
                >
                    <Outlet />
                </Stack>
                {/* <Stack width="850px">
                    <Box>
                        <Button
                            color="inherit"
                            onClick={() => navigate("/radio")}
                        >
                            На главную
                        </Button>
                    </Box>
                </Stack> */}
            </Stack>
        </Stack>
    );
});

export default AdminPage;
