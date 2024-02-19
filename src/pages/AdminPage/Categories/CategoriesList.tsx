import { Stack, Typography } from "@mui/material";
import CategoryItem from "../../../components/admin/CategoryItem";
import { useQuery } from "react-query";
import { useState } from "react";
import { Category, OrderedCategory } from "../../../types";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useCreateCategory } from "../../../mutations/categories";

const CategoriesList = observer(() => {
    const [categories, setCategories] = useState<Category[]>([]);

    useQuery("categories", () => axios.get("/categories"), {
        select: (data) => {
            return data.data;
        },
        onSuccess: (data) => {
            if (!data) return;
            setCategories(data);
        },
    });

    const { mutate: createCategory } = useCreateCategory();

    return (
        <Stack>
            <Typography marginBottom="10px" variant="h4">
                Categories
            </Typography>
            <hr />

            <Stack overflow="auto" className="noscroll" marginTop="10px">
                {categories.map((category) => {
                    return (
                        <CategoryItem category={category} key={category.id} />
                    );
                })}

                <Stack
                    width="100%"
                    sx={{
                        cursor: "pointer",
                        ":hover": {
                            textDecoration: "underline",
                        },
                    }}
                    padding="5px"
                    marginTop="3px"
                    color="text.primary"
                    onClick={() => createCategory()}
                >
                    <Typography variant="h6">New</Typography>
                </Stack>
            </Stack>
        </Stack>
    );
});

export default CategoriesList;
