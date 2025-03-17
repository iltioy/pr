import { Stack } from "@mui/material";
import RadioHeader from "./NavHeader";
import { useState } from "react";
import Radio from "./sub_pages/Radio";
import Trends from "./sub_pages/Trends";
import Navbar from "../../components/Navbar";
import Albums from "./sub_pages/Albums";

enum RadioSubPages {
    ALL = "ВСЁ",
    NEW = "АЛЬБОМЫ",
    TRENDS = "В ТРЕНДЕ",
}

const navItems = [
    {
        label: "Всё",
        enum: RadioSubPages.ALL,
    },
    {
        label: "Альбомы",
        enum: RadioSubPages.NEW,
    },
    {
        label: "В тренде",
        enum: RadioSubPages.TRENDS,
    },
];

const RadioPage = () => {
    const [currentSubPage, setCurrentSubPage] = useState<string>(
        RadioSubPages.ALL
    );

    return (
        <Stack
            height="100%"
            flexDirection="column"
            bgcolor="custom.bg.main"
            overflow="auto"
            color="text.primary"
            width="100%"
            paddingBottom="75px"
        >
            <Navbar />
            <RadioHeader
                header="Главное"
                navItems={navItems}
                currentNavItem={currentSubPage}
                setNavItem={setCurrentSubPage}
            />

            {currentSubPage === RadioSubPages.ALL && <Radio />}
            {currentSubPage === RadioSubPages.NEW && <Albums />}
            {currentSubPage === RadioSubPages.TRENDS && <Trends />}
        </Stack>
    );
};

export default RadioPage;
