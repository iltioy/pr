import React from "react";
import { Stack, Typography, Box } from "@mui/material";
import { SxProps, Theme } from "@mui/material";

enum RadioSubPages {
    ALL = "ВСЁ",
    NEW = "ЖАНРЫ",
    TRENDS = "В ТРЕНДЕ",
}

enum Categories {
    GENRE = "ПО ЖАНРУ",
    MOOD = "ПОД НАСТРОЕНИЕ",
    WORK = "ПОД ЗАНЯТИЕ",
    EPOCH = "ПО ЭПОХЕ",
}

// const navItems = ["Всё", "Новинки", "В тренде", "Чарты", "Подкасты"];

interface navItem {
    label: string;
    enum: string;
}

interface RadioHeaderProps {
    setNavItem: React.Dispatch<React.SetStateAction<string>>;
    currentNavItem?: string;
    header?: string;
    navItems: navItem[];
    sx?: SxProps<Theme> | undefined;
}

const NavHeader: React.FC<RadioHeaderProps> = ({
    setNavItem,
    currentNavItem,
    header,
    navItems,
    sx,
}) => {
    return (
        <Stack
            sx={[
                {
                    width: "100%",
                    alignItems: "center",
                    position: "relative",
                    paddingTop: "50px",
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            color="text.primary"
        >
            <Stack
                sx={{
                    width: {
                        xs: "95%",
                        sm: "80%",
                    },
                }}
            >
                <Typography variant="h3" fontWeight="600" marginBottom="30px">
                    {header}
                </Typography>

                <Box>
                    <Stack
                        sx={{
                            borderBottom: "1px solid grey",
                            display: "inline-block",
                            minWidth: "50%",
                            width: {
                                xs: "100%",
                                md: "unset",
                            },
                        }}
                    >
                        <Stack flexDirection="row" gap="50px">
                            {navItems.map((navItem, index) => {
                                return (
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        sx={{
                                            ":hover": {
                                                color: "#FC6064",
                                            },
                                            cursor: "pointer",
                                            paddingBottom: "7px",
                                            color: `${
                                                currentNavItem ===
                                                    navItem.enum && "#FC6064"
                                            }`,
                                            // borderBottom: "3px solid orange"
                                        }}
                                        onClick={() => {
                                            setNavItem(navItem.enum);
                                        }}
                                        key={navItem.enum}
                                    >
                                        {navItem.label.toUpperCase()}
                                    </Typography>
                                );
                            })}
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Stack>
    );
};

export default NavHeader;
