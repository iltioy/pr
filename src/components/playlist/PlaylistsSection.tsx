import { Grid, Stack, Typography, Divider } from "@mui/material";
import PlaylistItem from "./PlaylistItem";
import { Playlist } from "../../types";
import CreatePlaylistItem from "./CreatePlaylistItem";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import { useStores } from "../../root-store-context";

interface PlaylistsSectionProps {
    title: string;
    playlists: Playlist[];
    isOwnedPlaylists?: boolean;
    isAlbum?: boolean;
}

const PlaylistsSection: React.FC<PlaylistsSectionProps> = observer(
    ({ title, playlists, isOwnedPlaylists, isAlbum }) => {
        return (
            <>
                <Stack
                    flexDirection="column"
                    sx={{
                        width: "100%",
                        alignItems: "center",
                    }}
                    color="text.primary"
                >
                    <Stack sx={{ width: "100%" }}>
                        <Typography
                            variant="h4"
                            sx={{
                                marginBottom: "10px",
                            }}
                            noWrap
                        >
                            {title}
                        </Typography>
                        <Divider
                            sx={{
                                marginBottom: "25px",
                            }}
                        />

                        <Grid container spacing={2}>
                            {playlists.length === 0 && (
                                <Grid item key="createPlaylistItem">
                                    <CreatePlaylistItem isAlbum={isAlbum} />
                                </Grid>
                            )}

                            {playlists.map((playlist, index) => {
                                if (index === 0 && isOwnedPlaylists) {
                                    return (
                                        <>
                                            <Grid item key={index}>
                                                <PlaylistItem
                                                    playlist={playlist}
                                                />
                                            </Grid>
                                            <Grid item key="createPlaylistItem">
                                                <CreatePlaylistItem
                                                    isAlbum={isAlbum}
                                                />
                                            </Grid>
                                        </>
                                    );
                                }

                                return (
                                    <Grid item key={index}>
                                        <PlaylistItem playlist={playlist} />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Stack>
                </Stack>
            </>
        );
    }
);

export default PlaylistsSection;
