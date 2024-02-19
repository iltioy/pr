import {
    Stack,
    TextField,
    FormLabel,
    Box,
    Button,
    Typography,
} from "@mui/material";
import { observer } from "mobx-react-lite";

import PlaylistTableItem from "../../../components/admin/PlaylistTableItem";
import CreatePlaylistTableItem from "../../../components/admin/CreatePlaylistTableItem";
import AddIcon from "@mui/icons-material/Add";
import ConfirmationModal from "../../../components/modals/ConfirmationModal";
import { useState } from "react";
import { useQuery } from "react-query";
import { OrderedPlaylist } from "../../../types";
import { useNavigate, useParams } from "react-router";
import {
    useDeleteCategory,
    useUpdateCategory,
} from "../../../mutations/categories";
import axios from "axios";
import CategoryQueries from "../../../queries/categories";
import { useSnackbar } from "notistack";
import { useQueryClient } from "react-query";

const EditCategory = observer(() => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [name, setName] = useState("");
    const [playlists, setPlaylists] = useState<OrderedPlaylist[]>([]);
    const [currentPlaylistId, setCurrentPlaylistId] = useState("");

    const queryClient = useQueryClient();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const { id } = useParams();

    const { mutate: updateCategory } = useUpdateCategory(id || -1, name);
    const { mutate: deleteCategory } = useDeleteCategory(id || -1);

    useQuery(["categories", id], () => axios.get(`/categories/${id}`), {
        select: (data) => {
            return data.data;
        },
        onSuccess: (data) => {
            if (!data) return;

            if (!name) {
                setName(data.name);
            }
            setPlaylists(data.playlists);
        },
        refetchOnWindowFocus: false,
    });

    const handleAddPlaylist = async () => {
        try {
            if (!id) return;
            await CategoryQueries.addPlaylistToCategory(id, currentPlaylistId);
            queryClient.invalidateQueries(["categories", id]);
        } catch (error) {
            enqueueSnackbar("Не удалось добавить плейлист", {
                variant: "error",
                autoHideDuration: 3000,
            });
        }
    };

    const handleRemovePlaylist = async (playlistId: number) => {
        try {
            if (!id) return;
            await CategoryQueries.removePlaylistFromCategory(id, playlistId);
            queryClient.invalidateQueries(["categories", id]);
        } catch (error) {
            enqueueSnackbar("Не удалось удалить плейлист", {
                variant: "error",
                autoHideDuration: 3000,
            });
        }
    };

    return (
        <Stack height="100%" marginTop="30px">
            <Typography variant="h4" marginBottom="10px">
                Edit Category
            </Typography>
            <hr />
            <Stack
                flexDirection="row"
                gap="25px"
                marginBottom="10px"
                marginTop="30px"
            >
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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={currentPlaylistId}
                            onChange={(e) =>
                                setCurrentPlaylistId(e.target.value)
                            }
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handleAddPlaylist()}
                        >
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
                                <PlaylistTableItem
                                    playlist={playlist.playlist}
                                    onDelete={handleRemovePlaylist}
                                />
                            </Box>
                        );
                    })}
                    <Box>
                        <CreatePlaylistTableItem />
                    </Box>
                </Stack>
            </Box>

            <Stack flexDirection="row" gap="30px" marginTop="auto">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => updateCategory()}
                >
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
                modalText="Удалить эту категорию?"
            />
        </Stack>
    );
});

export default EditCategory;
