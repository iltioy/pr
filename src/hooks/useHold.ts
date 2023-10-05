import { useEffect, useRef, useState } from "react";

interface useHoldProps {
    size: number;
    initialScale?: number;
}

const useHold = ({ size, initialScale }: useHoldProps) => {
    let timerID: any;
    let counter = 0;

    let pressHoldDuration = 1;

    const [scale, setScale] = useState(initialScale || 1);

    const ref = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        if (!ref.current) return;

        ref.current.addEventListener("mousedown", pressingDown, false);
        ref.current.addEventListener("mouseup", notPressingDown, false);
        ref.current.addEventListener("mouseleave", notPressingDown, false);

        ref.current.addEventListener("touchstart", pressingDown, false);
        ref.current.addEventListener("touchend", notPressingDown, false);

        return () => {
            if (timerID) {
                cancelAnimationFrame(timerID);
            }
        };
    }, [ref]);

    function pressingDown(e: any) {
        // Start the timer
        requestAnimationFrame(timer);
        e.preventDefault();
    }

    function notPressingDown(e: any) {
        // Stop the timer
        setScale(initialScale || 1);
        cancelAnimationFrame(timerID);
        counter = 0;
    }

    function timer() {
        if (!ref.current) return;

        if (counter < pressHoldDuration) {
            timerID = requestAnimationFrame(timer);
            counter++;
        } else {
            setScale(size);
        }
    }

    return {
        ref,
        scale,
    };
};

export default useHold;
