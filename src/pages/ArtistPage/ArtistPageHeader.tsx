import { Avatar, Stack, Typography, Box, TextField } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import PressableButton from "../../components/MixSongsButton";
import { playlists } from "../../faker";
import { Playlist, User } from "../../types";
import * as _ from "lodash";
import FilesQueries from "../../queries/files";
import UserQueries from "../../queries/users";
import { useState } from "react";
import { useQueryClient } from "react-query";

interface AllPlaylistsHeaderProps {
    username?: string | null;
    setUsername: React.Dispatch<React.SetStateAction<string | undefined>>;
    user?: User | null;
}

const DEFAULT_PROFILE_IMAGE =
    "https://avatars.mds.yandex.net/get-yapic/0/0-0/islands-200";

const ArtistPageHeader: React.FC<AllPlaylistsHeaderProps> = observer(
    ({ username, setUsername, user }) => {
        const { songsStore, playlistsStore, userStore } = useStores();
        const [isEditingUsername, setIsEditingUsername] = useState(false);
        const queryClient = useQueryClient();

        const handleUpdateProfilePicture = async (file: File) => {
            const imageUrl = await FilesQueries.handleUploadImage(file);
            await UserQueries.updateUser({ image_url: imageUrl });
            await UserQueries.getMeInfo();
            queryClient.invalidateQueries({
                queryKey: ["userProfileInfo"],
            });
        };

        const handleUpdateUsername = async () => {
            await UserQueries.updateUser({ username });
            await UserQueries.getMeInfo();
        };

        return (
            <>
                <Stack
                    sx={{
                        width: "100%",
                        alignItems: "center",
                        marginBottom: "40px",
                        position: "relative",
                    }}
                    bgcolor="custom.bg.secondary"
                    color="text.primary"
                >
                    <Stack
                        sx={{
                            position: "absolute",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 2,
                            background: `url(${user?.image_url}) no-repeat center center fixed`,
                            backgroundSize: "cover",
                            filter: "blur(10px)",
                        }}
                    />
                    <Stack
                        sx={{
                            width: {
                                xs: "95%",
                                sm: "80%",
                            },
                            zIndex: 3,
                        }}
                        height="100%"
                        flexDirection="row"
                    >
                        <label htmlFor="playlistImageInput">
                            <Avatar
                                src={user?.image_url || DEFAULT_PROFILE_IMAGE}
                                alt="default user"
                                sx={{
                                    height: {
                                        xs: "125px",
                                        md: "200px",
                                    },
                                    width: {
                                        xs: "125px",
                                        md: "200px",
                                    },
                                    marginTop: {
                                        xs: "37.5px",
                                        md: "50px",
                                    },
                                    marginBottom: {
                                        xs: "37.5px",
                                        md: "50px",
                                    },
                                    objectFit: "cover",
                                }}
                            />
                        </label>

                        <Stack
                            flexDirection="column"
                            paddingLeft="30px"
                            sx={{
                                marginTop: {
                                    xs: "37.5px",
                                    md: "50px",
                                },
                                overflow: "hidden",
                            }}
                        >
                            <Typography
                                variant="caption"
                                color="grey"
                                sx={{
                                    fontSize: {
                                        xs: "17px",
                                        md: "27px",
                                    },
                                }}
                            >
                                Коллекция
                            </Typography>
                            {!isEditingUsername ? (
                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: {
                                            xs: "20px",
                                            md: "30px",
                                        },
                                        marginBottom: {
                                            xs: "15px",
                                            md: "30px",
                                        },
                                    }}
                                    onClick={() => {
                                        if (userStore.user.id === user?.id) {
                                            setIsEditingUsername(true);
                                        }
                                    }}
                                >
                                    {username}
                                </Typography>
                            ) : (
                                <TextField
                                    variant="standard"
                                    size="medium"
                                    sx={{
                                        fontWeight: "bold",
                                        fontSize: {
                                            xs: "20px",
                                            md: "30px",
                                        },
                                        marginBottom: {
                                            xs: "15px",
                                            md: "30px",
                                        },
                                    }}
                                    value={username}
                                    onChange={(e) =>
                                        setUsername(e.target.value)
                                    }
                                    onBlur={() => {
                                        setIsEditingUsername(false);

                                        if (username && username !== "") {
                                            handleUpdateUsername();
                                        }
                                    }}
                                    autoFocus
                                >
                                    {username}
                                </TextField>
                            )}

                            <Box
                                onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth",
                                    });
                                    songsStore.clearSongQueue();

                                    let playlist: Playlist = _.cloneDeep(
                                        playlistsStore.albums[0]
                                    );

                                    for (
                                        let i = 1;
                                        i <
                                        playlistsStore.added_playlists.length;
                                        i++
                                    ) {
                                        playlist.songs = [
                                            ...playlist.songs,
                                            ...playlistsStore.added_playlists[i]
                                                .songs,
                                        ];
                                    }

                                    songsStore.setSongQueue(playlist);
                                    songsStore.shuffleSongQueue();
                                }}
                            >
                                <PressableButton
                                    text="Перемешать"
                                    icon="play"
                                />
                            </Box>
                            {userStore.user.id === user?.id && (
                                <input
                                    type="file"
                                    id="playlistImageInput"
                                    style={{ display: "none" }}
                                    accept="image/png, image/jpeg, image/jpg"
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            handleUpdateProfilePicture(
                                                e.target.files[0]
                                            );
                                        }
                                    }}
                                />
                            )}
                        </Stack>
                    </Stack>
                </Stack>
            </>
        );
    }
);

export default ArtistPageHeader;
