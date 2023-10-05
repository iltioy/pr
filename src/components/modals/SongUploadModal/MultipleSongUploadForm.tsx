import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { FileInfo } from "./SongUploadModal";
import { observer } from "mobx-react-lite";
import DoneIcon from "@mui/icons-material/Done";
import { UploadSongData, uploadSong } from "../../../queries/songs";

interface MultipleSongUploadFormProps {
    filesInfo: FileInfo[];
    handleEditFileFromMany: (fileInfo: FileInfo) => void;
}

const DEFAULT_MUSIC_IMAGE_URL =
    "https://sun6-23.userapi.com/s/v1/ig2/fCU0l_DjmTovIKbT969SqRNxQpBkl8_l00z0vPJY-tOy2vHwd9eY7rGCloekqrGzgLvANYSf886sRaMsTBDM2Blr.jpg?size=1068x1068&quality=95&crop=4,0,1068,1068&ava=1";

const MultipleSongUploadForm: React.FC<MultipleSongUploadFormProps> = observer(
    ({ filesInfo, handleEditFileFromMany }) => {
        console.log(filesInfo);

        const handleUploadAllSongs = async () => {
            try {
                filesInfo.forEach(async (fileInfo) => {
                    if (fileInfo.uploaded) return;

                    const { album, author, image_url, name, uploaded } = fileInfo;

                    if (!author || !name) return;

                    const uploadInfo: UploadSongData = {
                        author,
                        album,
                        image_url,
                        name,
                    };

                    const song = await uploadSong(uploadInfo, fileInfo);

                    if (!song) return;
                });
            } catch (error) {}
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
                                        src={file.image_url || DEFAULT_MUSIC_IMAGE_URL}
                                        alt=""
                                        style={{ width: "50px", height: "50px" }}
                                    />

                                    <Stack height="50px" width="230px" flex={1} marginLeft="10px">
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
                                        {file.uploaded && <DoneIcon htmlColor="green" />}
                                    </Stack>
                                </Stack>
                            );
                        })}
                    </Stack>

                    <Box>
                        <Button variant="contained" color="primary">
                            Сохранить
                        </Button>
                    </Box>
                </Stack>
            </Stack>
        );
    }
);

export default MultipleSongUploadForm;
