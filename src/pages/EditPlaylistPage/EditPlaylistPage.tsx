import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import EditPlaylistHeader from "./EditPlaylistHeader";
import { observer } from "mobx-react-lite";
import { useQuery, useQueryClient } from "react-query";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import { Song, Playlist } from "../../types";
import "../PlaylistPage/playlistPage.styles.css";
import { useStores } from "../../root-store-context";
import Navbar from "../../components/Navbar";
import PlaylistSongs from "../PlaylistPage/PlaylistSongs";

const EditPlaylistPage = observer(() => {
    const { playlistId } = useParams();
    const [playlistName, setPlaylistName] = useState("");
    const [playlistImage, setPlaylistImage] = useState<string>("");
    const [songs, setSongs] = useState<Song[]>([]);

    const { userStore } = useStores();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { data: playlist, isLoading } = useQuery(
        ["playlist", playlistId],
        () => {
            return axios.get(`/playlists/${playlistId}`);
        },
        {
            select: (data) => {
                const playlist: Playlist = data.data;
                return playlist;
            },
            onSuccess: (data) => {
                if (playlistName === "" && !playlistImage) {
                    setPlaylistName(data.name);
                    setPlaylistImage(data.image_url);
                }
                extractSongsFromOrderdSongs(data);
            },
            refetchOnWindowFocus: false,
        }
    );

    const handleSaveChanges = async () => {
        try {
            if (!playlist) return;

            await axios.patch(
                `/playlists/update/${playlist.id}`,
                {
                    name: playlistName,
                    image_url: playlistImage,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            queryClient.invalidateQueries({
                queryKey: ["playlist", playlist.id],
            });
            navigate(`/${playlist.owner.username}/playlist/${playlist.id}`);
        } catch (error) {
            console.log(error);
        }
    };

    const extractSongsFromOrderdSongs = (playlist?: Playlist) => {
        if (!playlist) return;

        setSongs(playlist.songs);
    };

    useEffect(() => {
        if (playlist && userStore.user.username !== playlist.owner.username) {
            navigate(`/${playlist.owner.username}/playlist/${playlist.id}`);
        }
    }, [userStore.user.username, playlist]);

    return (
        <>
            <Stack
                height="100%"
                flexDirection="column"
                bgcolor="custom.bg.main"
                overflow="auto"
                paddingBottom="50px"
            >
                <Navbar />

                <Stack flexDirection="column">
                    <EditPlaylistHeader
                        isLoading={isLoading}
                        playlist={playlist}
                        playlistName={playlistName}
                        setPlaylistName={setPlaylistName}
                        playlistImage={playlistImage}
                        setPlaylistImage={setPlaylistImage}
                        handleSaveChanges={handleSaveChanges}
                    />

                    <PlaylistSongs
                        playlist={playlist}
                        isEdit
                        data={songs}
                        isLoading={isLoading}
                    />
                </Stack>
            </Stack>
        </>
    );
});

export default EditPlaylistPage;
