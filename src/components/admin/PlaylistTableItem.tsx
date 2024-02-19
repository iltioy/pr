import { observer } from "mobx-react-lite";
import { PlaylistType } from "../../types";
import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";

interface PlaylistTableItemProps {
    playlist: PlaylistType;
    onDelete: (playlistId: number) => Promise<void>;
}

const PlaylistTableItem: React.FC<PlaylistTableItemProps> = observer(
    ({ playlist, onDelete }) => {
        const navigate = useNavigate();

        return (
            <Stack
                sx={{
                    cursor: "pointer",
                    height: "50px",
                }}
                marginBottom="3px"
                flexDirection="row"
                alignItems="center"
                maxWidth="60%"
                onClick={() => {
                    navigate(
                        `/${playlist.owner.username}/playlist/${playlist.id}`
                    );
                }}
            >
                <img
                    src={`${playlist.image.image_url}`}
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
                        <Typography variant="caption" color="text.secondary">
                            Count: {playlist.songs?.length + 1}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>
        );
    }
);

export default PlaylistTableItem;
