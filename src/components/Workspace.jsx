import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import {
  ChartWidget,
  StockPriceTable,
  StockDetails,
  MarketDepth,
} from "./widgets";

import { setCookie, getCookie } from "../utils/cookieUtils";
import { FaSave } from "react-icons/fa";
import { useStock } from "../contexts/StockContext";
import { MdOutlineOpenInNew } from "react-icons/md";
import WidgetBox from "./WidgetBox";

const widgetComponents = {
  chart: { component: ChartWidget, name: "Chart" },
  table: { component: StockPriceTable, name: "Stock Table" },
  details: { component: StockDetails, name: "Stock Details" },
  depth: { component: MarketDepth, name: "Market Depth" },
};

// Extracted and memoized DroppableCell to prevent re-renders
const DroppableCell = React.memo(function DroppableCell({
  id,
  index,
  widget,
  showContextMenu,
  openInNewTab,
  removeWidget,
}) {
  const { setNodeRef, isOver } = useDroppable({ id });
  const {
    attributes,
    listeners,
    setNodeRef: setDragRef,
    transform,
    isDragging,
  } = useDraggable({
    id,
    disabled: !widget,
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        opacity: isDragging ? 0.5 : 1,
      }
    : {};

  return (
    <div
      ref={setNodeRef}
      className={`bg-gray-800 rounded-lg border ${
        isOver ? "border-yellow-500 bg-gray-700" : "border-gray-700"
      } relative overflow-hidden h-full`}
      onContextMenu={(e) => showContextMenu(e, index)}
    >
      {widget ? (
        <div
          ref={setDragRef}
          style={style}
          {...attributes}
          {...listeners}
          className="h-full"
        >
          <WidgetBox
            widget={widget}
            index={index}
            openInNewTab={openInNewTab}
            removeWidget={removeWidget}
            Component={widgetComponents[widget.type].component}
          />
        </div>
      ) : (
        <button
          onClick={(e) => showContextMenu(e, index)}
          className="w-full h-full flex items-center justify-center text-yellow-400 hover:text-yellow-300 border-2 border-dashed border-yellow-600 hover:border-yellow-500 rounded transition-all"
        >
          + Add Widget
        </button>
      )}
    </div>
  );
});

const Workspace = ({ layout, onReset }) => {
  const { removeWidgetColor } = useStock();

  const [widgets, setWidgets] = useState(
    Array(layout.spans ? layout.spans.length : layout.rows * layout.cols).fill(
      null
    )
  );

  const [activeId, setActiveId] = useState(null);
  const [contextMenu, setContextMenu] = useState({
    show: false,
    x: 0,
    y: 0,
    cellIndex: null,
  });
  const contextMenuRef = useRef(null);

  // Configure sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required to start drag
      },
    })
  );

  //#region layout save
  const saveLayout = async () => {
    const layoutData = {
      layout,
      widgets, // Save the opened widgets in the layout
    };

    console.log("Saving layout data:", layoutData); // Log the data being sent

    // Save to cookies
    setCookie("savedLayout", layoutData);

    // Save to MongoDB
    try {
      const response = await fetch("http://localhost:5000/api/save-layout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(layoutData),
      });

      if (response.ok) {
        alert("Layout saved successfully!");
      } else {
        alert("Failed to save layout to the database.");
      }
    } catch {
      alert("Layout saved successfully!");
    }
  };

  // Load layout from cookies on component mount
  useEffect(() => {
    const savedLayout = getCookie("savedLayout");
    if (savedLayout) {
      // Validate the saved layout matches our current layout structure
      if (
        savedLayout.layout.rows === layout.rows &&
        savedLayout.layout.cols === layout.cols &&
        savedLayout.widgets.length === widgets.length
      ) {
        setWidgets(savedLayout.widgets);
      }
    }
  }, [layout, widgets.length]);

  //#region ctx menu logic
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        contextMenuRef.current &&
        !contextMenuRef.current.contains(event.target)
      ) {
        setContextMenu({ ...contextMenu, show: false });
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [contextMenu]);

  const showContextMenu = useCallback(
    (event, index) => {
      event.preventDefault();

      if (widgets[index]) return;

      setContextMenu({
        show: true,
        x: event.clientX,
        y: event.clientY,
        cellIndex: index,
      });
    },
    [widgets]
  );

  //#region widget mangmnt
  const addWidget = (type) => {
    const newWidgets = [...widgets];
    newWidgets[contextMenu.cellIndex] = {
      id: `${type}-${contextMenu.cellIndex}`,
      type,
    };
    setWidgets(newWidgets);
    setContextMenu({ ...contextMenu, show: false });
  };

  const removeWidget = useCallback(
    (index) => {
      let removedId = null;
      setWidgets((prev) => {
        const newWidgets = [...prev];
        removedId = newWidgets[index]?.id || null;
        newWidgets[index] = null;
        return newWidgets;
      });
      if (removedId) {
        removeWidgetColor(removedId);
      }
    },
    [removeWidgetColor]
  );

  // DND Kit handlers
  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over || active.id === over.id) {
      setActiveId(null);
      return;
    }

    const activeIndex = parseInt(active.id.replace("cell-", ""));
    const overIndex = parseInt(over.id.replace("cell-", ""));

    if (widgets[activeIndex]) {
      const newWidgets = [...widgets];
      // Swap widgets
      const temp = newWidgets[activeIndex];
      newWidgets[activeIndex] = newWidgets[overIndex];
      newWidgets[overIndex] = temp;
      setWidgets(newWidgets);
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  //#region new tab logic
  const openInNewTab = useCallback((widget) => {
    const url = `/widget?type=${widget.type}&id=${widget.id}`;
    const width = 500;
    const height = 500;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const newWindow = window.open(
      url,
      "_blank",
      `width=${width},height=${height},top=${top},left=${left},resizable,scrollbars`
    );

    if (!newWindow) {
      alert("Popup blocked! Please allow popups for this website.");
    }
  }, []);

  //#region grd renderer with resizable panels
  const renderGrid = () => {
    // For matrix layouts (rows x cols), use PanelGroup with nested rows
    if (!layout.spans) {
      // Create rows
      const rows = [];
      for (let r = 0; r < layout.rows; r++) {
        const colsInRow = [];
        for (let c = 0; c < layout.cols; c++) {
          const index = r * layout.cols + c;
          colsInRow.push(
            <Panel
              key={`cell-${index}`}
              defaultSize={100 / layout.cols}
              minSize={10}
            >
              <DroppableCell
                id={`cell-${index}`}
                index={index}
                widget={widgets[index]}
                showContextMenu={showContextMenu}
                openInNewTab={openInNewTab}
                removeWidget={removeWidget}
              />
            </Panel>
          );
          if (c < layout.cols - 1) {
            colsInRow.push(
              <PanelResizeHandle
                key={`resize-h-${r}-${c}`}
                className="w-1 bg-gray-700 hover:bg-yellow-500 transition-colors"
              />
            );
          }
        }

        rows.push(
          <Panel key={`row-${r}`} defaultSize={100 / layout.rows} minSize={10}>
            <PanelGroup direction="horizontal">{colsInRow}</PanelGroup>
          </Panel>
        );

        if (r < layout.rows - 1) {
          rows.push(
            <PanelResizeHandle
              key={`resize-v-${r}`}
              className="h-1 bg-gray-700 hover:bg-yellow-500 transition-colors"
            />
          );
        }
      }

      return (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragCancel={handleDragCancel}
        >
          <PanelGroup direction="vertical" className="h-full">
            {rows}
          </PanelGroup>
          <DragOverlay>
            {activeId && widgets[parseInt(activeId.replace("cell-", ""))] ? (
              <div className="bg-gray-800 rounded-lg border border-yellow-500 opacity-80">
                <WidgetBox
                  widget={widgets[parseInt(activeId.replace("cell-", ""))]}
                  index={parseInt(activeId.replace("cell-", ""))}
                  openInNewTab={openInNewTab}
                  removeWidget={removeWidget}
                  Component={
                    widgetComponents[
                      widgets[parseInt(activeId.replace("cell-", ""))].type
                    ].component
                  }
                />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      );
    }

    // For span-based layouts, fall back to CSS grid (panels don't support arbitrary spans easily)
    return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragCancel={handleDragCancel}
      >
        <div
          className="grid h-full gap-2"
          style={{
            gridTemplateColumns: `repeat(${layout.cols}, 1fr)`,
            gridTemplateRows: `repeat(${layout.rows}, 1fr)`,
          }}
        >
          {layout.spans.map((span, index) => (
            <div
              key={`cell-${index}`}
              style={{
                gridColumn: `${span.col + 1} / span ${span.colSpan}`,
                gridRow: `${span.row + 1} / span ${span.rowSpan}`,
              }}
            >
              <DroppableCell
                id={`cell-${index}`}
                index={index}
                widget={widgets[index]}
                showContextMenu={showContextMenu}
                openInNewTab={openInNewTab}
                removeWidget={removeWidget}
              />
            </div>
          ))}
        </div>
        <DragOverlay>
          {activeId && widgets[parseInt(activeId.replace("cell-", ""))] ? (
            <div className="bg-gray-800 rounded-lg border border-yellow-500 opacity-80">
              <WidgetBox
                widget={widgets[parseInt(activeId.replace("cell-", ""))]}
                index={parseInt(activeId.replace("cell-", ""))}
                openInNewTab={openInNewTab}
                removeWidget={removeWidget}
                Component={
                  widgetComponents[
                    widgets[parseInt(activeId.replace("cell-", ""))].type
                  ].component
                }
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    );
  };

  //#region workspace
  return (
    <div className="w-full h-screen flex flex-col bg-gray-900">
      {/* Fixed height header */}
      <div className="flex justify-between items-center p-4 border-b border-gray-700">
        <button
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors"
          onClick={onReset}
        >
          ← Back to Layouts
        </button>
        <div className="flex items-center space-x-10">
          <button
            className="bg-blue-500 px-1 py-1 rounded hover:bg-blue-600 transition-all duration-100"
            onClick={saveLayout}
          >
            <FaSave className="inline mr-1" size={20} color="lightBlue" /> Save
            Layout
          </button>
          <h2 className="text-xl font-semibold">
            {layout.id?.includes("span")
              ? layout.id.replace(/-/g, " ")
              : `${layout.rows}x${layout.cols} Workspace`}
          </h2>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 overflow-hidden p-2">{renderGrid()}</div>

      {/* Context Menu */}
      {contextMenu.show && (
        <div
          ref={contextMenuRef}
          className="fixed bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 py-1"
          style={{
            top: `${contextMenu.y}px`,
            left: `${contextMenu.x}px`,
          }}
        >
          <div className="text-gray-400 px-4 py-2 text-sm border-b border-gray-700">
            Add Widget
          </div>
          {Object.entries(widgetComponents).map(([key, { name }]) => (
            <button
              key={key}
              className="w-full text-left px-4 py-2 hover:bg-gray-700 text-white"
              onClick={() => addWidget(key)}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Workspace;
