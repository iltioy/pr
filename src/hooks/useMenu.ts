import { useState } from "react";

const useMenu = () => {
    const [anchorElement, setAncgorElement] = useState<null | HTMLElement>(
        null
    );

    let isOpen = Boolean(anchorElement);

    const handleOpen = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAncgorElement(e.currentTarget);
    };

    const handleClose = () => {
        setAncgorElement(null);
    };

    return {
        isOpen,
        handleOpen,
        handleClose,
        anchorElement,
    };
};

export default useMenu;
