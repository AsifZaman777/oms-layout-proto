import React, { useMemo } from "react";
import { useWidgetStock, useWidgetColor } from "../../contexts/StockContext";

const MarketDepth = React.memo(function MarketDepth({ widgetId }) {
  const selectedStock = useWidgetStock(widgetId);
  const widgetColor = useWidgetColor(widgetId);

  console.log(`MarketDepth ID: ${widgetId}, Color: ${widgetColor}`);

  // Example bids and asks for demonstration
  const marketData = useMemo(() => {
    if (selectedStock?.symbol === "GOOGL") {
      return {
        bids: [
          { price: 2752.1, size: 1000, total: 1000 },
          { price: 2751.9, size: 800, total: 1800 },
          { price: 2751.7, size: 1200, total: 3000 },
          { price: 2751.5, size: 900, total: 3900 },
          { price: 2751.3, size: 1100, total: 5000 },
        ],
        asks: [
          { price: 2752.3, size: 700, total: 700 },
          { price: 2752.5, size: 900, total: 1600 },
          { price: 2752.7, size: 1100, total: 2700 },
          { price: 2752.9, size: 1300, total: 4000 },
          { price: 2753.1, size: 1000, total: 5000 },
        ],
      };
    } else if (selectedStock?.symbol === "AAPL") {
      return {
        bids: [
          { price: 154.31, size: 500, total: 500 },
          { price: 154.29, size: 300, total: 800 },
          { price: 154.27, size: 400, total: 1200 },
          { price: 154.25, size: 600, total: 1800 },
          { price: 154.23, size: 700, total: 2500 },
        ],
        asks: [
          { price: 154.33, size: 400, total: 400 },
          { price: 154.35, size: 600, total: 1000 },
          { price: 154.37, size: 800, total: 1800 },
          { price: 154.39, size: 1000, total: 2800 },
          { price: 154.41, size: 900, total: 3700 },
        ],
      };
    } else if (selectedStock?.symbol === "MSFT") {
      return {
        bids: [
          { price: 328.38, size: 200, total: 200 },
          { price: 328.36, size: 300, total: 500 },
          { price: 328.34, size: 400, total: 900 },
          { price: 328.32, size: 500, total: 1400 },
          { price: 328.3, size: 600, total: 2000 },
        ],
        asks: [
          { price: 328.4, size: 300, total: 300 },
          { price: 328.42, size: 400, total: 700 },
          { price: 328.44, size: 500, total: 1200 },
          { price: 328.46, size: 600, total: 1800 },
          { price: 328.48, size: 700, total: 2500 },
        ],
      };
    } else if (selectedStock?.symbol === "AMZN") {
      return {
        bids: [
          { price: 3345.2, size: 100, total: 100 },
          { price: 3345.1, size: 200, total: 300 },
          { price: 3345.0, size: 300, total: 600 },
          { price: 3344.9, size: 400, total: 1000 },
          { price: 3344.8, size: 500, total: 1500 },
        ],
        asks: [
          { price: 3345.3, size: 200, total: 200 },
          { price: 3345.4, size: 300, total: 500 },
          { price: 3345.5, size: 400, total: 900 },
          { price: 3345.6, size: 500, total: 1400 },
          { price: 3345.7, size: 600, total: 2000 },
        ],
      };
    } else if (selectedStock?.symbol === "TSLA") {
      return {
        bids: [
          { price: 1024.85, size: 50, total: 50 },
          { price: 1024.8, size: 100, total: 150 },
          { price: 1024.75, size: 150, total: 300 },
          { price: 1024.7, size: 200, total: 500 },
          { price: 1024.65, size: 250, total: 750 },
        ],
        asks: [
          { price: 1024.9, size: 100, total: 100 },
          { price: 1024.95, size: 150, total: 250 },
          { price: 1025.0, size: 200, total: 450 },
          { price: 1025.05, size: 250, total: 700 },
          { price: 1025.1, size: 300, total: 1000 },
        ],
      };
    } else if (selectedStock?.symbol === "NVDA") {
      return {
        bids: [
          { price: 678.89, size: 300, total: 300 },
          { price: 678.88, size: 400, total: 700 },
          { price: 678.87, size: 500, total: 1200 },
          { price: 678.86, size: 600, total: 1800 },
          { price: 678.85, size: 700, total: 2500 },
        ],
        asks: [
          { price: 678.9, size: 200, total: 200 },
          { price: 678.91, size: 300, total: 500 },
          { price: 678.92, size: 400, total: 900 },
          { price: 678.93, size: 500, total: 1400 },
          { price: 678.94, size: 600, total: 2000 },
        ],
      };
    } else if (selectedStock?.symbol === "NFLX") {
      return {
        bids: [
          { price: 500.0, size: 100, total: 100 },
          { price: 499.5, size: 200, total: 300 },
          { price: 499.0, size: 300, total: 600 },
          { price: 498.5, size: 400, total: 1000 },
          { price: 498.0, size: 500, total: 1500 },
        ],
        asks: [
          { price: 500.5, size: 200, total: 200 },
          { price: 501.0, size: 300, total: 500 },
          { price: 501.5, size: 400, total: 900 },
          { price: 502.0, size: 500, total: 1400 },
          { price: 502.5, size: 600, total: 2000 },
        ],
      };
    } else if (selectedStock?.symbol === "META") {
      return {
        bids: [
          { price: 350.0, size: 100, total: 100 },
          { price: 349.5, size: 200, total: 300 },
          { price: 349.0, size: 300, total: 600 },
          { price: 348.5, size: 400, total: 1000 },
          { price: 348.0, size: 500, total: 1500 },
        ],
        asks: [
          { price: 350.5, size: 200, total: 200 },
          { price: 351.0, size: 300, total: 500 },
          { price: 351.5, size: 400, total: 900 },
          { price: 352.0, size: 500, total: 1400 },
          { price: 352.5, size: 600, total: 2000 },
        ],
      };
    } else if (selectedStock?.symbol === "AMD") {
      return {
        bids: [
          { price: 120.0, size: 100, total: 100 },
          { price: 119.5, size: 200, total: 300 },
          { price: 119.0, size: 300, total: 600 },
          { price: 118.5, size: 400, total: 1000 },
          { price: 118.0, size: 500, total: 1500 },
        ],
        asks: [
          { price: 120.5, size: 200, total: 200 },
          { price: 121.0, size: 300, total: 500 },
          { price: 121.5, size: 400, total: 900 },
          { price: 122.0, size: 500, total: 1400 },
          { price: 122.5, size: 600, total: 2000 },
        ],
      };
    } else if (selectedStock?.symbol === "INTC") {
      return {
        bids: [
          { price: 456.77, size: 100, total: 100 },
          { price: 456.76, size: 200, total: 300 },
          { price: 456.75, size: 300, total: 600 },
          { price: 456.74, size: 400, total: 1000 },
          { price: 456.73, size: 500, total: 1500 },
        ],
        asks: [
          { price: 456.79, size: 200, total: 200 },
          { price: 456.8, size: 300, total: 500 },
          { price: 456.81, size: 400, total: 900 },
          { price: 456.82, size: 500, total: 1400 },
          { price: 456.83, size: 600, total: 2000 },
        ],
      };
    }
    return { bids: [], asks: [] }; // Default empty data for other stocks
  }, [selectedStock]);

  const { bids, asks } = marketData;

  const maxTotal = Math.max(
    ...bids.map((b) => b.total),
    ...asks.map((a) => a.total)
  );

  return (
    <div className="h-full p-4 bg-gray-800 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-blue-400">
        Market Depth {selectedStock ? `(${selectedStock.symbol})` : ""}
      </h3>
      <div className="text-sm">
        <div className="mb-1">
          {asks
            .slice()
            .reverse()
            .map((ask, i) => (
              <div key={i} className="flex mb-1">
                <div className="w-1/3 text-right pr-2 text-red-500">
                  {ask.price.toFixed(2)}
                </div>
                <div className="w-1/3 text-right pr-2">{ask.size}</div>
                <div className="w-1/3 relative">
                  <div
                    className="bg-red-900 h-5 absolute right-0"
                    style={{ width: `${(ask.total / maxTotal) * 100}%` }}
                  />
                  <span className="absolute right-1 text-xs">{ask.total}</span>
                </div>
              </div>
            ))}
        </div>

        <div className="text-center my-2 text-gray-400">
          Spread:{" "}
          {asks[0]?.price && bids[0]?.price
            ? (asks[0].price - bids[0].price).toFixed(2)
            : "N/A"}
        </div>

        <div className="mt-1">
          {bids.map((bid, i) => (
            <div key={i} className="flex mb-1">
              <div className="w-1/3 text-right pr-2 text-green-500">
                {bid.price.toFixed(2)}
              </div>
              <div className="w-1/3 text-right pr-2">{bid.size}</div>
              <div className="w-1/3 relative">
                <div
                  className="bg-green-900 h-5 absolute right-0"
                  style={{ width: `${(bid.total / maxTotal) * 100}%` }}
                />
                <span className="absolute right-1 text-xs">{bid.total}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default MarketDepth;
