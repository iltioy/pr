import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

interface SongProgressProps {
  setProgress: React.Dispatch<React.SetStateAction<number>>;
  progress: number;
  audioRef?: HTMLAudioElement | null;
  handleSetProgress: (newProgress: number) => void;
}

const SongProgress: React.FC<SongProgressProps> = ({
  progress,
  setProgress,
  audioRef,
  handleSetProgress,
}) => {
  const progressRef = useRef<HTMLDivElement | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    // console.log(e.clientX);
    // console.log(progressRef.current?.offsetLeft);
    // console.log(progressRef.current?.offsetWidth);
    if (!progressRef.current) return;
    let newProgress =
      (e.clientX /
        (progressRef.current?.offsetWidth - progressRef.current?.offsetLeft)) *
      100;
    // setProgress(newProgress);
    handleSetProgress(newProgress);
  };

  return (
    <Stack
      position="absolute"
      left="0"
      right="0"
      top="-7px"
      height="7px"
      // bgcolor="#EBEBEB"
      bgcolor="rgba(235,235,235,0.7)"
      sx={{
        cursor: "pointer",
      }}
      component="div"
      onClick={(e) => handleClick(e)}
      ref={progressRef}
    >
      <Stack
        bgcolor="orange"
        width={`${progress ? progress : 0}%`}
        height="100%"
      ></Stack>
    </Stack>
  );
};

export default SongProgress;
