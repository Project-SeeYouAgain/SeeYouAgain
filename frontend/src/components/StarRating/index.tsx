import { useState } from 'react';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';

interface StarRatingProps {
    maxRating?: number;
    onChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ maxRating = 5, onChange }) => {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const onMouseEnter = (index: number) => {
        setHoverRating(index);
    };

    const onMouseLeave = () => {
        setHoverRating(0);
    };

    const onClick = (index: number) => {
        setRating(index);
        if (onChange) {
            onChange(index);
        }
    };

    const renderStar = (index: number) => {
        if (index <= (hoverRating || rating)) {
            return <BsStarFill size={25} />;
        } else {
            return <BsStar size={25} />;
        }
    };

    return (
        <div className="flex justify-center items-center text-blue">
            {[...Array(maxRating)].map((_star, index) => {
                const currentIndex = index + 1;
                return (
                    <span key={index} onMouseEnter={() => onMouseEnter(currentIndex)} onMouseLeave={onMouseLeave} onClick={() => onClick(currentIndex)}>
                        {renderStar(currentIndex)}
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
