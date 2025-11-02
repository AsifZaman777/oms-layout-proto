import React from "react";
import { MdOutlineOpenInNew } from "react-icons/md";
import ColorSelector from "./ColorSelector";

const WidgetBox = ({
  widget,
  index,
  openInNewTab,
  removeWidget,
  renderWidget,
}) => {
  return (
    <div className="h-full flex flex-col">
      {/* Widget Header */}
      <div className="flex justify-between border-b border-gray-700 p-2">
        <span className="text-xs text-gray-400">{widget.type} Widget</span>
        <div className="flex items-center space-x-2 gap-5">
          {/* Open in New Tab Button */}
          <button
            onClick={() => openInNewTab(widget)}
            className="text-xs bg-gray-700 hover:bg-gray-500 px-2 py-1 rounded"
          >
            <MdOutlineOpenInNew size={20} color="white" />
          </button>
          {/* Color Selector */}
          <ColorSelector widgetId={widget.id} />
          {/* Remove Widget Button */}
          <button
            onClick={() => removeWidget(index)}
            className="text-xs bg-red-700 hover:bg-red-500 px-2 py-1 rounded"
          >
            X
          </button>
        </div>
      </div>

      {/* Widget Content */}
      <div className="flex-1 overflow-auto">{renderWidget(widget)}</div>
    </div>
  );
};

export default WidgetBox;
