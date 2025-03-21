import { Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import SettingsDrawer from "../../../components/SettingsDrawer";
import { playlists } from "../../../faker";
import PlaylistCarouselSection from "../../../components/playlist/PlaylistCarouselSection";
import SongQueries from "../../../queries/songs";
import { observer } from "mobx-react-lite";
import { useQuery } from "react-query";
import { Category, Chart } from "../../../types";
import axios from "axios";
import { CAHRT_GLOBAL_CATEGORIES_NAME } from "../../../constants/admin";

const Radio = observer(() => {
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const { data: chart } = useQuery(
        "chart-global-categories",
        () => axios.get(`/chart/${CAHRT_GLOBAL_CATEGORIES_NAME}`),
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
        <>
            <SettingsDrawer
                isSettingsDrawerOpen={isSettingsDrawerOpen}
                setIsSettingsDrawerOpen={setIsSettingsDrawerOpen}
            />

            <Stack width="100%" alignItems="center">
                <Stack
                    flexDirection="column"
                    sx={{
                        width: {
                            xs: "95%",
                            sm: "80%",
                        },
                        paddingBottom: "50px",
                    }}
                >
                    <Stack
                        width="100%"
                        height="350px"
                        bgcolor="custom.bg.secondary"
                        marginY="50px"
                        position="relative"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Stack>
                            <Stack flexDirection="column" alignItems="center">
                                <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                    className="noselect"
                                    sx={{
                                        cursor: "pointer",
                                        transition: "0.1s",
                                        ":hover": {
                                            transform: "scale(1.1)",
                                        },
                                        marginBottom: "15px",
                                    }}
                                    onClick={() => {
                                        SongQueries.getSongFromRadio();
                                    }}
                                >
                                    <PlayArrowIcon
                                        sx={{
                                            fontSize: "34px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    <Typography variant="h4">
                                        Моя волна
                                    </Typography>
                                </Stack>

                                <Stack
                                    flexDirection="row"
                                    alignItems="center"
                                    className="noselect"
                                    sx={{
                                        cursor: "pointer",
                                        paddingX: "15px",
                                        paddingY: "7px",
                                        border: "1px solid grey",
                                        borderRadius: "20px",
                                        ":hover": {
                                            border: "1px solid #737373",
                                        },
                                    }}
                                    onClick={() => {
                                        setIsSettingsDrawerOpen(true);
                                    }}
                                >
                                    <ExpandMoreIcon
                                        sx={{
                                            fontSize: "25px",
                                            marginRight: "2px",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            paddingRight: "4px",
                                        }}
                                    >
                                        Настроить
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* <PlaylistsSection title="Поп" /> */}

                    {chart?.categories?.map((category) => {
                        const playlists = category.playlists;

                        if (!playlists) return;
                        if (playlists.length === 0) return;
                        return (
                            <PlaylistCarouselSection
                                playlists={playlists}
                                title={category.name}
                            />
                        );
                    })}
                </Stack>
            </Stack>
        </>
    );
});

export default Radio;
