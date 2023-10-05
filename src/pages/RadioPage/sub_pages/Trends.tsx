import { Stack, Typography } from "@mui/material";
import { songs } from "../../../faker";
import SongRecord from "../../../components/SongRecord";

const Trends = () => {
  return (
    <Stack width="100%" alignItems="center">
      <Stack
        sx={{
          width: {
            xs: "95%",
            sm: "80%",
          },
        }}
        flexDirection="column"
      >
        <Typography variant="h4" marginTop="30px" marginBottom="5px">
          Чарт
        </Typography>
        <Typography variant="body1" color="#cccccc" marginBottom="30px">
          Треки, популярные прямо сейчас
        </Typography>

        <Stack flexDirection="column" width="100%">
          {songs.map((song) => {
            return (
              <SongRecord
                key={song.id}
                song={song}
                sx={{
                  marginBottom: "10px",
                }}
              />
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Trends;
