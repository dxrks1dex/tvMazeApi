import React from "react";

interface Props {
    elementRef: React.MutableRefObject<HTMLDivElement | null>
    isTooltipVisible: boolean
}

export const isElementOutOfPage = ({elementRef, isTooltipVisible}: Props): boolean => {
    const tooltipElement = elementRef.current;

    if (isTooltipVisible && tooltipElement) {
        const windowWidth = window.innerWidth - 20;
        const tooltipRect = tooltipElement.getBoundingClientRect();

        if (tooltipRect.right > windowWidth) {
            return true
        }
    }

    return false
}