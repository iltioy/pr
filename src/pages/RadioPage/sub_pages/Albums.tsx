import { Stack, Typography } from "@mui/material";
import SongRecord from "../../../components/SongRecord";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useQuery } from "react-query";
import { CAHRT_GLOBAL_ALBUMS_NAME } from "../../../constants/admin";
import { Chart } from "../../../types";
import PlaylistsSection from "../../../components/playlist/PlaylistsSection";

const Albums = observer(() => {
    const { data: chart } = useQuery(
        CAHRT_GLOBAL_ALBUMS_NAME,
        () => axios.get(`/chart/${CAHRT_GLOBAL_ALBUMS_NAME}`),
        {
            select: (data) => {
                return data.data;
            },
            onSuccess: (data: Chart) => {
                if (!data) return;
            },
        }
    );

    return (
        <Stack width="100%" alignItems="center">
            <Stack
                sx={{
                    width: {
                        xs: "95%",
                        sm: "80%",
                    },
                }}
                flexDirection="column"
            >
                <Stack flexDirection="column" width="100%" marginTop="30px">
                    {chart?.categories[0] && (
                        <PlaylistsSection
                            title="Альбомы, которые слушают"
                            playlists={chart.categories[0].playlists}
                            isAlbum
                        />
                    )}
                </Stack>
            </Stack>
        </Stack>
    );
});

export default Albums;
