import { Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { SxProps, Theme } from "@mui/material";

interface GenreCategoryItemProps {
    title?: string;
    sx?: SxProps<Theme> | undefined;
}

const GenreCategoryItem: React.FC<GenreCategoryItemProps> = ({ sx, title }) => {
    return (
        <Stack
            flexDirection="row"
            position="relative"
            width="400px"
            height="75px"
            sx={[
                {
                    cursor: "pointer",
                    ":hover .categoryListItemHidden": {
                        opacity: 1,
                        display: "flex",
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            alignItems="center"
        >
            <Stack
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
                border="3px solid orange"
                sx={{
                    opacity: 0,
                    transition: "0.4s",
                }}
                className="categoryListItemHidden"
            />

            <Stack
                flexDirection="row"
                width="100%"
                height="60px"
                alignItems="center"
            >
                <Stack
                    position="relative"
                    // bgcolor="pink"
                    borderRadius="50%"
                    height="60px"
                    width="60px"
                    marginLeft="15px"
                    sx={{
                        background: "pink",
                        objectFit: "cover",
                    }}
                >
                    <Stack
                        position="absolute"
                        bgcolor="orange"
                        zIndex="2"
                        top="0"
                        left="0"
                        right="0"
                        bottom="0"
                        borderRadius="50%"
                        display="none"
                        className="categoryListItemHidden"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <PlayArrowIcon
                            htmlColor="black"
                            sx={{
                                fontSize: "25px",
                            }}
                        />
                    </Stack>
                </Stack>

                <Typography marginLeft="20px" noWrap>
                    Title
                </Typography>
            </Stack>
        </Stack>
    );
};

export default GenreCategoryItem;
