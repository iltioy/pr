import { useNavigate } from "react-router";
import { Stack } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import PlaylistQueries from "../../queries/playlists";
import { observer } from "mobx-react-lite";
import { Playlist } from "../../types";

interface CreatePlaylistItemProps {
    isAlbum?: boolean;
}

const CreatePlaylistItem: React.FC<CreatePlaylistItemProps> = observer(
    ({ isAlbum }) => {
        const navigate = useNavigate();

        console.log("CreatePlaylistItem");

        const { isLoading, mutate: createPlaylist } = useMutation(
            PlaylistQueries.createPlaylist,
            {
                onSuccess: (data) => {
                    const playlist: Playlist = data.data;
                    if (!playlist) return;
                    navigate(
                        `/${playlist.owner?.username}/playlist/${playlist.id}/edit`
                    );
                },
            }
        );

        return (
            <Stack
                sx={{
                    height: "290px",
                    width: "230px",
                    borderRadius: "5px",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    zIndex: 1,
                    ":hover .hoverPlaylistItem": {
                        color: "#7E7F7F",
                    },
                }}
                color="text.primary"
            >
                <Stack
                    sx={{
                        height: "260px",
                        width: "220px",
                        alignItems: "center",
                        flexDirection: "column",
                    }}
                >
                    <Stack
                        sx={{
                            height: "200px",
                            width: "200px",
                            marginBottom: "5px",
                            position: "relative",
                            backgroundColor: "#F6F8F9",
                            cursor: isLoading ? "" : "pointer",
                        }}
                        onClick={() => {
                            if (!isLoading) {
                                createPlaylist(isAlbum);
                            }
                        }}
                    >
                        <Stack
                            className="hoverPlaylistItem"
                            sx={{
                                position: "absolute",
                                zIndex: 3,
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                justifyContent: "center",
                                alignItems: "center",
                                color: "#C3C5C6",
                            }}
                        >
                            <>
                                <Stack
                                    width="100%"
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="row"
                                    gap="10px"
                                >
                                    <Stack
                                        sx={{
                                            width: "55px",
                                            height: "55px",
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            transition: "0.6s",
                                        }}
                                    >
                                        <AddIcon
                                            sx={{
                                                width: "70px",
                                                height: "70px",
                                            }}
                                        />
                                    </Stack>
                                </Stack>
                            </>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
);

export default CreatePlaylistItem;
