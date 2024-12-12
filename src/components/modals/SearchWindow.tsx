import { Button, Stack, InputBase } from "@mui/material";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import SongRecord from "../SongRecord";
import axios from "axios";
import { Playlist, Song } from "../../types";
import SearchIcon from "@mui/icons-material/Search";
import songsStore from "../../stores/songs-store";
import { observer } from "mobx-react-lite";

interface SearchWindowProps {
    setIsSearchOpened: React.Dispatch<React.SetStateAction<boolean>>;
}

enum SearchStatus {
    CATALOG = "КАТАЛОГ",
    MY_MUSIC = "МОЯ МУЗЫКА",
}

let searchedPages: number[] = [];
let page: number = 0;
let isLimitReached: boolean = false;

let mockPlaylist: Playlist = {
    id: 0,
    image_url: "",
    name: "mock",
    order: 0,
    owner: {},
    songs: [],
};

const SearchWindow: React.FC<SearchWindowProps> = observer(
    ({ setIsSearchOpened }) => {
        useEffect(() => {
            document.body.style.overflow = "hidden";

            return () => {
                document.body.style.overflow = "auto";
            };
        }, []);

        const [status, setStatus] = useState<SearchStatus>(
            SearchStatus.CATALOG
        );
        const [searchValue, setSearchValue] = useState("");
        const [songs, setSongs] = useState<Song[]>([]);
        const [delay, setDelay] = useState(1000);
        const [songContext, setSongContext] = useState(mockPlaylist);

        const { ref, inView } = useInView();

        const fetchSongs = async () => {
            try {
                if (searchedPages.includes(page)) return;
                const res = await axios.get(
                    `/songs/search?query=${searchValue}&page=${page}`
                );

                const data: Song[] = res.data;

                setSongs((prevData) => {
                    return [...prevData, ...data];
                });
                searchedPages.push(page);

                if (data?.length === 0) {
                    isLimitReached = true;
                }

                createSongCotext();
            } catch (error) {
                console.log(error);
            }
        };

        const searchAddedSongs = () => {
            setSongs(songsStore.searchSongs(searchValue));
            createSongCotext();
            isLimitReached = true;
        };

        const changePage = () => {
            page++;
            if (status === SearchStatus.CATALOG) {
                fetchSongs();
            } else if (status === SearchStatus.MY_MUSIC) {
                searchAddedSongs();
            }
        };

        const createSongCotext = () => {
            setSongContext((prevState) => {
                let songs: Song[] = [];
                songs.forEach((song) => songs.push(song));
                return {
                    ...prevState,
                    songs: songs,
                };
            });
        };

        useEffect(() => {
            const timeoutId = setTimeout(() => {
                searchedPages = [];
                page = 0;
                isLimitReached = false;
                setSongs([]);
                changePage();
            }, delay);

            return () => {
                clearTimeout(timeoutId);
                searchedPages = [];
                page = 0;
                isLimitReached = false;
            };
        }, [searchValue, status, delay]);

        useEffect(() => {
            if (inView && songs.length > 0 && !isLimitReached) {
                changePage();
            }
        }, [inView, songs]);

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
                    zIndex={10}
                    overflow="hidden"
                    sx={{
                        opacity: 0.7,
                    }}
                />
                <Stack
                    position="absolute"
                    width="100%"
                    height="100%"
                    zIndex={12}
                    alignItems="center"
                    sx={{
                        opacity: "1",
                    }}
                    overflow="auto"
                    onClick={() => {
                        setIsSearchOpened(false);
                    }}
                    className="searchWindowScroll"
                >
                    <Stack width="80%" marginTop="12px">
                        <Stack
                            flexDirection="row"
                            alignItems="center"
                            p="4px"
                            borderBottom={{
                                sm: `1px solid #ffffff`,
                                xs: "none",
                                zIndex: 11,
                            }}
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <SearchIcon htmlColor={"#ffffff"} />
                            <InputBase
                                sx={{
                                    paddingLeft: "5px",
                                    width: "100%",
                                    display: {
                                        xs: "block",
                                        sm: "block",
                                    },
                                    color: "#ffffff",
                                }}
                                placeholder="Посик..."
                                autoFocus
                                value={searchValue}
                                onChange={(e) => {
                                    setSearchValue(e.target.value);
                                }}
                            />
                        </Stack>
                        <Stack
                            marginTop="60px"
                            flexDirection="row"
                            color="white"
                            width="100%"
                            justifyContent="center"
                            gap="50px"
                        >
                            <Button
                                color={
                                    status === SearchStatus.CATALOG
                                        ? "primary"
                                        : "inherit"
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDelay(1000);
                                    setStatus(SearchStatus.CATALOG);
                                }}
                            >
                                Каталог
                            </Button>
                            <Button
                                color={
                                    status === SearchStatus.MY_MUSIC
                                        ? "primary"
                                        : "inherit"
                                }
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setDelay(200);
                                    setStatus(SearchStatus.MY_MUSIC);
                                }}
                            >
                                Моя музыка
                            </Button>
                        </Stack>
                    </Stack>

                    <Stack
                        sx={{
                            width: {
                                xs: "95%",
                                sm: "70%",
                            },
                        }}
                        color="white"
                        marginTop="20px"
                        onClick={(e) => {
                            e.stopPropagation();
                        }}
                        paddingBottom="50px"
                    >
                        {songs?.map((song: Song, index: number) => {
                            return (
                                <SongRecord
                                    key={index}
                                    song={song}
                                    sx={{
                                        backgroundColor: "rgba(0,0,0,0.5)",
                                        border: "none",
                                    }}
                                    songContext={songContext}
                                    search
                                />
                            );
                        })}
                        <span ref={ref}></span>

                        {/* <Button onClick={() => fetchSongs()}>fetchSongs</Button> */}
                        {/* <Button
            onClick={() => {
              changePage();
            }}
          >
            more
          </Button> */}
                    </Stack>
                </Stack>
            </>
        );
    }
);

export default SearchWindow;
