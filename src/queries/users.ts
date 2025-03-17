import axios from "axios";
import userStore from "../stores/user-store";
import playlistsStore from "../stores/playlists-store";

interface UpdateUserData {
    username?: string | null;
    image_url?: string | null;
}

class UsersQueries {
    updateUser = async (updateUserData: UpdateUserData) => {
        try {
            const res = await axios.patch("/users/update", updateUserData, {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });

            if (!res.data) return;
            const user = res.data;
            return user;
        } catch (error) {
            throw error;
        }
    };

    getMeInfo = async () => {
        try {
            const res = await axios.get("/users/get/me", {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });

            userStore.setUserInfo(res.data);
            playlistsStore.setUserPlaylists(res.data);
        } catch (error) {
            console.log(error);
        }
    };
}

export default new UsersQueries();
