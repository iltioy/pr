import { Drawer, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { observer } from "mobx-react-lite";
import { useState } from "react";
import songsStore from "../stores/songs-store";

interface SettingsDrawerProps {
    isSettingsDrawerOpen: boolean;
    setIsSettingsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionsItemProps {
    title: string;
    setValue: React.Dispatch<React.SetStateAction<string[]>>;
    values: string[];
    handleChanges: () => void;
}

const OptionsItem: React.FC<OptionsItemProps> = observer(
    ({ title, setValue, values, handleChanges }) => {
        const {
            palette: { mode },
        } = useTheme();

        const activeBgColor = mode === "dark" ? "#212121" : "#ececec";

        return (
            <Stack
                bgcolor={`${
                    values.includes(title) ? activeBgColor : "custom.bg.main"
                }`}
                p="10px"
                borderRadius="10px"
                justifyContent="center"
                alignItems="center"
                display="flex"
                sx={{
                    cursor: "pointer",
                    ":hover": {
                        background: `${activeBgColor}`,
                    },
                }}
                className="noselect"
                onClick={() => {
                    if (values.includes(title)) {
                        setValue((prevState) =>
                            prevState.filter((el) => el !== title)
                        );
                    } else {
                        setValue((prevState) => [...prevState, title]);
                    }
                    handleChanges();
                }}
            >
                {title}
            </Stack>
        );
    }
);

const SettingsDrawer: React.FC<SettingsDrawerProps> = observer(
    ({ isSettingsDrawerOpen, setIsSettingsDrawerOpen }) => {
        const [moods, setMoods] = useState<string[]>([]);
        const [languages, setLanguages] = useState<string[]>([]);
        const [types, setTypes] = useState<string[]>([]);

        const handleChanges = () => {
            songsStore.setSongPreferences({
                languages,
                moods,
                types,
            });
        };

        return (
            <Drawer
                anchor="right"
                open={isSettingsDrawerOpen}
                onClose={() => setIsSettingsDrawerOpen(false)}
            >
                <Stack
                    sx={{
                        width: "500px",
                        height: "100%",
                    }}
                    bgcolor="custom.bg.secondary"
                    alignItems="center"
                    paddingTop="40px"
                    color="text.primary"
                >
                    <Stack width="450px" flexDirection="column">
                        <Stack flexDirection="column" alignItems="center">
                            <Stack
                                width="100%"
                                flexDirection="column"
                                alignItems="center"
                                marginBottom="30px"
                            >
                                <Typography marginBottom="15px">
                                    ПО ХАРАКТЕРУ
                                </Typography>

                                <Grid container spacing={1} width="100%">
                                    <Grid item xs={12}>
                                        <OptionsItem
                                            title="Любимое"
                                            setValue={setTypes}
                                            values={types}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Незнакомое"
                                            setValue={setTypes}
                                            values={types}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Популярное"
                                            setValue={setTypes}
                                            values={types}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack
                                width="100%"
                                flexDirection="column"
                                alignItems="center"
                                marginBottom="30px"
                            >
                                <Typography marginBottom="15px">
                                    ПОД НАСТРОЕНИЕ
                                </Typography>

                                <Grid container spacing={1} width="100%">
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Бодрое"
                                            setValue={setMoods}
                                            values={moods}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Весёлое"
                                            setValue={setMoods}
                                            values={moods}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Спокойное"
                                            setValue={setMoods}
                                            values={moods}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Грустное"
                                            setValue={setMoods}
                                            values={moods}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack
                                width="100%"
                                flexDirection="column"
                                alignItems="center"
                                marginBottom="30px"
                            >
                                <Typography marginBottom="15px">
                                    ПО ЯЗЫКУ
                                </Typography>

                                <Grid container spacing={1} width="100%">
                                    <Grid item xs={12}>
                                        <OptionsItem
                                            title="Русский"
                                            setValue={setLanguages}
                                            values={languages}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Иностранный"
                                            setValue={setLanguages}
                                            values={languages}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <OptionsItem
                                            title="Без слов"
                                            setValue={setLanguages}
                                            values={languages}
                                            handleChanges={handleChanges}
                                        />
                                    </Grid>
                                </Grid>
                            </Stack>
                        </Stack>
                    </Stack>
                </Stack>
            </Drawer>
        );
    }
);

export default SettingsDrawer;
