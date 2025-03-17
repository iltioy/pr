import { Box, Button, Stack, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Category, Chart, Playlist, Song } from "../../../types";
import axios from "axios";
import { observer } from "mobx-react-lite";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styled from "@emotion/styled";
import ChartQueries from "../../../queries/charts";
import {
    CAHRT_GLOBAL_ALBUMS_NAME,
    CAHRT_GLOBAL_TRENDS_NAME,
} from "../../../constants/admin";
import { useStores } from "../../../root-store-context";
import { useNavigate } from "react-router";
import PlaylistEditItem from "./PlaylistIEdittem";
import CategoriesQueries from "../../../queries/categories";

const Wrapper = styled.div`
    margin-bottom: 5px;
`;

const AlbumsEditPage = observer(() => {
    const [playlists, setPlaylists] = useState<Playlist[]>([]);
    const [currentPlaylistId, setCurrentPlaylistId] = useState("");
    const [category, setCategory] = useState<Category | null>(null);

    const { modalsStore } = useStores();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleAddPlaylist = async () => {
        if (!category) return;
        await CategoriesQueries.addPlaylistToCategory(
            category?.id,
            currentPlaylistId
        );

        queryClient.invalidateQueries(CAHRT_GLOBAL_ALBUMS_NAME);
    };

    const onDelete = async (playlistId: number) => {
        if (!category) return;
        await CategoriesQueries.removePlaylistFromCategory(
            category?.id,
            playlistId
        );

        queryClient.invalidateQueries(CAHRT_GLOBAL_ALBUMS_NAME);
    };

    useQuery(
        CAHRT_GLOBAL_ALBUMS_NAME,
        () => axios.get(`/chart/${CAHRT_GLOBAL_ALBUMS_NAME}`),
        {
            select: (data) => {
                return data.data;
            },
            onSuccess: (data: Chart) => {
                if (!data || !data.categories) return;
                if (data.categories && data.categories.length > 0) {
                    setCategory(data.categories[0]);
                    setPlaylists(data.categories[0].playlists);
                }
            },
            onError: async () => {
                const newChart: Chart = await ChartQueries.createChart(
                    CAHRT_GLOBAL_ALBUMS_NAME
                );
                if (!newChart || !newChart.categories) return;
                setCategory(newChart.categories[0]);
                setPlaylists(newChart.categories[0].playlists);
            },
        }
    );

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        if (!category) return;

        const newPlaylists = reorder(
            playlists,
            result.source.index,
            result.destination.index
        );

        CategoriesQueries.reorderCategory(category.id, newPlaylists);
        setPlaylists(newPlaylists);
    }

    const reorder = (
        list: Playlist[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <Stack>
            <AdminPageHeader
                title="Чарты: Альбомы"
                defaultValue={CAHRT_GLOBAL_TRENDS_NAME}
            />
            <Stack
                overflow="auto"
                maxHeight="600px"
                className="noscroll"
                marginY="10px"
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list" direction="vertical">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {playlists.map(
                                    (playlist: Playlist, index: number) => {
                                        return (
                                            <Draggable
                                                draggableId={String(
                                                    playlist.id
                                                )}
                                                index={index}
                                                key={playlist.id}
                                            >
                                                {(provided) => (
                                                    <Wrapper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <PlaylistEditItem
                                                            playlist={playlist}
                                                            onDelete={onDelete}
                                                            key={playlist.id}
                                                        />
                                                    </Wrapper>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Stack flexDirection="row" gap="10px" marginBottom="10px">
                    <TextField
                        placeholder="id"
                        id="playlistId"
                        type="text"
                        value={currentPlaylistId}
                        onChange={(e) => setCurrentPlaylistId(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddPlaylist}
                    >
                        <AddIcon />
                    </Button>
                </Stack>
            </Stack>
            <Box>
                <Button onClick={() => navigate("/radio")}>На главную</Button>
            </Box>
        </Stack>
    );
});

export default AlbumsEditPage;
