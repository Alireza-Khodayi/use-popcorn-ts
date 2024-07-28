import { useState } from "react";
import Star from "./Star";
import "./stars.css";

interface IProps {
  maxRating?: number;
  color?: string;
  size?: number;
  messages?: string[];
  defaultRating?: number;
  onSetRating?: (rating: number) => void;
}
function StarRating({
  maxRating = 5,
  color = "#fcc419",
  size = 32,
  messages = [],
  defaultRating = 3,
  onSetRating,
}: IProps) {
  const [rating, setRating] = useState<number>(defaultRating);
  const [tempRating, setTempRating] = useState<number>(0);

  function handleRating(rating: number) {
    setRating(rating);
    onSetRating && onSetRating(rating);
  }
  return (
    <div className="main-container">
      <div className="stars-container">
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            onRate={() => handleRating(i + 1)}
            color={color}
            size={size}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
          />
        ))}
      </div>
      <p
        style={{ color, fontSize: `${size / 1.5}px` }}
        className="stars-text-style"
      >
        {messages.length === maxRating
          ? messages[tempRating ? tempRating - 1 : rating - 1]
          : tempRating || rating || ""}
      </p>
    </div>
  );
}

export { StarRating };
