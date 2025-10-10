import {
    AppBar,
    Button,
    Stack,
    Toolbar,
    Typography,
    InputBase,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useLocation } from "react-router";
import SearchIcon from "@mui/icons-material/Search";
import { useRef, useState } from "react";
import SearchWindow from "./modals/SearchWindow";
import { useNavigate } from "react-router";
import { observer } from "mobx-react-lite";
import { useStores } from "../root-store-context";
import { useLocalization } from "../contexts/LocalizationContext";
import { Language } from "../translations";

interface NavbarProps {
    topRef?: React.MutableRefObject<HTMLSpanElement | null>;
}

const Navbar = observer(({ topRef }: NavbarProps) => {
    const theme = useTheme();
    const location = useLocation();
    const navigate = useNavigate();
    const { t, language, setLanguage } = useLocalization();
    let themeColor = theme.palette.mode === "dark" ? "white" : "black";

    const [isInputFocused, setIsInputFocused] = useState(false);
    const [isSearchOpened, setIsSearchOpened] = useState(false);

    // console.log("Navbar rendered!");

    const ref = useRef<HTMLDivElement | null>(null);
    const { userStore, modalsStore } = useStores();

    const handleLogout = () => {
        userStore.logout();
        navigate("/auth");
    };

    if (location.pathname.startsWith("/auth")) {
        return <></>;
    }

    return (
        <>
            <div ref={ref}></div>

            <AppBar
                position="static"
                sx={{
                    background: `${theme.palette.custom?.bg?.main}`,
                    display: "flex",
                    alignItems: "center",
                    height: "64px",
                    borderBottom: "1px solid grey",
                    zIndex: 5,
                }}
            >
                <Toolbar
                    sx={{
                        width: { xs: "95%", sm: "80%" },
                        padding: "0px !important",
                    }}
                >
                    <Typography
                        variant="h6"
                        color="text.primary"
                        component="div"
                        display={`${isSearchOpened ? "none" : "block"}`}
                        sx={{
                            flex: {
                                xs: "1",
                                md: "unset",
                            },
                            cursor: "pointer",
                        }}
                        noWrap
                        onClick={() => {
                            navigate("/radio");
                        }}
                    >
                        {t('appName')}
                    </Typography>
                    <Stack
                        flexDirection="row"
                        color="text.primary"
                        marginLeft="30px"
                        flex={1}
                        sx={{
                            display: {
                                xs: "none",
                                md: isSearchOpened ? "none" : "flex",
                            },
                        }}
                    >
                        <Button
                            color="inherit"
                            sx={{ marginRight: "5px" }}
                            onClick={() => {
                                navigate("/radio");
                            }}
                        >
                            {t('radio')}
                        </Button>
                        {/* 
            <Button color="inherit" sx={{ marginRight: "5px" }}>
              Новинки
            </Button> */}

                        <Button
                            color="inherit"
                            onClick={() =>
                                navigate(
                                    `/${userStore.user.username}/playlists`
                                )
                            }
                        >
                            {t('collection')}
                        </Button>

                        {(userStore.user.role === "artist" ||
                            userStore.user.role === "admin") && (
                            <>
                                <Button
                                    color="inherit"
                                    onClick={() =>
                                        navigate(
                                            `/artist/${userStore.user.username}`
                                        )
                                    }
                                >
                                    {t('artistPage')}
                                </Button>
                            </>
                        )}

                        {userStore.user.role === "admin" && (
                            <Button
                                color="inherit"
                                onClick={() => navigate(`/admin`)}
                            >
                                {t('admin')}
                            </Button>
                        )}

                        <Button
                            color="inherit"
                            onClick={() => setLanguage(language === Language.ru ? Language.en : Language.ru)}
                        >
                            {language === Language.ru ? 'EN' : 'RU'}
                        </Button>

                        <Button
                            color="inherit"
                            onClick={handleLogout}
                        >
                            {t('logout')}
                        </Button>
                    </Stack>

                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        p="4px"
                        borderBottom={{
                            sm: `1px solid ${
                                isSearchOpened ? "#ffffff" : themeColor
                            }`,
                            xs: "none",
                            zIndex: 11,
                        }}
                        flex={`${isSearchOpened ? "1" : "unset"}`}
                        sx={{
                            display: isSearchOpened ? "none" : "flex",
                        }}
                    >
                        <SearchIcon
                            htmlColor={isSearchOpened ? "#ffffff" : themeColor}
                            onClick={() => {
                                setIsInputFocused(true);
                            }}
                        />

                        <InputBase
                            sx={{
                                paddingLeft: "5px",
                                width: "100%",
                                display: {
                                    xs: isInputFocused ? "block" : "none",
                                    sm: "block",
                                },
                                color: isSearchOpened ? "#ffffff" : themeColor,
                            }}
                            placeholder={t('search')}
                            onFocus={() => {
                                ref?.current?.scrollIntoView();
                                setIsInputFocused(true);
                                setIsSearchOpened(true);
                            }}
                            // onBlur={() => setIsSearchOpened(false)}
                        />
                    </Stack>
                </Toolbar>

                {isSearchOpened && (
                    <SearchWindow setIsSearchOpened={setIsSearchOpened} />
                )}
            </AppBar>
        </>
    );
});

export default Navbar;
