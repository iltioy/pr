import { observer } from "mobx-react-lite";
import { PlaylistType } from "../../types";
import { Stack, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import PlaylistQueries from "../../queries/playlists";

const CreatePlaylistTableItem: React.FC = observer(() => {
    const navigate = useNavigate();

    const { isLoading, mutate: createPlaylist } = useMutation(
        PlaylistQueries.createPlaylist,
        {
            onSuccess: (data) => {
                const playlist: PlaylistType = data.data;
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
                height: "40px",
                width: "40px",
                borderRadius: "5px",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                zIndex: 1,
                ":hover .hoverPlaylistTableItem": {
                    color: "#7E7F7F",
                },
            }}
            color="text.primary"
            onClick={() => {
                if (!isLoading) {
                    createPlaylist();
                }
            }}
        >
            <Stack
                sx={{
                    height: "40px",
                    width: "40px",
                    marginBottom: "5px",
                    position: "relative",
                    backgroundColor: "#F6F8F9",
                    cursor: "pointer",
                    color: "#C3C5C6",
                }}
                className="hoverPlaylistTableItem"
            >
                <Stack
                    width="100%"
                    justifyContent="center"
                    alignItems="center"
                    flexDirection="row"
                    gap="10px"
                >
                    <Stack
                        sx={{
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "0.6s",
                        }}
                    >
                        <AddIcon
                            sx={{
                                width: "25px",
                                height: "25px",
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>
        </Stack>
    );
});

export default CreatePlaylistTableItem;
