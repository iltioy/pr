import { Stack, Typography } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import NavHeader from "../NavHeader";
import { useState } from "react";
import GenreCategoryList from "../../../components/GenreCategoryList";
import GenreCategoryItem from "../../../components/genre/GenreCategoryItem";

interface GenreCircleProps {
    color: string;
}

enum Categories {
    GENRE = "ПО ЖАНРУ",
    MOOD = "ПОД НАСТРОЕНИЕ",
    WORK = "ПОД ЗАНЯТИЕ",
    EPOCH = "ПО ЭПОХЕ",
}

const navItems = [
    {
        label: "По жанру",
        enum: Categories.GENRE,
    },
    {
        label: "ПОД НАСТРОЕНИЕ",
        enum: Categories.MOOD,
    },
    {
        label: "ПОД ЗАНЯТИЕ",
        enum: Categories.WORK,
    },
    {
        label: "ПО ЭПОХЕ",
        enum: Categories.EPOCH,
    },
];

const GenreCircle: React.FC<GenreCircleProps> = ({ color }) => {
    return (
        <Stack
            height="300px"
            width="200px"
            flexDirection="column"
            alignItems="center"
        >
            <Stack
                width="200px"
                height="200px"
                borderRadius="50%"
                position="relative"
                zIndex={1}
                bgcolor={color}
                sx={{
                    cursor: "pointer",
                    ":hover .innerCircle": {
                        opacity: 1,
                    },
                }}
                marginBottom="20px"
            >
                <Stack
                    position="absolute"
                    top="-1px"
                    left="-1px"
                    right="-1px"
                    bottom="-1px"
                    bgcolor="rgba(0,0,0,0.9)"
                    borderRadius="50%"
                    zIndex={2}
                    className="innerCircle"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                        transition: "0.2s",
                        opacity: 0,
                    }}
                >
                    <Stack
                        sx={{
                            background: "orange",
                            width: "47px",
                            height: "47px",
                            display: "flex",
                            borderRadius: "50%",
                            justifyContent: "center",
                            alignItems: "center",
                            transition: "0.3s",
                        }}
                    >
                        <PlayArrowIcon
                            htmlColor="#333333"
                            sx={{
                                width: "25px",
                                height: "25px",
                                ":hover": {
                                    color: "#000000",
                                },
                            }}
                        />
                    </Stack>
                </Stack>
            </Stack>
            <Typography>Поп</Typography>
        </Stack>
    );
};

const GenresCircles = () => {
    return (
        <Stack
            width="100%"
            flexDirection="row"
            justifyContent="center"
            alignItems="center"
            gap="50px"
            paddingTop="75px"
        >
            <GenreCircle color="pink" />
            <GenreCircle color="red" />
            <GenreCircle color="orange" />
        </Stack>
    );
};

const GenresItems = () => {
    return (
        <Stack
            flexDirection="column"
            sx={{
                width: {
                    xs: "95%",
                    sm: "80%",
                },
                display: {
                    xs: "flex",
                    md: "none",
                },
                marginTop: "30px",
                gap: "20px",
            }}
        >
            <GenreCategoryItem sx={{ width: "100%" }} />
            <GenreCategoryItem sx={{ width: "100%" }} />
            <GenreCategoryItem sx={{ width: "100%" }} />
        </Stack>
    );
};

const Genres = () => {
    const [currentCategory, setCurrentCategory] = useState<string>(
        Categories.GENRE
    );

    return (
        <Stack width="100%" alignItems="center">
            <Stack
                flexDirection="column"
                sx={{
                    width: {
                        xs: "95%",
                        sm: "80%",
                    },
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                }}
                color="text.primary"
            >
                <GenresCircles />
            </Stack>

            <GenresItems />

            <NavHeader
                sx={{
                    paddingBottom: "50px",
                    paddingTop: "0",
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                }}
                navItems={navItems}
                setNavItem={setCurrentCategory}
                currentNavItem={currentCategory}
            />

            <GenreCategoryList
                sx={{
                    display: {
                        xs: "none",
                        md: "flex",
                    },
                }}
            />
        </Stack>
    );
};

export default Genres;
