import { Box, Button, Stack, Typography } from "@mui/material";
import CategoryItem from "../../../components/admin/CategoryItem";
import { useQuery } from "react-query";
import { useState } from "react";
import { Category, Chart } from "../../../types";
import axios from "axios";
import { observer } from "mobx-react-lite";
import { useCreateCategoryForChart } from "../../../mutations/categories";
import AdminPageHeader from "../../../components/admin/AdminPageHeader";
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from "react-beautiful-dnd";
import styled from "@emotion/styled";
import ChartQueries from "../../../queries/charts";
import { CAHRT_GLOBAL_CATEGORIES_NAME } from "../../../constants/admin";
import { useNavigate } from "react-router";

const Wrapper = styled.div`
    margin-bottom: 5px;
`;

const CategoriesList = observer(() => {
    const [categories, setCategories] = useState<Category[]>([]);
    const navigate = useNavigate();

    useQuery(
        CAHRT_GLOBAL_CATEGORIES_NAME,
        () => axios.get(`/chart/${CAHRT_GLOBAL_CATEGORIES_NAME}`),
        {
            select: (data) => {
                return data.data;
            },
            onSuccess: (data) => {
                if (!data || !data.categories) return;
                setCategories(data.categories);
            },
            onError: async () => {
                const newChart = await ChartQueries.createChart(
                    CAHRT_GLOBAL_CATEGORIES_NAME
                );
                if (!newChart || !newChart.categories) return;
                setCategories(newChart.categories);
            },
        }
    );

    function onDragEnd(result: DropResult) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const newCategories = reorder(
            categories,
            result.source.index,
            result.destination.index
        );

        ChartQueries.reorderChartCategories(
            CAHRT_GLOBAL_CATEGORIES_NAME,
            newCategories
        );
        setCategories(newCategories);
    }

    const reorder = (
        list: Category[],
        startIndex: number,
        endIndex: number
    ) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    };

    const { mutate: createCategory } = useCreateCategoryForChart();

    return (
        <Stack>
            <AdminPageHeader
                title="Чарты: Категории"
                defaultValue={CAHRT_GLOBAL_CATEGORIES_NAME}
            />

            <Stack
                overflow="auto"
                maxHeight="600px"
                className="noscroll"
                marginY="10px"
            >
                <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="list" direction="vertical">
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {categories.map(
                                    (category: Category, index: number) => {
                                        return (
                                            <Draggable
                                                draggableId={String(
                                                    category.id
                                                )}
                                                index={index}
                                                key={category.id}
                                            >
                                                {(provided) => (
                                                    <Wrapper
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                    >
                                                        <CategoryItem
                                                            category={category}
                                                            key={category.id}
                                                        />
                                                    </Wrapper>
                                                )}
                                            </Draggable>
                                        );
                                    }
                                )}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>

                <Stack
                    width="100%"
                    sx={{
                        cursor: "pointer",
                    }}
                    padding="5px"
                    marginTop="3px"
                    color="text.primary"
                    onClick={() => createCategory()}
                >
                    <Typography variant="h6">+</Typography>
                </Stack>
            </Stack>
            <Box>
                <Button onClick={() => navigate("/radio")}>На главную</Button>
            </Box>
        </Stack>
    );
});

export default CategoriesList;
