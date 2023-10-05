import { Stack, Snackbar, Alert, IconButton, Button } from "@mui/material";
import { useState, useEffect } from "react";
import { useStores } from "../../../root-store-context";
import { observer } from "mobx-react-lite";
import SongFileInputWindow from "./SongFileInputWindow";
import SongUploadForm from "./SongUploadForm";
import AlertSnackbar from "../../Snackbars/AlertSnackbar";
import MultipleSongUploadForm from "./MultipleSongUploadForm";

const DEFAULT_MUSIC_IMAGE_URL =
    "https://sun6-23.userapi.com/s/v1/ig2/fCU0l_DjmTovIKbT969SqRNxQpBkl8_l00z0vPJY-tOy2vHwd9eY7rGCloekqrGzgLvANYSf886sRaMsTBDM2Blr.jpg?size=1068x1068&quality=95&crop=4,0,1068,1068&ava=1";

enum windowPages {
    main = "MAIN",
    singleFileEdit = "EDIT_FILE",
    multipleFilesUpload = "UPLOAD_MANY",
}

export interface FileInfo {
    name?: string;
    author?: string;
    album?: string;
    file: File;
    uploaded?: boolean;
    image_url?: string;
}

export interface newFileInfo {
    name: string;
    author: string;
    album?: string;
    uploaded: boolean;
    image_url?: string;
    file?: File;
}

const SongUploadModal = observer(() => {
    const { modalsStore } = useStores();
    const [fileInfo, setFileInfo] = useState<FileInfo>();
    const [filesInfo, setFilesInfo] = useState<FileInfo[]>([]);

    const [windowPage, setWindowPage] = useState<windowPages>(windowPages.main);
    const [warning, setWarning] = useState("");
    const [error, setError] = useState("");

    const handleAddFile = (filesToAdd: FileList) => {
        for (let i = 0; i < filesToAdd.length; i++) {
            if (!filesToAdd[i].type.startsWith("audio/")) {
                setWarning("Загружаемый файл должен быть аудио-файлом!");
                return;
            }
        }

        if (filesToAdd.length === 0) {
            return;
        } else if (filesToAdd.length === 1) {
            setWindowPage(windowPages.singleFileEdit);
            setFileInfo({
                file: filesToAdd[0],
            });
        } else {
            setInitialFilesInfo(filesToAdd);
            setWindowPage(windowPages.multipleFilesUpload);
        }
    };

    const setInitialFilesInfo = (files: FileList) => {
        console.log(files?.length);
        if (!files?.length) return;
        let newFiels: FileInfo[] = [];

        for (let i = 0; i < files.length; i++) {
            newFiels.push({
                name: files[i].name,
                author: "",
                file: files[i],
                uploaded: false,
            });
        }

        setFilesInfo(newFiels);
    };

    const handleEditFileFromMany = (fileInfo: FileInfo) => {
        setFileInfo({
            file: fileInfo.file,
            album: fileInfo.album,
            author: fileInfo.author,
            image_url: fileInfo.image_url,
            name: fileInfo.name,
            uploaded: fileInfo.uploaded,
        });
        setWindowPage(windowPages.singleFileEdit);
    };

    const handleGoBackFormEditing = (newFileInfo: newFileInfo) => {
        setFilesInfo((prevState) => {
            let newState: FileInfo[] = [];
            prevState.forEach((fileInfo) => {
                if (fileInfo.file === newFileInfo.file) {
                    const { author, name, uploaded, album, file, image_url } = newFileInfo;
                    let newInfo: FileInfo = {
                        author,
                        file,
                        name,
                        uploaded,
                        album,
                        image_url,
                    };
                    newState.push(newInfo);
                } else {
                    newState.push(fileInfo);
                }
            });

            return newState;
        });
        setWindowPage(windowPages.multipleFilesUpload);
    };

    const handleFileUploadingState = (fileInfo: FileInfo) => {};

    return (
        <>
            <Stack
                position="absolute"
                color="text.primary"
                // bottom="0px"
                width="100%"
                height="100%"
                top="0"
                bottom="0"
                left="0"
                right="0"
                bgcolor="rgb(0,0,0)"
                zIndex={20}
                overflow="hidden"
                sx={{
                    opacity: 0.7,
                }}
            />

            <Stack
                position="absolute"
                width="100%"
                height="100%"
                display="flex"
                justifyContent="center"
                alignItems="center"
                zIndex={21}
                onClick={() => modalsStore.toggleSongUploadModal()}
                color="text.primary"
            >
                {/* {windowPage === windowPages.main ? (
          <SongFileInputWindow handleAddFile={handleAddFile} />
        ) : windowPage === windowPages.singleFileEdit ? (
          <SongUploadForm file={file} setError={setError} />
        ) : windowPage === windowPages.multipleFilesUpload ? (
          <MultipleSongUploadForm />
        ) : (
          <></>
        )} */}

                {windowPage === windowPages.main && (
                    <SongFileInputWindow handleAddFile={handleAddFile} />
                )}

                {windowPage === windowPages.singleFileEdit && (
                    <SongUploadForm
                        multipleFiles={filesInfo.length > 1}
                        fileInfo={fileInfo}
                        setError={setError}
                        handleGoBackFormEditing={handleGoBackFormEditing}
                    />
                )}

                {windowPage === windowPages.multipleFilesUpload && (
                    <MultipleSongUploadForm
                        handleEditFileFromMany={handleEditFileFromMany}
                        filesInfo={filesInfo}
                    />
                )}
            </Stack>

            <AlertSnackbar message={warning} setMessage={setWarning} severity="warning" />
            <AlertSnackbar message={error} setMessage={setError} severity="error" />
        </>
    );
});

export default SongUploadModal;
