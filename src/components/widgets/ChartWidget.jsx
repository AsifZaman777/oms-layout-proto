import React, { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useWidgetStock, useWidgetColor } from "../../contexts/StockContext";

// Register Chart.js components
ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

const ChartWidget = React.memo(function ChartWidget({ widgetId }) {
  const selectedStock = useWidgetStock(widgetId);
  const widgetColor = useWidgetColor(widgetId);

  console.log(`ChartWidget ID: ${widgetId}, Color: ${widgetColor}`);

  // Mock data for different stocks
  const stockChartData = useMemo(() => {
    if (selectedStock?.symbol === "AAPL") {
      return [
        { time: "9:30", open: 150, high: 155, low: 148, close: 153 },
        { time: "10:00", open: 153, high: 156, low: 151, close: 154 },
        { time: "10:30", open: 154, high: 158, low: 153, close: 157 },
        { time: "11:00", open: 157, high: 159, low: 155, close: 156 },
        { time: "11:30", open: 156, high: 157, low: 152, close: 154 },
      ];
    } else if (selectedStock?.symbol === "GOOGL") {
      return [
        { time: "9:30", open: 2750, high: 2760, low: 2745, close: 2755 },
        { time: "10:00", open: 2755, high: 2765, low: 2750, close: 2760 },
        { time: "10:30", open: 2760, high: 2770, low: 2755, close: 2765 },
        { time: "11:00", open: 2765, high: 2775, low: 2760, close: 2770 },
        { time: "11:30", open: 2770, high: 2780, low: 2765, close: 2775 },
      ];
    } else if (selectedStock?.symbol === "MSFT") {
      return [
        { time: "9:30", open: 330, high: 335, low: 328, close: 332 },
        { time: "10:00", open: 332, high: 336, low: 330, close: 334 },
        { time: "10:30", open: 334, high: 338, low: 331, close: 336 },
        { time: "11:00", open: 336, high: 340, low: 335, close: 339 },
        { time: "11:30", open: 339, high: 341, low: 334, close: 337 },
      ];
    } else if (selectedStock?.symbol === "AMZN") {
      return [
        { time: "9:30", open: 3300, high: 3350, low: 3280, close: 3325 },
        { time: "10:00", open: 3325, high: 3360, low: 3300, close: 3350 },
        { time: "10:30", open: 3350, high: 3380, low: 3325, close: 3375 },
        { time: "11:00", open: 3375, high: 3400, low: 3350, close: 3390 },
        { time: "11:30", open: 3390, high: 3410, low: 3350, close: 3405 },
      ];
    } else if (selectedStock?.symbol === "TSLA") {
      return [
        { time: "9:30", open: 700, high: 710, low: 695, close: 705 },
        { time: "10:00", open: 705, high: 715, low: 700, close: 710 },
        { time: "10:30", open: 710, high: 720, low: 705, close: 715 },
        { time: "11:00", open: 715, high: 725, low: 710, close: 720 },
        { time: "11:30", open: 720, high: 730, low: 715, close: 725 },
      ];
    } else if (selectedStock?.symbol === "NFLX") {
      return [
        { time: "9:30", open: 500, high: 510, low: 495, close: 505 },
        { time: "10:00", open: 505, high: 515, low: 500, close: 510 },
        { time: "10:30", open: 510, high: 520, low: 505, close: 515 },
        { time: "11:00", open: 515, high: 525, low: 510, close: 520 },
        { time: "11:30", open: 520, high: 530, low: 515, close: 525 },
      ];
    } else if (selectedStock?.symbol === "META") {
      return [
        { time: "9:30", open: 300, high: 310, low: 295, close: 305 },
        { time: "10:00", open: 305, high: 315, low: 300, close: 310 },
        { time: "10:30", open: 310, high: 320, low: 305, close: 315 },
        { time: "11:00", open: 315, high: 325, low: 310, close: 320 },
        { time: "11:30", open: 320, high: 330, low: 315, close: 325 },
      ];
    } else if (selectedStock?.symbol === "NVDA") {
      return [
        { time: "9:30", open: 200, high: 210, low: 195, close: 205 },
        { time: "10:00", open: 205, high: 215, low: 200, close: 210 },
        { time: "10:30", open: 210, high: 220, low: 205, close: 215 },
        { time: "11:00", open: 215, high: 225, low: 210, close: 220 },
        { time: "11:30", open: 220, high: 230, low: 215, close: 225 },
      ];
    } else if (selectedStock?.symbol === "AMD") {
      return [
        { time: "9:30", open: 100, high: 110, low: 95, close: 105 },
        { time: "10:00", open: 105, high: 115, low: 100, close: 110 },
        { time: "10:30", open: 110, high: 120, low: 105, close: 115 },
        { time: "11:00", open: 115, high: 125, low: 110, close: 120 },
        { time: "11:30", open: 120, high: 130, low: 115, close: 125 },
      ];
    } else if (selectedStock?.symbol === "INTC") {
      return [
        { time: "9:30", open: 500, high: 510, low: 495, close: 505 },
        { time: "10:00", open: 505, high: 515, low: 500, close: 510 },
        { time: "10:30", open: 510, high: 520, low: 505, close: 515 },
        { time: "11:00", open: 515, high: 525, low: 510, close: 520 },
        { time: "11:30", open: 520, high: 530, low: 515, close: 525 },
      ];
    }
    return [];
  }, [selectedStock]);

  // Prepare data for Chart.js
  const labels = stockChartData.map((data) => data.time);
  const data = {
    labels,
    datasets: [
      {
        label: "High",
        data: stockChartData.map((data) => data.high),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Low",
        data: stockChartData.map((data) => data.low),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Allow the chart to fill the container
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    <div className="h-full p-4 bg-neutral-950 rounded-lg">
      <h3 className="text-lg font-semibold mb-3 text-blue-400">
        {selectedStock ? `${selectedStock.symbol} Chart` : "Select a Stock"}
      </h3>
      <div className="h-64 w-full">
        {stockChartData.length > 0 ? (
          <Chart type="bar" data={data} options={options} />
        ) : (
          <p className="text-gray-400 text-center">
            No data available for the selected stock.
          </p>
        )}
      </div>
      {selectedStock && (
        <div className="mt-2 flex justify-between text-sm">
          <span className="text-green-500">+2.5%</span>
          <span>{selectedStock.price} USD</span>
        </div>
      )}
    </div>
  );
});

export default ChartWidget;
