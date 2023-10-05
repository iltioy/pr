import { Stack } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { useState } from "react";
import { observer } from "mobx-react-lite";

interface SongFileInputWindowProps {
  handleAddFile: (files: FileList) => void;
}

const SongFileInputWindow: React.FC<SongFileInputWindowProps> = observer(
  ({ handleAddFile }) => {
    const [drag, setDrag] = useState(false);

    const dragStartHandler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDrag(true);
    };

    const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDrag(false);
    };

    const onDropHandler = (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDrag(false);

      handleAddFile(e.dataTransfer.files);
    };
    return (
      <>
        <label htmlFor="audioFileInput" onClick={(e) => e.stopPropagation()}>
          <Stack
            bgcolor="custom.bg.main"
            sx={{
              height: "400px",
              width: "550px",
              border: `2px ${drag ? "dashed" : "solid"}`,
              cursor: "pointer",
            }}
            borderRadius="10px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            onClick={(e) => e.stopPropagation()}
            onDragStart={(e) => dragStartHandler(e)}
            onDragLeave={(e) => dragLeaveHandler(e)}
            onDragOver={(e) => dragStartHandler(e)}
            onDrop={(e) => onDropHandler(e)}
          >
            <FileUploadIcon
              sx={{
                fontSize: {
                  md: "125px",
                },
              }}
            />
          </Stack>
        </label>

        <input
          style={{ display: "none" }}
          type="file"
          id="audioFileInput"
          accept="audio/*"
          multiple
          onClick={(e) => e.stopPropagation()}
          onChange={(e) => {
            if (!e.target.files) return;

            handleAddFile(e.target.files);
          }}
        />
      </>
    );
  }
);

export default SongFileInputWindow;
