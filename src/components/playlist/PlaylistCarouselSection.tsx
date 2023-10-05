import { Stack, Typography, Divider } from "@mui/material";
import PlaylistCarousel from "./PlaylistCarousel";
import { PlaylistType } from "../../types";

interface PlaylistCarouselSectionProps {
  title: string;
  playlists: PlaylistType[];
}

const PlaylistCarouselSection: React.FC<PlaylistCarouselSectionProps> = ({
  title,
  playlists,
}) => {
  return (
    <>
      <Stack
        flexDirection="column"
        sx={{
          width: "100%",
          alignItems: "center",
        }}
        color="text.primary"
      >
        <Stack width="100%">
          <Typography
            variant="h4"
            sx={{
              marginBottom: "10px",
            }}
            noWrap
          >
            {title}
          </Typography>
          <Divider
            sx={{
              marginBottom: "25px",
            }}
          />

          <PlaylistCarousel playlists={playlists} />
        </Stack>
      </Stack>
    </>
  );
};

export default PlaylistCarouselSection;
