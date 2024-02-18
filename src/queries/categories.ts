import axios from "axios";
import userStore from "../stores/user-store";

interface CategoryBody {
    name: string;
}

class CategoriesQueries {
    createCategory = async (categoryId: number, body: CategoryBody) => {
        return axios.post(
            `/categories/create`,
            {
                name: body.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };

    updateCategory = async (categoryId: number, body: CategoryBody) => {
        return axios.patch(
            `/categories/update/${categoryId}`,
            {
                name: body.name,
            },
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };
    addPlaylistToCategory = async (categoryId: number, playlistId: number) => {
        return axios.patch(
            `/categories/${categoryId}/playlist/add/${playlistId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };
    removePlaylistFromCategory = async (
        categoryId: number,
        playlistId: number
    ) => {
        return axios.delete(
            `/categories/${categoryId}/playlist/remove/${playlistId}`,
            {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            }
        );
    };
    deleteCategory = (categoryId: number) => {
        return axios.delete(`/categories/delete/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${userStore.access_token}`,
            },
        });
    };
}

export default new CategoriesQueries();
