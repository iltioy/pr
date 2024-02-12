import {
    Box,
    Button,
    CircularProgress,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
import { FileInfo } from "./SongUploadModal";
import { observer } from "mobx-react-lite";
import DoneIcon from "@mui/icons-material/Done";
import { UploadSongData } from "../../../queries/songs";
import SongQueries from "../../../queries/songs";
import PlaylistQuieries from "../../../queries/playlists";
import { useStores } from "../../../root-store-context";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

interface MultipleSongUploadFormProps {
    filesInfo: FileInfo[];
    handleEditFileFromMany: (fileInfo: FileInfo) => void;
    setFilesInfo: React.Dispatch<React.SetStateAction<FileInfo[]>>;
}

const DEFAULT_MUSIC_IMAGE_URL =
    "https://sun6-23.userapi.com/s/v1/ig2/fCU0l_DjmTovIKbT969SqRNxQpBkl8_l00z0vPJY-tOy2vHwd9eY7rGCloekqrGzgLvANYSf886sRaMsTBDM2Blr.jpg?size=1068x1068&quality=95&crop=4,0,1068,1068&ava=1";

const MultipleSongUploadForm: React.FC<MultipleSongUploadFormProps> = observer(
    ({ filesInfo, handleEditFileFromMany, setFilesInfo }) => {
        const { modalsStore } = useStores();
        const [isLoading, setIsLoading] = useState(false);
        const [allAuthor, setAllAuthor] = useState("");

        const handleUploadAllSongs = async () => {
            setIsLoading(true);
            try {
                await Promise.all(
                    filesInfo.map(async (fileInfo) => {
                        try {
                            if (fileInfo.uploaded) return;
                            const { album, author, image_url, name } = fileInfo;
                            let audioAuthor = author ? author : allAuthor;
                            if (!name) throw new Error("No name");

                            setFilesInfo((prevState) => {
                                let newState: FileInfo[] = [];
                                prevState.forEach((prevFileInfo) => {
                                    if (fileInfo.file === prevFileInfo.file) {
                                        const {
                                            author,
                                            name,
                                            album,
                                            file,
                                            image_url,
                                        } = fileInfo;
                                        let newInfo: FileInfo = {
                                            author,
                                            file,
                                            name,
                                            album,
                                            uploaded: false,
                                            image_url,
                                            uploadingState: "loading",
                                        };
                                        newState.push(newInfo);
                                    } else {
                                        newState.push(prevFileInfo);
                                    }
                                });

                                return newState;
                            });

                            console.log(fileInfo);

                            const uploadInfo: UploadSongData = {
                                author: audioAuthor,
                                album,
                                image_url,
                                name,
                            };

                            const song = await SongQueries.uploadSong(
                                uploadInfo,
                                fileInfo
                            );

                            if (!song) return;
                            if (
                                modalsStore.playlistToAddToId &&
                                song &&
                                song.id
                            ) {
                                await PlaylistQuieries.addSongToPlaylist(
                                    modalsStore.playlistToAddToId,
                                    song.id
                                );
                            }

                            setFilesInfo((prevState) => {
                                let newState: FileInfo[] = [];
                                prevState.forEach((prevFileInfo) => {
                                    if (fileInfo.file === prevFileInfo.file) {
                                        const {
                                            author,
                                            name,
                                            album,
                                            file,
                                            image_url,
                                        } = fileInfo;
                                        let newInfo: FileInfo = {
                                            author,
                                            file,
                                            name,
                                            uploaded: true,
                                            album,
                                            image_url,
                                        };
                                        newState.push(newInfo);
                                    } else {
                                        newState.push(prevFileInfo);
                                    }
                                });

                                console.log(prevState, newState);

                                return newState;
                            });
                        } catch (error) {
                            console.log(error);
                            setFilesInfo((prevState) => {
                                let newState: FileInfo[] = [];
                                prevState.forEach((prevFileInfo) => {
                                    if (fileInfo.file === prevFileInfo.file) {
                                        const {
                                            author,
                                            name,
                                            album,
                                            file,
                                            image_url,
                                        } = fileInfo;
                                        let newInfo: FileInfo = {
                                            author,
                                            file,
                                            name,
                                            uploaded: false,
                                            album,
                                            image_url,
                                            uploadingState: "error",
                                        };
                                        newState.push(newInfo);
                                    } else {
                                        newState.push(prevFileInfo);
                                    }
                                });

                                return newState;
                            });
                        }
                    })
                );
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                console.log(error);
            }
        };
        return (
            <Stack
                width="400px"
                height="380px"
                overflow="auto"
                bgcolor="custom.bg.main"
                borderRadius="10px"
                onClick={(e) => e.stopPropagation()}
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <Stack width="330" height="360px" flexDirection="column">
                    <TextField
                        name="author"
                        variant="standard"
                        sx={{
                            width: "100%",
                            marginBottom: "10px",
                            marginTop: "5px",
                            height: "30px",
                        }}
                        placeholder="Автор всех аудио"
                        value={allAuthor}
                        onChange={(e) => setAllAuthor(e.target.value)}
                    />

                    <Stack
                        overflow="auto"
                        width="100%"
                        height="250px"
                        paddingY="15px"
                        className="noScroll"
                        marginBottom="10px"
                    >
                        {filesInfo.map((file) => {
                            return (
                                <Stack
                                    height="50px"
                                    width="100%"
                                    flexDirection="row"
                                    alignItems="center"
                                    sx={{
                                        cursor: "pointer",
                                    }}
                                    marginBottom="10px"
                                    onClick={() => {
                                        if (file.uploaded) return;
                                        handleEditFileFromMany(file);
                                    }}
                                >
                                    <img
                                        src={
                                            file.image_url ||
                                            DEFAULT_MUSIC_IMAGE_URL
                                        }
                                        alt=""
                                        style={{
                                            width: "50px",
                                            height: "50px",
                                        }}
                                    />

                                    <Stack
                                        height="50px"
                                        width="230px"
                                        flex={1}
                                        marginLeft="10px"
                                    >
                                        <Typography noWrap maxWidth="100%">
                                            {file.name}
                                        </Typography>
                                        <Typography
                                            variant="caption"
                                            color="grey"
                                            noWrap
                                            maxWidth="50%"
                                        >
                                            {file.author}
                                        </Typography>
                                    </Stack>

                                    <Stack
                                        width="50px"
                                        height="50px"
                                        justifyContent="center"
                                        alignItems="center"
                                    >
                                        {file.uploaded ? (
                                            <DoneIcon htmlColor="green" />
                                        ) : file.uploadingState ===
                                          "loading" ? (
                                            <CircularProgress />
                                        ) : file.uploadingState === "error" ? (
                                            <CloseIcon
                                                sx={{
                                                    fontSize: "35px",
                                                }}
                                                color="error"
                                            />
                                        ) : null}
                                    </Stack>
                                </Stack>
                            );
                        })}
                    </Stack>

                    <Box>
                        <LoadingButton
                            loading={isLoading}
                            variant="contained"
                            color="primary"
                            onClick={() => handleUploadAllSongs()}
                        >
                            Сохранить
                        </LoadingButton>
                    </Box>
                </Stack>
            </Stack>
        );
    }
);

export default MultipleSongUploadForm;
