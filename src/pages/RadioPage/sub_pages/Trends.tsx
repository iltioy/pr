import { Stack, Typography } from "@mui/material";
import SongRecord from "../../../components/SongRecord";
import { observer } from "mobx-react-lite";
import axios from "axios";
import { useQuery } from "react-query";
import { CAHRT_GLOBAL_TRENDS_NAME } from "../../../constants/admin";
import { Chart } from "../../../types";

const Trends = observer(() => {
    const { data: chart } = useQuery(
        CAHRT_GLOBAL_TRENDS_NAME,
        () => axios.get(`/chart/${CAHRT_GLOBAL_TRENDS_NAME}`),
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
                <Typography variant="h4" marginTop="30px" marginBottom="5px">
                    Чарт
                </Typography>
                <Typography variant="body1" color="#cccccc" marginBottom="30px">
                    Треки, популярные прямо сейчас
                </Typography>

                <Stack flexDirection="column" width="100%">
                    {chart?.playlist?.songs.map((song) => {
                        return (
                            <SongRecord
                                key={song.id}
                                song={song}
                                sx={{
                                    marginBottom: "10px",
                                }}
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
});

export default Trends;
