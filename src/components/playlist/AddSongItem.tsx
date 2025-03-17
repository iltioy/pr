import { Stack } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useStores } from "../../root-store-context";
import AddIcon from "@mui/icons-material/Add";
import { Playlist } from "../../types";

interface AddSongItemProps {
    playlist?: Playlist;
}

const AddSongItem: React.FC<AddSongItemProps> = observer(({ playlist }) => {
    const { modalsStore } = useStores();

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
                modalsStore.toggleSongUploadModal(playlist);
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
