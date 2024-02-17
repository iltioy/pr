import { Grid, Stack, Skeleton } from "@mui/material";
import { PlaylistType, SongType } from "../../types";
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
import { useState } from "react";

interface PlaylistSongsProps {
    data: SongType[];
    isLoading?: boolean;
    isEdit?: boolean;
    playlist?: PlaylistType;
}

interface SongListProps {
    data: SongType[];
    playlist?: PlaylistType;
}

const PlaylistWrapper = styled.div`
    margin-bottom: 5px;
`;

const SongList = ({ data, playlist }: SongListProps) => {
    const [state, setState] = useState(data);

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }
        console.log(result);
        if (result.destination.index === result.source.index) {
            return;
        }

        const newSongs = reorder(
            state,
            result.source.index,
            result.destination.index
        );

        setState(newSongs);
    }

    const reorder = (list: any[], startIndex: number, endIndex: number) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" direction="vertical">
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {data.map((song: SongType, index: number) => {
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
};

const PlaylistSongs = observer(
    ({ data, isLoading, isEdit, playlist }: PlaylistSongsProps) => {
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
                                <Grid
                                    item
                                    md="auto"
                                    display={{ xs: "none", md: "block" }}
                                >
                                    Альбом
                                </Grid>
                            </>
                        ) : null}
                    </Grid>

                    {isEdit && <AddSongItem />}

                    {/* {isLoading
                        ? Array.from(Array(10).keys()).map((el, index) => {
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
                        : data.map((song: SongType, index: number) => {
                              return (
                                  <SongRecord
                                      songContext={playlist}
                                      song={song}
                                      key={index}
                                  />
                              );
                          })} */}

                    <SongList data={data} playlist={playlist} />
                </Stack>
            </Stack>
        );
    }
);

export default PlaylistSongs;
