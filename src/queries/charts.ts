import axios from "axios";
import { Category } from "../types";
import userStore from "../stores/user-store";

class ChartsQueries {
    reorderChartCategories = async (
        chartName: string,
        categories: Category[]
    ) => {
        try {
            await axios.patch(
                `/chart/${chartName}/categories/reorder`,
                {
                    categories,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    createChart = async (name: string) => {
        try {
            const res = await axios.post(
                `/chart/create`,
                {
                    name,
                },
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    addCategoryToChart = async (name: string, categoryId: number) => {
        try {
            const res = await axios.patch(
                `/chart/${name}/category/add/${categoryId}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    removeCategoryFromChart = async (name: string, categoryId: number) => {
        try {
            const res = await axios.delete(
                `/chart/${name}/category/remove/${categoryId}`,
                {
                    headers: {
                        Authorization: `Bearer ${userStore.access_token}`,
                    },
                }
            );

            return res.data;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new ChartsQueries();
