import { Stack, TextField, FormLabel, Box, Button } from "@mui/material";
import { observer } from "mobx-react-lite";

import { playlists } from "../../faker";
import PlaylistTableItem from "../../components/admin/PlaylistTableItem";
import CreatePlaylistTableItem from "../../components/admin/CreatePlaylistTableItem";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationModal from "../../components/modals/ConfirmationModal";
import { useState } from "react";
import CategoriesQueries from "../../queries/categories";
import { useMutation } from "react-query";
import { useSnackbar } from "notistack";
import { Category as CategorType } from "../../types";

interface EditCategoriesProps {
    category: CategorType;
}

const EditCategories = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const categoryId = 1;

    const { enqueueSnackbar } = useSnackbar();

    // const {mutate: createCategory} = useMutation()

    const { mutate: deleteCategory } = useMutation(
        () => CategoriesQueries.deleteCategory(categoryId),
        {
            onSuccess: () => {
                enqueueSnackbar("Успешно удалено!", {
                    variant: "success",
                    autoHideDuration: 3000,
                });
            },
        }
    );

    return (
        <Stack height="100%" marginTop="50px">
            <Stack flexDirection="row" gap="25px" marginBottom="10px">
                <Stack>
                    <FormLabel
                        sx={{
                            marginBottom: "5px",
                        }}
                        htmlFor="categoryName"
                    >
                        Название:
                    </FormLabel>
                    <Box>
                        <TextField
                            placeholder=""
                            id="categoryName"
                            name="categoryName"
                            type="text"
                            variant="outlined"
                        />
                    </Box>
                </Stack>

                <Stack>
                    <FormLabel
                        sx={{
                            marginBottom: "5px",
                        }}
                        id="playlistId"
                    >
                        Добавить плейлист
                    </FormLabel>

                    <Stack flexDirection="row" gap="10px" marginBottom="10px">
                        <TextField
                            placeholder="id"
                            id="playlistId"
                            type="text"
                        />
                        <Button variant="contained" color="primary">
                            <AddIcon />
                        </Button>
                    </Stack>
                </Stack>
            </Stack>

            <FormLabel htmlFor="playlistsById">Плейлисты:</FormLabel>

            <Box>
                <Stack
                    height="200px"
                    overflow="auto"
                    className="noScroll"
                    marginTop="4px"
                    maxWidth="90%"
                >
                    {playlists.map((playlist) => {
                        return (
                            <Box>
                                <PlaylistTableItem playlist={playlist} />
                            </Box>
                        );
                    })}
                    <Box>
                        <CreatePlaylistTableItem />
                    </Box>
                </Stack>
            </Box>

            <Stack flexDirection="row" gap="30px" marginTop="auto">
                <Button variant="contained" color="primary">
                    Coхранить
                </Button>

                <Button
                    onClick={() => setIsModalOpen(true)}
                    variant="contained"
                    color="error"
                >
                    Удалить
                </Button>
            </Stack>

            <ConfirmationModal
                cancelText="Отменить"
                confirmationAction={() => {
                    deleteCategory();
                    setIsModalOpen(false);
                }}
                confirmationText="Удалить"
                open={isModalOpen}
                setOpen={setIsModalOpen}
            />
        </Stack>
    );
});

export default EditCategories;
