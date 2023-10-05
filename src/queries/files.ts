import axios from "axios";
import { ImageType } from "../types";
import userStore from "../stores/user-store";

export const handleUploadImage = async (file: File) => {
  try {
    if (!file) return;

    let formData = new FormData();
    formData.append("image", file);

    const res = await axios.post("/files/image/upload", formData, {
      headers: {
        Authorization: `Bearer ${userStore.access_token}`,
      },
    });
    const image: ImageType = res.data;

    return image;
  } catch (error) {
    console.log(error);
  }
};
