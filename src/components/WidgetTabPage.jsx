import React from "react";
import {
  ChartWidget,
  StockPriceTable,
  StockDetails,
  MarketDepth,
} from "./widgets";
import WidgetBox from "./WidgetBox"; // Import the reusable WidgetBox component

const widgetComponents = {
  chart: ChartWidget,
  table: StockPriceTable,
  details: StockDetails,
  depth: MarketDepth,
};

const WidgetTabPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const Component = widgetComponents[type];
  if (!Component) return <div>Invalid widget type</div>;

  // Mock functions for WidgetBox props
  const openInNewTab = () => alert("Already in a new tab!");
  const removeWidget = () => alert("Cannot remove widget in this tab!");

  // Mock widget data
  const widget = { id, type };

  return (
    <div className="w-full h-screen bg-gray-900 p-5 text-white">
      <h1 className="text-xl mb-4">Widget: {type}</h1>
      <div className="border border-gray-700 p-4 rounded bg-gray-800 h-[85%] overflow-auto">
        <WidgetBox
          widget={widget}
          index={0} // Index is not relevant here, so we use 0
          openInNewTab={openInNewTab}
          removeWidget={removeWidget}
          Component={Component}
        />
      </div>
    </div>
  );
};

export default WidgetTabPage;
