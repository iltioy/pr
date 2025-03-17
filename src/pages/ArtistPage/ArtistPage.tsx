import { Stack } from "@mui/material";
import ArtistPageHeader from "./ArtistPageHeader";
import PlaylistsSection from "../../components/playlist/PlaylistsSection";
import PlaylistCarousel from "../../components/playlist/PlaylistCarousel";
import { playlists } from "../../faker";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import { useQuery } from "react-query";
import { useParams } from "react-router";
import axios from "axios";
import Navbar from "../../components/Navbar";
import { User } from "../../types";
import { useState } from "react";

const ArtistHeader = observer(() => {
    const { playlistsStore, userStore } = useStores();
    const { artistName: defaultUsername } = useParams();

    const [username, setUsername] = useState(defaultUsername);

    const { data: user } = useQuery(
        ["artistUserInfo", username],
        () => {
            return axios.get(`/users/${username}`);
        },
        {
            select: (data) => {
                return data.data;
            },
            onSuccess: (data) => {
                playlistsStore.setLikedPlaylists(data);
                playlistsStore.setAddedPlaylists(data);
            },
            refetchOnWindowFocus: false,
        }
    );

    return (
        <Stack
            height="100%"
            bgcolor="custom.bg.main"
            sx={{
                overflow: "auto",
                paddingBottom: "75px",
            }}
            color="text.primary"
        >
            <Navbar />
            <ArtistPageHeader
                username={username}
                setUsername={setUsername}
                user={user}
            />

            <Stack width="100%" alignItems="center">
                <Stack
                    flexDirection="column"
                    sx={{
                        width: {
                            xs: "95%",
                            sm: "80%",
                        },
                    }}
                >
                    <Stack
                        width="100%"
                        flexDirection="column"
                        sx={{
                            display: {
                                xs: "flex",
                                md: "none",
                            },
                        }}
                    >
                        {(playlistsStore.albums.length > 0 ||
                            userStore.user.id === user?.id) && (
                            <PlaylistCarousel
                                playlists={playlistsStore.albums}
                                title="Альбомы"
                                isOwnedPlaylists={
                                    userStore.user.id === user?.id
                                }
                                isAlbum
                            />
                        )}
                    </Stack>

                    <Stack
                        sx={{
                            display: {
                                xs: "none",
                                md: "flex",
                            },
                        }}
                        width="100%"
                        flexDirection="column"
                    >
                        {(playlistsStore.albums.length > 0 ||
                            userStore.user.id === user?.id) && (
                            <PlaylistsSection
                                playlists={playlistsStore.albums}
                                title="Альбомы"
                                isOwnedPlaylists={
                                    userStore.user.id === user?.id
                                }
                                isAlbum
                            />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
});

export default ArtistHeader;
