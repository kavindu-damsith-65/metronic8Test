import React, { useState } from 'react';

interface ContextMenuProps {
    x: number;
    y: number;
    options: { label: string; onClick: () => void }[];
    onClickOutside: () => void;
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options, onClickOutside }) => {
    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <div
            style={{
                position: 'fixed',
                top: `${y}px`,
                left: `${x}px`,
                backgroundColor: '#fff',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
                zIndex: 1000,
            }}
            onClick={handleClick}
        >
            {options.map((option, index) => (
                <div key={index} onClick={option.onClick} style={{ padding: '8px', cursor: 'pointer' }}>
                    {option.label}
                </div>
            ))}
        </div>
    );
};



export const CustomMenuPop = () => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

    const handleRightClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMenuPosition({ x: event.pageX, y: event.pageY });
        setMenuVisible(true);
    };

    const handleClickOutside = () => {
        setMenuVisible(false);
    };




    return (
        { handleRightClick, handleClickOutside, menuVisible, menuPosition }
    );

}