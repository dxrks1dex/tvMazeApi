'use client'
import {useRef, useState, useEffect, ReactNode} from "react";

const EmptyStar = () => {
    return <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
        <path
            d="M15.668 8.626l8.332 1.159-6.065 5.874 1.48 8.341-7.416-3.997-7.416 3.997 1.481-8.341-6.064-5.874 8.331-1.159 3.668-7.626 3.669 7.626zm-6.67.925l-6.818.948 4.963 4.807-1.212 6.825 6.068-3.271 6.069 3.271-1.212-6.826 4.964-4.806-6.819-.948-3.002-6.241-3.001 6.241z"/>
    </svg>
}

const FiledStar = () => {
    return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
        <path
            d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"/>
    </svg>
}

interface Props {
    initialRating: number
}

const StarRating = ({initialRating}: Props): ReactNode => {
    const [rating, setRating] = useState(initialRating);
    const ratingContainerRef = useRef(null);

    useEffect(() => {
        setRating(initialRating);
    }, [initialRating]);

    const totalStarts = 10

    if (rating === null) {
        return <>No rating</>
    }

    return (
        <div
            style={{
                display: "inline-flex",
                position: "relative",
                textAlign: "left",
            }}
            ref={ratingContainerRef}
        >
            {[...new Array(totalStarts)].map((item, index) => {
                const showEmptyIcon = rating === -1 || rating < index + 1;
                const isActiveRating = rating !== 1;
                const isRatingWithPrecision = rating % 1 !== 0;
                const isRatingEqualToIndex = Math.ceil(rating) === index + 1;
                const showRatingWithPrecision =
                    isActiveRating && isRatingWithPrecision && isRatingEqualToIndex;

                return (
                    <div
                        style={{
                            position: "relative",
                        }}
                        key={index}
                    >
                        <div
                            style={{
                                width: showRatingWithPrecision
                                    ? `${(rating % 1) * 100}%`
                                    : "0%",
                                overflow: "hidden",
                                position: "absolute",
                            }}
                        >
                            <FiledStar/>
                        </div>
                        <div
                            style={{
                                color: showEmptyIcon ? "gray" : "inherit",
                            }}
                        >
                            {showEmptyIcon ? <EmptyStar/> : <FiledStar/>}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default StarRating;