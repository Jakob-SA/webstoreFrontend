import { MouseEventHandler, useState } from "react";

interface RemoveButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export function RemoveButton({ onClick }: RemoveButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      className="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <img
        src={isHovered ? "openTrashcan.png" : "trashcan.png"}
        alt="Remove icon"
        width="25px"
      />
    </button>
  );
}
