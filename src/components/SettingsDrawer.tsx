import { Drawer, Grid, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface SettingsDrawerProps {
    isSettingsDrawerOpen: boolean;
    setIsSettingsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

interface OptionsItemProps {
    title: string;
}

const OptionsItem: React.FC<OptionsItemProps> = ({ title }) => {
    const {
        palette: { mode },
    } = useTheme();

    return (
        <Stack
            bgcolor="custom.bg.main"
            p="10px"
            borderRadius="10px"
            justifyContent="center"
            alignItems="center"
            display="flex"
            sx={{
                cursor: "pointer",
                ":hover": {
                    background: `${mode === "dark" ? "#212121" : "#ececec"}`,
                },
            }}
            className="noselect"
        >
            {title}
        </Stack>
    );
};

const SettingsDrawer: React.FC<SettingsDrawerProps> = ({
    isSettingsDrawerOpen,
    setIsSettingsDrawerOpen,
}) => {
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
                                    <OptionsItem title="Любимое" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Незнакомое" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Популярное" />
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
                                    <OptionsItem title="Бодрое" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Весёлое" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Спокойное" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Грустное" />
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
                                    <OptionsItem title="Русский" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Иностранный" />
                                </Grid>
                                <Grid item xs={6}>
                                    <OptionsItem title="Без слов" />
                                </Grid>
                            </Grid>
                        </Stack>
                    </Stack>
                </Stack>
            </Stack>
        </Drawer>
    );
};

export default SettingsDrawer;
