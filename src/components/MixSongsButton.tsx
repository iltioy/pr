import { Stack, Box } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import useHold from "../hooks/useHold";

interface PressableButtonProps {
  icon?: string;
  text: string;
}

const PressableButton: React.FC<PressableButtonProps> = ({ text, icon }) => {
  const { ref: boxRef, scale: buttonScale } = useHold({ size: 0.9 });

  return (
    <Box
      sx={{
        cursor: "pointer",
        background: "#F78361",
        display: "inline-block",
        color: "white",
        borderRadius: "20px",
        transform: `scale(${buttonScale})`,
        transition: "0.3s",
        padding: {
          xs: "5px",
          md: "10px",
        },
      }}
      ref={boxRef}
    >
      <Stack flexDirection="row" justifyContent="center" alignItems="center">
        {icon === "play" ? (
          <PlayArrowIcon
            sx={{
              fontSize: {
                xs: "20px",
                md: "25px",
              },
            }}
          />
        ) : null}

        <Box
          component="span"
          sx={{
            marginLeft: "3px",
            fontSize: {
              xs: "10px",
              md: "16px",
            },
          }}
        >
          {text}
        </Box>
      </Stack>
    </Box>
  );
};

export default PressableButton;
