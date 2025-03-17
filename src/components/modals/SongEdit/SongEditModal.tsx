import { Box, FormLabel, Stack, TextField, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { observer } from "mobx-react-lite";
import { useStores } from "../../../root-store-context";
import { Song } from "../../../types";
import FilesQueries from "../../../queries/files";
import SongsQueries from "../../../queries/songs";
import { useFormik } from "formik";
import { useState } from "react";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

export interface UpdateSongInfoProps {
    name: string;
    id: string | number;
    image_url: string;
}

const SongEditModal = observer(() => {
    const { modalsStore } = useStores();

    const song = modalsStore.songToEdit;
    const [isLoading, setIsLoading] = useState(false);
    const [songImage, setSongImage] = useState<string>(song.image_url);

    const queryClient = useQueryClient();

    const { enqueueSnackbar } = useSnackbar();

    const handleUploadSong = async (info: UpdateSongInfoProps) => {
        setIsLoading(true);
        try {
            await SongsQueries.updateSong(info);

            enqueueSnackbar("Аудио успешно обновлено!", {
                variant: "success",
                autoHideDuration: 3000,
            });

            if (modalsStore.invalidate) {
                queryClient.invalidateQueries(modalsStore.invalidate);
            }

            modalsStore.toggleSongUpdateModal();
        } catch (error) {
            enqueueSnackbar("Ошибка при обновлении аудио!", {
                variant: "error",
                autoHideDuration: 3000,
            });

            console.log(error);
        }
    };

    const songUpdateFormik = useFormik({
        initialValues: {
            name: song.name,
            author: song.author,
            album: song.album,
        },
        onSubmit: async (values) => {
            const info: UpdateSongInfoProps = {
                name: values.name,
                id: song.id,
                image_url: songImage,
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
                position="absolute"
                color="text.primary"
                // bottom="0px"
                width="100%"
                height="100%"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bgcolor="rgb(0,0,0)"
                zIndex={20}
                overflow="hidden"
                sx={{
                    opacity: 0.7,
                }}
            />

            <Stack
                position="absolute"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={21}
                onClick={() => modalsStore.toggleSongUpdateModal()}
                color="text.primary"
            >
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
                            onSubmit={songUpdateFormik.handleSubmit}
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
                                        src={`${songImage}`}
                                        style={{
                                            height: "75px",
                                            width: "75px",
                                            objectFit: "fill",
                                        }}
                                    />
                                </Stack>

                                <Stack flexDirection="column">
                                    <TextField
                                        sx={{
                                            width: "220px",
                                        }}
                                        name="name"
                                        variant="standard"
                                        placeholder="Название аудио"
                                        value={songUpdateFormik.values.name}
                                        onChange={songUpdateFormik.handleChange}
                                    />
                                    <Typography
                                        noWrap
                                        variant="body1"
                                        color="grey"
                                        marginTop="10px"
                                        maxWidth="200px"
                                    >
                                        {song.name}
                                    </Typography>
                                </Stack>
                            </Stack>

                            <Stack flexDirection="row" marginTop="10px">
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
            </Stack>
        </>
    );
});

export default SongEditModal;
