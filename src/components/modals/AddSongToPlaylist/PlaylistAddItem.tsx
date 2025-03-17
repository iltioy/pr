import { observer } from "mobx-react-lite";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Playlist } from "../../../types";
import { useStores } from "../../../root-store-context";

interface PlaylistTableItemProps {
    playlist: Playlist;
    handleAddSongToPlaylist: (playlistId: number) => Promise<void>;
}

const PlaylistAddItem: React.FC<PlaylistTableItemProps> = observer(
    ({ playlist, handleAddSongToPlaylist }) => {
        return (
            <Stack
                sx={{
                    cursor: "pointer",
                    height: "50px",
                }}
                marginBottom="3px"
                flexDirection="row"
                alignItems="center"
                onClick={() => {
                    handleAddSongToPlaylist(playlist.id);
                }}
            >
                <img
                    src={`${playlist.image_url}`}
                    style={{
                        objectFit: "cover",
                        width: "40px",
                        height: "40px",
                    }}
                    alt=""
                />

                <Stack height="50px" marginLeft="10px" maxWidth="100%">
                    <Typography noWrap maxWidth="100%">
                        {playlist.name}
                    </Typography>
                    <Stack flexDirection="row">
                        <Typography variant="caption" color="text.secondary">
                            треков: {playlist.songs?.length + 1}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
);

export default PlaylistAddItem;
