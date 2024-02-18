import { createTheme, ThemeProvider } from "@mui/material/styles";
import AuthPage from "./pages/AuthPage/AuthPage";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";
// import Navbar from "./components/Navbar";
// import { useRef } from "react";
import AllPlaylistsPage from "./pages/AllPlaylistsPlage/AllPlaylistsPage";
import RadioPage from "./pages/RadioPage/RadioPage";
import { Box } from "@mui/material";
import SongTrack from "./components/song_track/SongTrack";
import { useStores } from "./root-store-context";
import { useEffect } from "react";
import ProtectedRoutes from "./pages/Protected/AuthenticatedRoutes";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import LoginForm from "./pages/AuthPage/LoginForm";
import RegisterForm from "./pages/AuthPage/RegisterForm";
import ConfirmEmail from "./pages/AuthPage/ConfirmEmail";
import RecoverPasswordRequest from "./pages/AuthPage/PasswordRecovery/RecoverPasswordRequest";
import RecoverPassword from "./pages/AuthPage/PasswordRecovery/RecoverPassword";
import { ReactQueryDevtools } from "react-query/devtools";
import EditPlaylistPage from "./pages/EditPlaylistPage/EditPlaylistPage";
import SongUploadModal from "./components/modals/SongUploadModal/SongUploadModal";
import songsStore from "./stores/songs-store";
import SongPage from "./pages/PlaylistPage/SongPage";
import AuthenticatedRoutes from "./pages/Protected/AuthenticatedRoutes";
import AdminRoutes from "./pages/Protected/AdminRoutes";
import AdminPage from "./pages/AdminPage/AdminPage";
import AdminRadio from "./pages/AdminPage/AdminRadio";

const dark = false;
const darkTheme = createTheme({
    palette: {
        mode: "dark",
        custom: {
            primary: {
                main: "#F54B64",
                secondary: "#F78361",
            },
            secondary: "#242A38",
            bg: {
                main: "#121212",
                secondary: "#181818",
            },
            main: "#121212",
        },

        // primary: {
        //     main: "#F78361",
        // },
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
        custom: {
            primary: {
                main: "#F54B64",
                secondary: "#F78361",
            },
            secondary: "#242A38",
            bg: {
                secondary: "#FFFAFA",
                main: "#ffffff",
            },
            main: "#ffffff",
        },

        // primary: {
        //     main: "#F78361",
        // },
    },
});

const App = observer(() => {
    // const topRef = useRef<HTMLSpanElement | null>(null);

    const { userStore, playlistsStore, modalsStore } = useStores();
    const navigate = useNavigate();
    const location = useLocation();

    // const updateTokens = async () => {
    //   if (userStore.refresh_token) {
    //     const res = await axios.post("http://localhost:5000/auth/refrest", {}, {
    //       headers: {
    //         Authorization: `Bearer ${userStore.refresh_token}`
    //       }
    //     })

    //     userStore.access_token = res.data?.access_token
    //     userStore.re = res.data?.refresh_token
    //   }
    // };
    const getUserInfo = async () => {
        try {
            const res = await axios.get("/users/get/me", {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });

            userStore.setUserInfo(res.data);
            playlistsStore.setUserPlaylists(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    const refreshTokens = async () => {
        try {
            const res = await axios.post(
                "/auth/refresh",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.refresh_token}`,
                    },
                }
            );

            const { access_token, refresh_token } = res.data;

            userStore.setTokens(access_token, refresh_token);
        } catch (error) {
            logout();
            console.log(error);
        }
    };

    const logout = () => {
        userStore.logout();
        // console.log(location.pathname, location.pathname.startsWith("/auth"));
        if (!location.pathname.startsWith("/auth")) {
            navigate("/auth");
        }
        // console.log("no return");
    };

    useEffect(() => {
        getUserInfo();
    }, [userStore.access_token]);

    useEffect(() => {
        if (location.pathname === "/") {
            navigate("/auth");
        }

        refreshTokens();
        const intervalId = setInterval(() => {
            refreshTokens();
        }, 1000 * 10);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <Box component="div" bgcolor="custom.bg.main" className="App">
            <ThemeProvider theme={darkTheme}>
                {/* <span ref={topRef}></span> */}
                {/* <Navbar topRef={topRef} /> */}

                <>
                    {modalsStore.isSongUploadModalActive && <SongUploadModal />}
                </>

                {songsStore.current_song && userStore.access_token && (
                    <SongTrack />
                )}

                <Routes>
                    <Route path="/auth" element={<AuthPage />}>
                        <Route index element={<LoginForm />} />
                        <Route path="register" element={<RegisterForm />} />
                        <Route path="email/verify" element={<ConfirmEmail />} />
                        <Route
                            path="password/recover"
                            element={<RecoverPasswordRequest />}
                        />
                        <Route
                            path="password/recover/:recoveryId"
                            element={<RecoverPassword />}
                        />
                    </Route>

                    <Route element={<AuthenticatedRoutes />}>
                        <Route
                            path="/:username/playlist/:playlistId"
                            element={<PlaylistPage />}
                        />
                        <Route
                            path="/:username/playlist/:playlistId/edit"
                            element={<EditPlaylistPage />}
                        />
                        <Route
                            path="/:username/playlists"
                            element={<AllPlaylistsPage />}
                        />
                        <Route path="/radio" element={<RadioPage />} />
                        <Route
                            path="/playlist/song/:songId"
                            element={<SongPage />}
                        />
                    </Route>

                    <Route element={<AdminRoutes />} path="/admin">
                        <Route index element={<Navigate to="radio" />} />
                        <Route element={<AdminPage />}>
                            <Route element={<AdminRadio />} path="radio" />
                        </Route>
                    </Route>
                </Routes>
            </ThemeProvider>
            <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
        </Box>
    );
});

export default App;
