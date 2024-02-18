import { Stack, Typography } from "@mui/material";

interface TableProps {}

const Table: React.FC<TableProps> = () => {
    return (
        <Stack
            sx={{
                height: "85px",
                width: "100%",
            }}
        >
            <Stack
                bgcolor="primary.dark"
                height="30px"
                display="flex"
                justifyContent="center"
            >
                <Typography fontWeight="bold" marginLeft="10px">
                    Name of a Table
                </Typography>
            </Stack>

            <Stack bgcolor="#232323" height="60px">
                asd
            </Stack>
        </Stack>
    );
};

export default Table;
