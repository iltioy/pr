import { Stack, Grid } from "@mui/material";
import GenreCategoryItem from "./genre/GenreCategoryItem";
import { SxProps, Theme } from "@mui/material";
interface GenreCategoryListProps {
    sx?: SxProps<Theme> | undefined;
}

const GenreCategoryList: React.FC<GenreCategoryListProps> = ({ sx }) => {
    return (
        <Stack
            sx={[
                {
                    width: {
                        xs: "95%",
                        sm: "80%",
                    },
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
        >
            <Grid container width="100%" gap="15px">
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>{" "}
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>{" "}
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>{" "}
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
                <Grid item>
                    <GenreCategoryItem />
                </Grid>
            </Grid>
        </Stack>
    );
};

export default GenreCategoryList;
