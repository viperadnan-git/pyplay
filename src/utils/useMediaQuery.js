import React, { useState, useCallback, useEffect } from "react";

export const useMediaQuery = (width) => {
    const [isTargetReached, setIsTargetReached] = useState(false);

    const updateTarget = useCallback((e) => {
        if (e.matches) {
            setIsTargetReached(true);
        } else {
            setIsTargetReached(false);
        }
    }, []);

    useEffect(() => {
        const media = window.matchMedia(`(max-width: ${width}px)`);
        const handleChange = (e) => updateTarget(e); // Move updateTarget inside useEffect

        media.addListener(handleChange);

        if (media.matches) {
            setIsTargetReached(true);
        }

        return () => media.removeListener(handleChange);
    }, [updateTarget, width]);

    return isTargetReached;
};
