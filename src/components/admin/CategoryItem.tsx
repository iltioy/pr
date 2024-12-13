import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Category as CategoryType } from "../../types";
import { observer } from "mobx-react-lite";
import { CAHRT_GLOBAL_CATEGORIES_NAME } from "../../constants/charts";

interface CategoryItemProps {
    category: CategoryType;
}

const CategoryItem = observer(({ category }: CategoryItemProps) => {
    const navigate = useNavigate();

    return (
        <Stack
            width="100%"
            sx={{
                cursor: "pointer",
                ":hover": {
                    textDecoration: "underline",
                },
            }}
            padding="5px"
            marginTop="7px"
            color="text.primary"
            onClick={() =>
                navigate(
                    `/admin/${CAHRT_GLOBAL_CATEGORIES_NAME}/${category.id}`
                )
            }
        >
            <Typography variant="h5">{category.name}</Typography>
        </Stack>
    );
});

export default CategoryItem;
