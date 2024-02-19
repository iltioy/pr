import { Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router";
import { Category as CategoryType } from "../../types";
import { observer } from "mobx-react-lite";

interface CategoryItemProps {
    category: CategoryType;
}

const CategoryItem = observer(({ category }: CategoryItemProps) => {
    const navigate = useNavigate();

    return (
        <Stack
            width="100%"
            bgcolor="custom.bg.primary"
            sx={{
                cursor: "pointer",
                ":hover": {
                    textDecoration: "underline",
                },
            }}
            padding="5px"
            marginTop="3px"
            color="text.primary"
            onClick={() => navigate(`/admin/categories/${category.id}`)}
        >
            <Typography variant="h6">{category.name}</Typography>
        </Stack>
    );
});

export default CategoryItem;
