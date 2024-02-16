import { useSnackbar } from "notistack";

const useCopy = (text: string) => {
    const { enqueueSnackbar } = useSnackbar();

    const copy = () => {
        navigator.clipboard
            .writeText(text)
            .then(() => {
                enqueueSnackbar("Ссылка скопирована!", {
                    variant: "success",
                    autoHideDuration: 3000,
                });
            })
            .catch(() => {
                enqueueSnackbar("Ссылка повреждена!", {
                    variant: "error",
                    autoHideDuration: 3000,
                });
            });
    };

    return { copy };
};

export default useCopy;
