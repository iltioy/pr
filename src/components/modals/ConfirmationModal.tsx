import {
    Box,
    Button,
    ButtonPropsColorOverrides,
    Modal,
    Stack,
    Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
    position: "absolute" as "absolute",
    top: {
        xs: "25%",
        md: "40%",
    },
    left: "50%",
    transform: {
        xs: "translate(-50%, -25%)",
        md: "translate(-50%, -40%)",
    },
    width: {
        xs: "300px",
        sm: "360px",
    },
    height: "160px",
    boxShadow: 24,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
};

interface ConfirmationModalProps {
    confirmationAction: () => void;
    confirmationText: string;
    cancelText: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
    cancelText,
    confirmationAction,
    confirmationText,
    open,
    setOpen,
}) => {
    const handleClose = () => setOpen(false);

    return (
        <Modal open={open} onClose={handleClose}>
            <Stack
                sx={style}
                color="text.primary"
                bgcolor="custom.bg.secondary"
            >
                <Stack>
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                        paddingBottom="20px"
                    >
                        Удалить этот Плейлист?
                    </Typography>
                    <Stack flexDirection="row" gap="20px">
                        <Box>
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => {
                                    confirmationAction();
                                }}
                            >
                                {confirmationText}
                            </Button>
                        </Box>
                        <Box>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleClose}
                            >
                                {cancelText}
                            </Button>
                        </Box>
                    </Stack>
                </Stack>
            </Stack>
        </Modal>
    );
};

export default ConfirmationModal;
