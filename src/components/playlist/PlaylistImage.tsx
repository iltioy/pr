import { Stack } from "@mui/material";
import React from "react";
import { ImageType, PlaylistType } from "../../types";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { observer } from "mobx-react-lite";

interface PlaylistImageProps {
  playlist?: PlaylistType;
  isEdit?: boolean;
  playlistImage?: ImageType;
  setFile?: React.Dispatch<React.SetStateAction<File | null>>;
  handleUploadPlaylistImage?: (file: File) => Promise<void>;
}

const PlaylistImage: React.FC<PlaylistImageProps> = observer(
  ({ playlist, isEdit, playlistImage, setFile, handleUploadPlaylistImage }) => {
    return (
      <Stack
        sx={{
          height: {
            xs: "125px",
            md: "200px",
          },
          width: {
            xs: "125px",
            md: "200px",
          },
          borderRadius: "5px",
          objectFit: "cover",
          ":hover .hoverPlaylistImage": {
            display: "flex",
          },
        }}
        position="relative"
      >
        {isEdit && (
          <label htmlFor="playlistImageInput">
            <Stack
              className="hoverPlaylistImage"
              position="absolute"
              top="0"
              left="0"
              right="0"
              bottom="0"
              bgcolor="black"
              display="none"
              sx={{
                opacity: 0.7,
                cursor: "pointer",
              }}
              justifyContent="center"
              alignItems="center"
            >
              <FileUploadIcon
                sx={{
                  fontSize: {
                    xs: "50px",
                    md: "85px",
                  },
                  color: "white",
                }}
              />

              <input
                type="file"
                id="playlistImageInput"
                style={{ display: "none" }}
                accept="image/png, image/jpeg, image/jpg"
                onChange={(e) => {
                  if (handleUploadPlaylistImage && e.target.files) {
                    handleUploadPlaylistImage(e.target.files[0]);
                  }
                }}
              />
            </Stack>
          </label>
        )}

        <img
          src={playlist?.image.image_url || playlistImage?.image_url}
          alt=""
          style={{ width: "200px", height: "200px", objectFit: "cover" }}
        />
      </Stack>
    );
  }
);

export default PlaylistImage;
