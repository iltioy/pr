import { Grid, Stack, Skeleton } from "@mui/material";
import { Song, Playlist } from "../../types";
import SongRecord from "../../components/SongRecord";
import { observer } from "mobx-react-lite";
import AddSongItem from "../../components/playlist/AddSongItem";
import styled from "@emotion/styled";
import {
    DragDropContext,
    Droppable,
    Draggable,
    DropResult,
} from "react-beautiful-dnd";
import { useEffect, useState } from "react";
import PlaylistQueries from "../../queries/playlists";
import { useStores } from "../../root-store-context";

interface PlaylistSongsProps {
    data: Song[];
    orderedSongs?: Song[];
    isLoading?: boolean;
    isEdit?: boolean;
    playlist?: Playlist;
    isSongPage?: boolean;
}

interface SongListProps {
    data: Song[];
    playlist?: Playlist;
    isEdit?: boolean;
}

const PlaylistWrapper = styled.div`
    margin-bottom: 5px;
`;

const SongList = observer(({ data, playlist, isEdit }: SongListProps) => {
    const [state, setState] = useState<Song[]>([]);

    useEffect(() => {
        if (!data) return;
        setState(data);
    }, [data]);

    const { userStore } = useStores();

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newSongs = reorder(
            state,
            result.source.index,
            result.destination.index
        );

        if (!playlist) return;
        PlaylistQueries.reorderPlaylist(playlist.id, newSongs);
        setState(newSongs);
    }

    const reorder = (list: Song[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    if (playlist?.owner.id !== userStore.user.id) {
        return (
            <>
                {data.map((song: Song, index: number) => {
                    return (
                        <SongRecord
                            songContext={playlist}
                            song={song}
                            isEdit={isEdit}
                            key={index}
                            isAlbum={playlist?.is_album}
                        />
                    );
                })}
            </>
        );
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" direction="vertical">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {state.map((song: Song, index: number) => {
                            return (
                                <Draggable
                                    draggableId={String(song.id)}
                                    index={index}
                                    key={song.id}
                                >
                                    {(provided) => (
                                        <PlaylistWrapper
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            <SongRecord
                                                songContext={playlist}
                                                song={song}
                                                key={index}
                                                isEdit={isEdit}
                                                isAlbum={playlist?.is_album}
                                            />
                                        </PlaylistWrapper>
                                    )}
                                </Draggable>
                            );
                        })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
});

const PlaylistSongs = observer(
    ({ data, isLoading, isEdit, playlist, isSongPage }: PlaylistSongsProps) => {
        return (
            <Stack
                sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    marginTop: "50px",
                }}
                color="text.primary"
            >
                <Stack
                    sx={{
                        width: {
                            xs: "100%",
                            sm: "80%",
                        },
                        paddingBottom: "50px",
                    }}
                >
                    <Grid
                        container
                        display={{ xs: "none", md: "flex" }}
                        marginBottom="10px"
                        sx={{
                            paddingLeft: isLoading ? "" : "84px",
                        }}
                    >
                        {isLoading ? (
                            <Grid item xs={12}>
                                <Skeleton />
                            </Grid>
                        ) : data?.length > 0 ? (
                            <>
                                <Grid item xs={12} md={6}>
                                    Название
                                </Grid>
                                {!playlist?.is_album && (
                                    <Grid
                                        item
                                        md="auto"
                                        display={{ xs: "none", md: "block" }}
                                    >
                                        Альбом
                                    </Grid>
                                )}
                            </>
                        ) : null}
                    </Grid>

                    {isEdit && playlist?.is_album && (
                        <AddSongItem playlist={playlist} />
                    )}

                    {isLoading ? (
                        Array.from(Array(10).keys()).map((el, index) => {
                            return (
                                <Skeleton
                                    key={index}
                                    component="div"
                                    variant="rounded"
                                    height="74px"
                                    width="100%"
                                    sx={{
                                        marginBottom: "5px",
                                    }}
                                />
                            );
                        })
                    ) : isSongPage && data && data[0] ? (
                        <SongRecord
                            isEdit={isEdit}
                            songContext={playlist}
                            song={data[0]}
                            isAlbum={playlist?.is_album}
                        />
                    ) : (
                        <SongList
                            isEdit={isEdit}
                            data={data}
                            playlist={playlist}
                        />
                    )}
                </Stack>
            </Stack>
        );
    }
);

export default PlaylistSongs;
