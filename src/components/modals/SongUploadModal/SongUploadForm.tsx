import {
    Stack,
    Typography,
    TextField,
    Button,
    Box,
    FormLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import { Song } from "../../../types";
import FilesQueries from "../../../queries/files";
import SongsQueries from "../../../queries/songs";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../root-store-context";
import { useFormik } from "formik";
import PlaylistQueries from "../../../queries/playlists";
import path from "path-browserify";
import { FileInfo, newFileInfo } from "./SongUploadModal";
import { useLocalization } from "../../../contexts/LocalizationContext";
import { useSnackbar } from "notistack";

const DEFAULT_MUSIC_IMAGE_URL =
    "https://sun6-23.userapi.com/s/v1/ig2/fCU0l_DjmTovIKbT969SqRNxQpBkl8_l00z0vPJY-tOy2vHwd9eY7rGCloekqrGzgLvANYSf886sRaMsTBDM2Blr.jpg?size=1068x1068&quality=95&crop=4,0,1068,1068&ava=1";

interface SongUploadFormProps {
    fileInfo?: FileInfo;
    setError?: React.Dispatch<React.SetStateAction<string>>;
    multipleFiles?: boolean;
    handleGoBackFormEditing?: (newFileInfo: newFileInfo) => void;
}

export interface UploadSongInfoProps {
    name: string;
    author: string;
    album: string;
}

const SongUploadForm: React.FC<SongUploadFormProps> = observer(
    ({ fileInfo, setError, multipleFiles, handleGoBackFormEditing }) => {
        const [songImage, setSongImage] = useState<string>(
            fileInfo?.image_url || ""
        );
        const [isLoading, setIsLoading] = useState(false);
        const { modalsStore } = useStores();
        const { t } = useLocalization();

        const { enqueueSnackbar } = useSnackbar();

        const handleUploadSong = async (info: UploadSongInfoProps) => {
            setIsLoading(true);
            try {
                const uploadInfo = {
                    name: info.name,
                    author:
                        modalsStore.playlistToAddTo?.owner.nickname ||
                        t('administrator'),
                    album: modalsStore.playlistToAddTo?.name,
                    image_url: songImage,
                };

                const song = await SongsQueries.uploadSong(
                    uploadInfo,
                    fileInfo
                );

                if (!song) return;

                if (modalsStore.playlistToAddTo && song && song.id) {
                    await PlaylistQueries.addSongToPlaylist(
                        modalsStore.playlistToAddTo.id,
                        song.id
                    );
                }

                enqueueSnackbar("Аудио успешно загружено!", {
                    variant: "success",
                    autoHideDuration: 3000,
                });

                if (multipleFiles && handleGoBackFormEditing) {
                    handleGoBackFormEditing({
                        name: song.name,
                        author: song.author,
                        uploaded: true,
                        image_url: songImage,
                        album: song.album,
                        file: fileInfo?.file,
                    });
                } else {
                    modalsStore.toggleSongUploadModal();
                }
            } catch (error) {
                if (setError) {
                    setIsLoading(false);
                    setError("Не удалось загрузить аудио!");
                }
                console.log(error);
            }
        };

        const songCreateFormik = useFormik({
            initialValues: {
                name: fileInfo?.name
                    ? fileInfo.name
                    : fileInfo?.file
                    ? path.parse(fileInfo.file.name).name
                    : "",
                author: fileInfo?.author || "",
                album: fileInfo?.album || "",
            },
            onSubmit: async (values) => {
                const info = {
                    name: values.name,
                    author: values.author,
                    album: values.album,
                };

                handleUploadSong(info);
            },
        });

        const handleUpladSongImage = async (file: File) => {
            const image = await FilesQueries.handleUploadImage(file);
            if (!image) return;
            setSongImage(image);
        };

        return (
            <>
                <Stack
                    width="400px"
                    height="180px"
                    bgcolor="custom.bg.main"
                    borderRadius="10px"
                    justifyContent="center"
                    alignItems="center"
                    onClick={(e) => e.stopPropagation()}
                >
                    <Stack width="350px" flexDirection="column">
                        <form
                            action=""
                            onSubmit={songCreateFormik.handleSubmit}
                        >
                            <Stack
                                height="75px"
                                flexDirection="row"
                                marginBottom="20px"
                            >
                                <Stack
                                    height="75px"
                                    width="75px"
                                    marginRight="20px"
                                    sx={{
                                        ":hover .hoverSongImage": {
                                            display: "flex",
                                        },
                                    }}
                                    position="relative"
                                >
                                    <label htmlFor="songImageInput">
                                        <Stack
                                            className="hoverSongImage"
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            right="0"
                                            bottom="0"
                                            bgcolor="black"
                                            display="none"
                                            sx={{
                                                opacity: 0.7,
                                                cursor: "pointer",
                                            }}
                                            justifyContent="center"
                                            alignItems="center"
                                        >
                                            <FileUploadIcon
                                                sx={{
                                                    fontSize: {
                                                        xs: "37px",
                                                        // md: "85px",
                                                    },
                                                    color: "white",
                                                }}
                                            />

                                            <input
                                                type="file"
                                                id="songImageInput"
                                                style={{ display: "none" }}
                                                accept="image/png, image/jpeg, image/jpg"
                                                onChange={(e) => {
                                                    const files =
                                                        e.target.files;
                                                    if (!files) return;

                                                    const file = files[0];
                                                    if (!file) return;

                                                    handleUpladSongImage(file);
                                                }}
                                            />
                                        </Stack>
                                    </label>

                                    <img
                                        src={`${
                                            songImage || DEFAULT_MUSIC_IMAGE_URL
                                        }`}
                                        style={{
                                            height: "75px",
                                            width: "75px",
                                            objectFit: "fill",
                                        }}
                                    />
                                </Stack>

                                <Stack flexDirection="column">
                                    {/* <FormLabel>Название:</FormLabel> */}
                                    <TextField
                                        sx={{
                                            width: "220px",
                                        }}
                                        name="name"
                                        variant="standard"
                                        placeholder={t('audioTitle')}
                                        value={songCreateFormik.values.name}
                                        onChange={songCreateFormik.handleChange}
                                    />
                                    <Typography
                                        noWrap
                                        variant="body1"
                                        color="grey"
                                        marginTop="10px"
                                        maxWidth="200px"
                                    >
                                        {fileInfo?.file?.name}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack flexDirection="row" marginTop="10px">
                                {multipleFiles && handleGoBackFormEditing && (
                                    <Box marginRight="10px">
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => {
                                                const { album, author, name } =
                                                    songCreateFormik.values;
                                                handleGoBackFormEditing({
                                                    author,
                                                    name,
                                                    uploaded: false,
                                                    album,
                                                    image_url: songImage,
                                                    file: fileInfo?.file,
                                                });
                                            }}
                                        >
                                            Назад
                                        </Button>
                                    </Box>
                                )}

                                <Box>
                                    <LoadingButton
                                        loading={isLoading}
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Сохранить
                                    </LoadingButton>
                                </Box>
                            </Stack>
                        </form>
                    </Stack>
                </Stack>
            </>
        );
    }
);

export default SongUploadForm;
