import { observer } from "mobx-react-lite";
import { Stack, Typography } from "@mui/material";
import { Playlist } from "../../../types";

interface PlaylistTableItemProps {
    playlist: Playlist;
    onDelete: (playlistId: number) => Promise<void>;
}

const PlaylistEditItem: React.FC<PlaylistTableItemProps> = observer(
    ({ playlist, onDelete }) => {
        return (
            <Stack
                sx={{
                    cursor: "pointer",
                    height: "50px",
                }}
                marginBottom="3px"
                flexDirection="row"
                alignItems="center"
                onClick={() => {}}
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
                        <Typography
                            variant="caption"
                            color="text.secondary"
                            marginRight="5px"
                        >
                            {`${playlist.owner.username} `}
                        </Typography>

                        <Typography
                            marginRight="5px"
                            variant="caption"
                            color="text.secondary"
                            sx={{
                                ":hover": {
                                    textDecoration: "underline",
                                },
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                                onDelete(playlist.id);
                            }}
                        >
                            Удалить
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
);

export default PlaylistEditItem;
