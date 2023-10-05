import React from "react";
import { PlaylistType } from "../../types";
import Carousel, { ButtonGroupProps } from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import PlaylistItem from "./PlaylistItem";
import { styled } from "@mui/system";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { useTheme } from "@mui/material/styles";
import { Divider, Stack, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import CreatePlaylistItem from "./CreatePlaylistItem";
import { useStores } from "../../root-store-context";

const StyledArrowButton = styled("div")(
  ({
    theme: {
      palette: { mode },
    },
  }) => ({
    position: "absolute",
    cursor: "pointer",
    background: `${mode === "light" ? "white" : "rgba(0,0,0,0.7)"}`,
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "50%",
    top: "90px",
    transition: "0.2s",
    boxShadow: "0px 0px 2px 1px grey",
    ":hover": {
      background: `${mode === "light" ? "white" : "rgba(0,0,0,0.9)"}`,
      transform: "scale(1.2)",
    },
  })
);

interface PlaylistCarouselProps {
  playlists: PlaylistType[];
  title?: string;
  isOwnedPlaylists?: boolean;
}

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1501 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1500, min: 1070 },
    items: 4,
  },
  laptop: {
    breakpoint: { max: 1069, min: 800 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 799, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const ButtonGroup = observer(
  ({ next, previous, goToSlide, ...rest }: ButtonGroupProps) => {
    const { carouselState } = rest;
    const theme = useTheme();
    let themeMode = theme.palette.mode === "dark" ? "dark" : "light";
    return (
      <>
        <StyledArrowButton
          onClick={() => (previous ? previous() : null)}
          sx={{
            left: "10px",
          }}
        >
          <NavigateBeforeIcon
            htmlColor={`${themeMode === "light" ? "black" : "white"}`}
            sx={{ fontSize: "27px" }}
          />
        </StyledArrowButton>
        <StyledArrowButton
          onClick={() => (next ? next() : null)}
          sx={{
            right: "10px",
          }}
        >
          <NavigateNextIcon
            htmlColor={`${themeMode === "light" ? "black" : "white"}`}
            sx={{ fontSize: "27px" }}
          />
        </StyledArrowButton>
      </>
    );
  }
);

const PlaylistCarousel: React.FC<PlaylistCarouselProps> = observer(
  ({ playlists, title, isOwnedPlaylists }) => {
    const { username } = useParams();
    const { userStore } = useStores();

    return (
      <>
        <Stack width="100%" flexDirection="column" color="text.primary">
          {title && (
            <>
              <Typography variant="h4">{title}</Typography>
              <Divider />
            </>
          )}

          <Carousel
            responsive={responsive}
            infinite
            draggable={false}
            className="noselect "
            customButtonGroup={<ButtonGroup />}
            arrows={false}
          >
            {playlists[0] && <PlaylistItem playlist={playlists[0]} />}

            {isOwnedPlaylists && username === userStore.user.username && (
              <CreatePlaylistItem />
            )}

            {playlists.map((playlist, index) => {
              if (index === 0) return;
              return <PlaylistItem key={index} playlist={playlist} />;
            })}
          </Carousel>
        </Stack>
      </>
    );
  }
);

export default PlaylistCarousel;
