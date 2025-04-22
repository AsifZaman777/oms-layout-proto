import React, { useState } from "react";
import { useStock } from "../contexts/StockContext";

const colors = [
  { id: 1, name: "Red", hex: "#EE4B2B" },
  { id: 2, name: "Green", hex: "#cca300" },
  { id: 3, name: "Blue", hex: "#f2ccff" },
  { id: 4, name: "Yellow", hex: "#FFFF00" },
  { id: 5, name: "Purple", hex: "#ff33cc" },
];

const ColorSelector = ({ widgetId }) => {
  const [open, setOpen] = useState(false);

  const { widgetColors, updateWidgetColor } = useStock();

  // Get the current color for this widget from the StockContext
  const currentColorId = widgetColors[widgetId];
  const currentColor = colors.find((color) => color.id === currentColorId);

  const handleSelect = (color) => {
    setOpen(false);
    updateWidgetColor(widgetId, color.id); // Update the widget's color in the context
  };

  return (
    <div className="relative w-fit mx-auto">
      {/* Selected Color Circle */}
      <div
        onClick={() => setOpen(!open)}
        className="w-5 h-5 rounded-full cursor-pointer border-2 border-gray-400 shadow-md"
        style={{ backgroundColor: currentColor?.hex || "transparent" }}
      >
        {!currentColor && <span className="text-xs text-gray-500">?</span>}
      </div>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col gap-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 shadow-xl rounded-xl p-3 z-10 w-32">
          {colors.map((color) => (
            <div
              key={color.hex}
              onClick={() => handleSelect(color)}
              className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-md transition duration-150"
            >
              <div
                className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                style={{ backgroundColor: color.hex }}
              ></div>
              <span className="text-sm text-gray-800 dark:text-gray-200">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorSelector;