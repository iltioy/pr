import axios from "axios";
import userStore from "../stores/user-store";
import { Playlist } from "../types";

interface CategoryBody {
    name: string;
}

class CategoriesQueries {
    getCategory = async (categoryId: number) => {
        return axios.get(`/categories/${categoryId}`);
    };

    createCategory = async (body: CategoryBody) => {
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

    updateCategory = async (
        categoryId: number | string,
        body: CategoryBody
    ) => {
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

    addPlaylistToCategory = async (
        categoryId: number | string,
        playlistId: number | string
    ) => {
        try {
            return axios.patch(
                `/categories/${categoryId}/playlist/add/${playlistId}`,
                {},
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

    removePlaylistFromCategory = async (
        categoryId: number | string,
        playlistId: number | string
    ) => {
        try {
            return axios.delete(
                `/categories/${categoryId}/playlist/remove/${playlistId}`,
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

    reorderCategory = async (categoryId: number, playlists: Playlist[]) => {
        try {
            await axios.patch(
                `/categories/reorder/${categoryId}/`,
                {
                    playlists,
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

    deleteCategory = (categoryId: number | string) => {
        return axios.delete(`/categories/delete/${categoryId}`, {
            headers: {
                Authorization: `Bearer ${userStore.access_token}`,
            },
        });
    };
}

export default new CategoriesQueries();
