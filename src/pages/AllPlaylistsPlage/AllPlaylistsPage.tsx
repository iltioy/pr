import { Stack } from "@mui/material";
import AllPlaylistsHeader from "./AllPlaylistsHeader";
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

const AllPlaylistsPage = observer(() => {
    const { playlistsStore, userStore } = useStores();
    const { username: defaultUsername } = useParams();

    const [username, setUsername] = useState(defaultUsername);

    const { data: user } = useQuery(
        "userProfileInfo",
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

    // useQuery(
    //     ["playlists", username],
    //     () => {
    //         return axios.get(`/playlists/user/${username}`);
    //     },
    //     {
    //         select: (data) => {
    //             return data.data;
    //         },
    //         onSuccess: (data) => {
    //             playlistsStore.setLikedPlaylists(data);
    //             playlistsStore.setAddedPlaylists(data);
    //         },
    //         refetchOnWindowFocus: false,
    //     }
    // );

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
            <AllPlaylistsHeader
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
                        {playlistsStore.added_playlists.length > 0 && (
                            <PlaylistCarousel
                                playlists={playlistsStore.added_playlists}
                                title={
                                    userStore.user.id === user?.id
                                        ? "Ваши плейлисты"
                                        : `Плейлисты ${username}`
                                }
                                isOwnedPlaylists={
                                    userStore.user.id === user?.id
                                }
                            />
                        )}

                        {playlistsStore.liked_playlists.length > 0 && (
                            <PlaylistCarousel
                                playlists={playlistsStore.liked_playlists}
                                title="Нравится"
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
                        {playlistsStore.added_playlists.length > 0 && (
                            <PlaylistsSection
                                playlists={playlistsStore.added_playlists}
                                title={
                                    userStore.user.id === user?.id
                                        ? "Ваши плейлисты"
                                        : `Плейлисты ${username}`
                                }
                                isOwnedPlaylists={
                                    userStore.user.id === user?.id
                                }
                            />
                        )}

                        {playlistsStore.liked_playlists.length > 0 && (
                            <PlaylistsSection
                                playlists={playlistsStore.liked_playlists}
                                title="Нравится"
                            />
                        )}

                        {playlistsStore.liked_albums.length > 0 && (
                            <PlaylistsSection
                                playlists={playlistsStore.liked_albums}
                                title="Добаленные альбомы"
                                isAlbum
                            />
                        )}
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
});

export default AllPlaylistsPage;
