import { Stack } from "@mui/material";
import RadioHeader from "./NavHeader";
import { useState } from "react";
import Radio from "./sub_pages/Radio";
import Genres from "./sub_pages/Genres";
import Trends from "./sub_pages/Trends";
import Navbar from "../../components/Navbar";

enum RadioSubPages {
  ALL = "ВСЁ",
  NEW = "ЖАНРЫ",
  TRENDS = "В ТРЕНДЕ",
}

const navItems = [
  {
    label: "Всё",
    enum: RadioSubPages.ALL,
  },
  {
    label: "Новинки",
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
      {currentSubPage === RadioSubPages.NEW && <Genres />}
      {currentSubPage === RadioSubPages.TRENDS && <Trends />}
    </Stack>
  );
};

export default RadioPage;
