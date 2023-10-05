import { useState, useEffect } from "react";
import { Stack, Typography, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareSharpIcon from "@mui/icons-material/ShareSharp";
import BlockSharpIcon from "@mui/icons-material/BlockSharp";
import PauseIcon from "@mui/icons-material/Pause";
import SongProgress from "./SongProgress";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import { toggleLikeSong } from "../../queries/songs";
// import useSound from "use-sound";

const audio = new Audio();

const SongTrack = observer(() => {
  // const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState<number>(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  const { songsStore } = useStores();
  const { current_song } = songsStore;

  // const [play, { sound, duration }] = useSound(
  //   songsStore.current_song?.url || ""
  // );

  const handlePlayMusic = () => {
    if (audio.paused && !isAudioPlaying) {
      audio.play().catch((error) => console.log(error));
    }
    setIsAudioPlaying(true);
  };

  const handlePauseMusic = () => {
    if (!audio.paused && isAudioPlaying) {
      audio.pause();
    }
    setIsAudioPlaying(false);
  };

  const handleSetProgress = (newProgress: number) => {
    if (audio) {
      let duration = audio.duration;

      let timeToSet = (duration / 100) * newProgress;
      if (isNaN(duration)) return;
      audio.currentTime = timeToSet;

      setProgress(newProgress);
    }
  };

  useEffect(() => {
    audio.ontimeupdate = () => {
      if (audio && isAudioPlaying) {
        let duration = audio.duration;
        let currentTime = audio.currentTime;

        let timeToSet = (currentTime / duration) * 100;
        setProgress(timeToSet);
      }
    };

    audio.oncanplay = () => {
      console.log("canplay!");
      audio.play().catch((error) => console.log(error));
    };

    audio.onplaying = () => {
      setIsAudioPlaying(true);
    };

    audio.onpause = () => {
      setIsAudioPlaying(false);
    };
  }, [isAudioPlaying, audio]);

  useEffect(() => {
    setProgress(0);
  }, [current_song]);

  useEffect(() => {
    if (current_song && current_song.url) {
      audio.src = current_song.url;
    }
  }, [current_song?.url]);

  return (
    <>
      <Stack
        position="fixed"
        bottom="0"
        color="text.primary"
        bgcolor="custom.bg.main"
        borderTop="1px solid grey"
        width="100%"
        zIndex={201}
        height="70px"
        alignItems="center"
        className="noselect"
      >
        <SongProgress
          progress={progress}
          setProgress={setProgress}
          handleSetProgress={handleSetProgress}
        />
        <Stack
          sx={{
            width: {
              xs: "95%",
              sm: "80%",
            },
            height: "100%",
          }}
          flexDirection="row"
        >
          <Stack
            flexDirection="row"
            alignItems="center"
            height="100%"
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            {isAudioPlaying ? (
              <PauseIcon
                sx={{
                  fontSize: "40px",
                  cursor: "pointer",
                  color: "#A1A1A2",
                  ":hover": {
                    color: "#424242",
                  },
                }}
                onClick={() => handlePauseMusic()}
              />
            ) : (
              <PlayArrowIcon
                sx={{
                  fontSize: "40px",
                  cursor: "pointer",
                  color: "#A1A1A2",
                  ":hover": {
                    color: "#424242",
                  },
                }}
                onClick={() => handlePlayMusic()}
              />
            )}

            <SkipNextIcon
              sx={{
                fontSize: "40px",
                marginLeft: "17px",
                cursor: "pointer",
                color: "#A1A1A2",
                ":hover": {
                  color: "#424242",
                },
              }}
              onClick={() => songsStore.setCurrentSongToNextInQueue()}
            />
          </Stack>

          <Stack
            flexDirection="row"
            height="100%"
            alignItems="center"
            sx={{
              marginLeft: {
                xs: "10px",
                sm: "50px",
              },
            }}
          >
            <img
              src={current_song?.image.image_url}
              alt=""
              style={{
                height: "53px",
                width: "53px",
                objectFit: "fill",
                borderRadius: "7px",
                cursor: "pointer",
              }}
            />
            <Stack
              height="53px"
              flexDirection="column"
              marginLeft="20px"
              justifyContent="center"
            >
              <Typography
                noWrap
                fontWeight="700"
                sx={{
                  ":hover": {
                    color: "#FC6064",
                  },
                  cursor: "pointer",
                }}
              >
                {current_song?.name}
              </Typography>
              <Typography
                noWrap
                sx={{
                  ":hover": {
                    color: "#FC6064",
                  },
                  cursor: "pointer",
                }}
              >
                {current_song?.author}
              </Typography>
            </Stack>
          </Stack>

          <Stack
            flexDirection="row"
            height="100%"
            alignItems="center"
            gap="15px"
            marginLeft="30px"
            sx={{
              cursor: "pointer",
              display: {
                xs: "none",
                sm: "flex",
              },
            }}
          >
            {current_song &&
            songsStore.liked_songs_ids.includes(current_song.id) ? (
              <IconButton
                onClick={() => {
                  if (!songsStore.current_song) return;
                  toggleLikeSong(songsStore.current_song?.id);
                }}
              >
                <FavoriteIcon
                  sx={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#A1A1A2",
                    ":hover": {
                      color: "#424242",
                    },
                  }}
                />
              </IconButton>
            ) : (
              <IconButton
                onClick={() => {
                  if (!songsStore.current_song) return;
                  toggleLikeSong(songsStore.current_song?.id);
                }}
              >
                <FavoriteBorderIcon
                  sx={{
                    fontSize: "24px",
                    cursor: "pointer",
                    color: "#A1A1A2",
                    ":hover": {
                      color: "#424242",
                    },
                  }}
                />
              </IconButton>
            )}

            <IconButton>
              <ShareSharpIcon
                sx={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#A1A1A2",
                  ":hover": {
                    color: "#424242",
                  },
                }}
              />
            </IconButton>
            <IconButton>
              <BlockSharpIcon
                sx={{
                  fontSize: "24px",
                  cursor: "pointer",
                  color: "#A1A1A2",
                  ":hover": {
                    color: "#424242",
                  },
                }}
              />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
});

export default SongTrack;
