import { Stack, Typography, Drawer } from "@mui/material";
import PlaylistsSection from "../../../components/playlist/PlaylistsSection";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import SettingsDrawer from "../../../components/SettingsDrawer";
import PlaylistCarousel from "../../../components/playlist/PlaylistCarousel";
import { playlists } from "../../../faker";
import PlaylistCarouselSection from "../../../components/playlist/PlaylistCarouselSection";

const Radio = () => {
    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

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
                                >
                                    <PlayArrowIcon
                                        sx={{
                                            fontSize: "34px",
                                            marginRight: "5px",
                                        }}
                                    />
                                    <Typography variant="h4">Моя волна</Typography>
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
                                        onClick={() => {
                                            setIsSettingsDrawerOpen(true);
                                        }}
                                    >
                                        Настроить
                                    </Typography>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Stack>
                    {/* <PlaylistsSection title="Поп" /> */}
                    <PlaylistCarouselSection playlists={playlists} title="Новые" />
                </Stack>
            </Stack>
        </>
    );
};

export default Radio;
