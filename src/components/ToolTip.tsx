import { ReactNode, useState } from "react";
import { styled } from "styled-components";

const Tooltip = styled.div`
  position: absolute;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  max-width: 200px;
  word-wrap: break-word;
  z-index: 999;
`;

interface Props {
  description: string;
  children: ReactNode;
}

export const ToolTip = ({ description, children }: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div
      style={{ position: "relative" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {isTooltipVisible && (
        <Tooltip>
          <p>{description}</p>
        </Tooltip>
      )}
    </div>
  );
};
