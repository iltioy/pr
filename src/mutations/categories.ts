import CategoriesQueries from "../queries/categories";
import { useSnackbar } from "notistack";
import { useMutation } from "react-query";
import { useNavigate } from "react-router";
import { appQueryClient as queryClient } from "..";
import { CAHRT_GLOBAL_CATEGORIES_NAME } from "../constants/charts";
import ChartQueries from "../queries/charts";

export const useCreateCategoryForChart = () => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return useMutation(
        () => CategoriesQueries.createCategory({ name: "Категория" }),
        {
            onSuccess: async (data) => {
                await ChartQueries.addCategoryToChart(
                    CAHRT_GLOBAL_CATEGORIES_NAME,
                    data.data?.id
                );
                navigate(
                    `/admin/${CAHRT_GLOBAL_CATEGORIES_NAME}/${data.data?.id}`
                );
            },
            onError: () => {
                enqueueSnackbar("Не удалось создать категорию!", {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            },
        }
    );
};

export const useUpdateCategory = (
    categoryId: number | string,
    name: string
) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return useMutation(
        () => CategoriesQueries.updateCategory(categoryId, { name }),
        {
            onSuccess: () => {
                enqueueSnackbar("Категория обновлена!", {
                    variant: "success",
                    autoHideDuration: 3000,
                });

                navigate("/admin");
            },
            onError: () => {
                enqueueSnackbar("Не удалось обновть категорию!", {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            },
        }
    );
};

export const useDeleteCategory = (categoryId: number | string) => {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    return useMutation(() => CategoriesQueries.deleteCategory(categoryId), {
        onSuccess: () => {
            enqueueSnackbar("Успешно удалено!", {
                variant: "success",
                autoHideDuration: 3000,
            });
            queryClient.invalidateQueries("categories");
            navigate("/admin/categories");
        },
    });
};

export const useAddPlaylistToCategory = (
    categoryId: number,
    playlistId: number
) => {
    return useMutation(
        () => CategoriesQueries.addPlaylistToCategory(categoryId, playlistId),
        {
            onSuccess: () => {},
        }
    );
};

export const useRemovePlaylistFromCategory = (
    categoryId: number,
    playlistId: number
) => {
    return useMutation(
        () =>
            CategoriesQueries.removePlaylistFromCategory(
                categoryId,
                playlistId
            ),
        {
            onSuccess: () => {},
        }
    );
};
