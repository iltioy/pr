import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Song as SongType } from "../../types";
import { observer } from "mobx-react-lite";
import { CAHRT_GLOBAL_TRENDS_NAME } from "../../constants/admin";

interface SongItemProps {
    song: SongType;
}

const SongItem = observer(({ song }: SongItemProps) => {
    const navigate = useNavigate();

    return (
        <Stack
            width="100%"
            sx={{
                cursor: "pointer",
                ":hover": {
                    textDecoration: "underline",
                },
            }}
            padding="5px"
            marginTop="7px"
            color="text.primary"
            onClick={() =>
                navigate(`/admin/${CAHRT_GLOBAL_TRENDS_NAME}/${song.id}`)
            }
        >
            <Typography variant="h5">{song.name}</Typography>
        </Stack>
    );
});

export default SongItem;
