import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import AddIcon from "@mui/icons-material/Add";
import { useParams } from "react-router";

const AddSongItem = observer(() => {
  const { modalsStore } = useStores();
  const { playlistId } = useParams();

  return (
    <Stack
      bgcolor="custom.bg.secondary"
      sx={{
        border: "1px dashed grey",
        height: "74px",
        borderRadius: 1,
        marginBottom: "5px",
        ":last-child": {
          marginBottom: 0,
        },
        flexDirection: "row",
        alignItems: "center",
        cursor: "pointer",
        overflow: "hidden",
        width: "100%",
      }}
      justifyContent="center"
      alignItems="center"
      onClick={() => {
        const id = playlistId ? parseInt(playlistId) : undefined;
        modalsStore.toggleSongUploadModal(id);
      }}
    >
      <AddIcon
        sx={{
          fontSize: {
            md: "47px",
          },
        }}
      />
    </Stack>
  );
});

export default AddSongItem;
