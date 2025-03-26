import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { QueryClient, useQuery, useQueryClient } from "react-query";
import { useState } from "react";
import { Playlist, Song } from "../../../types";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useCreateCategoryForChart } from "../../../mutations/categories";
import PlaylistQueries from "../../../queries/playlists";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styled from "@emotion/styled";
import ChartQueries from "../../../queries/charts";
import { CAHRT_GLOBAL_TRENDS_NAME } from "../../../constants/admin";
import SongItem from "../../../components/admin/SongItem";
import { useStores } from "../../../root-store-context";
import SongRecord from "../../../components/SongRecord";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
    margin-bottom: 5px;
`;

const TrendsEditPage = observer(() => {
    const [playlist, setPlaylist] = useState<Playlist>();
    const [songs, setSongs] = useState<Song[]>([]);
    const [currentSongId, setCurrentSongId] = useState("");

    const { modalsStore } = useStores();

    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const handleAddSong = async () => {
        if (!playlist) return;
        await PlaylistQueries.addSongToPlaylist(playlist.id, currentSongId);
        queryClient.invalidateQueries(CAHRT_GLOBAL_TRENDS_NAME);
    };

    useQuery(
        CAHRT_GLOBAL_TRENDS_NAME,
        () => axios.get(`/chart/${CAHRT_GLOBAL_TRENDS_NAME}`),
        {
            select: (data) => {
                return data.data;
            },
            onSuccess: (data) => {
                if (
                    !data ||
                    !data.categories ||
                    !data.categories[0] ||
                    !data.categories[0].playlists ||
                    !data.categories[0].playlists[0]
                )
                    return;
                setPlaylist(data.categories[0].playlists[0]);
                setSongs(data.categories[0].playlists[0].songs);
            },
            onError: async () => {
                const newChart = await ChartQueries.createChart(
                    CAHRT_GLOBAL_TRENDS_NAME
                );
                if (
                    !newChart ||
                    !newChart.categories ||
                    !newChart.categories[0] ||
                    !newChart.categories[0].playlists ||
                    !newChart.categories[0].playlists[0]
                )
                    return;

                setPlaylist(newChart.categories[0].playlists[0]);
                setSongs(newChart.categories[0].playlists[0].songs);
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

        if (!playlist) return;

        const newSongs = reorder(
            songs,
            result.source.index,
            result.destination.index
        );

        PlaylistQueries.reorderPlaylist(playlist.id, newSongs);
        setSongs(newSongs);
    }

    const reorder = (list: Song[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <Stack>
            <AdminPageHeader
                title="Чарты: Популярные песни"
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
                                {songs.map((song: Song, index: number) => {
                                    return (
                                        <Draggable
                                            draggableId={String(song.id)}
                                            index={index}
                                            key={song.id}
                                        >
                                            {(provided) => (
                                                <Wrapper
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                >
                                                    <SongRecord
                                                        song={song}
                                                        isEdit
                                                        songContext={playlist}
                                                        invalidate={
                                                            CAHRT_GLOBAL_TRENDS_NAME
                                                        }
                                                        key={song.id}
                                                    />
                                                </Wrapper>
                                            )}
                                        </Draggable>
                                    );
                                })}
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
                        value={currentSongId}
                        onChange={(e) => setCurrentSongId(e.target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSong}
                    >
                        <AddIcon />
                    </Button>

                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            playlist &&
                            modalsStore.toggleSongUploadModal(playlist)
                        }
                    >
                        <FileUploadIcon />
                    </Button>
                </Stack>
            </Stack>
            <Box>
                <Button onClick={() => navigate("/radio")}>На главную</Button>
            </Box>
        </Stack>
    );
});

export default TrendsEditPage;
