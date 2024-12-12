import axios from "axios";
import userStore from "../stores/user-store";

class FilesQueries {
    handleUploadImage = async (file: File) => {
        try {
            if (!file) return;

            let formData = new FormData();
            formData.append("image", file);

            const res = await axios.post("/files/image/upload", formData, {
                headers: {
                    Authorization: `Bearer ${userStore.access_token}`,
                },
            });
            const image_url = res.data.image_url;

            return image_url;
        } catch (error) {
            console.log(error);
        }
    };
}

export default new FilesQueries();
