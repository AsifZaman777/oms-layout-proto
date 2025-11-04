import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";

const StockContext = createContext();

export const StockProvider = ({ children }) => {
  const [widgetStocks, setWidgetStocks] = useState(() => {
    return JSON.parse(localStorage.getItem("widgetStocks") || "{}");
  });

  const [widgetColors, setWidgetColors] = useState(() => {
    return JSON.parse(localStorage.getItem("widgetColors") || "{}");
  });

  // Sync incoming changes from other tabs
  useEffect(() => {
    const syncFromStorage = (event) => {
      if (event.key === "widgetStocks") {
        setWidgetStocks(JSON.parse(event.newValue || "{}"));
      } else if (event.key === "widgetColors") {
        setWidgetColors(JSON.parse(event.newValue || "{}"));
      }
    };
    window.addEventListener("storage", syncFromStorage);
    return () => window.removeEventListener("storage", syncFromStorage);
  }, []);

  //funtion to update the widget color and save it in local storage
  const updateWidgetColor = useCallback((widgetId, colorId) => {
    setWidgetColors((prev) => {
      const updatedColors = { ...prev, [widgetId]: colorId };
      localStorage.setItem("widgetColors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  }, []);

  //function to remove the widget color and save it in local storage
  const removeWidgetColor = useCallback((widgetId) => {
    setWidgetColors((prev) => {
      const updatedColors = { ...prev };
      delete updatedColors[widgetId];
      localStorage.setItem("widgetColors", JSON.stringify(updatedColors));
      return updatedColors;
    });
  }, []);

  //function to update the selected stock for the widget and save it in local storage
  const updateSelectedStock = useCallback((stock, widgetId) => {
    // Read current colors snapshot safely
    setWidgetStocks((prevStocks) => {
      const colors = JSON.parse(localStorage.getItem("widgetColors") || "{}");
      const widgetColor = colors[widgetId];
      const matchingWidgets = Object.keys(colors).filter(
        (id) => colors[id] === widgetColor
      );

      if (matchingWidgets.length > 0) {
        const updatedStocks = { ...prevStocks };
        matchingWidgets.forEach((id) => {
          updatedStocks[id] = stock;
        });
        localStorage.setItem("widgetStocks", JSON.stringify(updatedStocks));
        return updatedStocks;
      }
      return prevStocks;
    });
  }, []);

  const contextValue = useMemo(
    () => ({
      widgetStocks,
      widgetColors,
      updateWidgetColor,
      updateSelectedStock,
      removeWidgetColor,
    }),
    [
      widgetStocks,
      widgetColors,
      updateWidgetColor,
      updateSelectedStock,
      removeWidgetColor,
    ]
  );

  return (
    <StockContext.Provider value={contextValue}>
      {children}
    </StockContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStock = () => useContext(StockContext);

// Selector hooks to prevent unnecessary re-renders
// eslint-disable-next-line react-refresh/only-export-components
export const useWidgetStock = (widgetId) => {
  const { widgetStocks } = useStock();
  return useMemo(() => widgetStocks[widgetId], [widgetStocks, widgetId]);
};

// eslint-disable-next-line react-refresh/only-export-components
export const useWidgetColor = (widgetId) => {
  const { widgetColors } = useStock();
  return useMemo(() => widgetColors[widgetId], [widgetColors, widgetId]);
};

// import { createContext, useContext, useState } from 'react';

// const StockContext = createContext();

// export const StockProvider = ({ children }) => {
//   const [widgetStocks, setWidgetStocks] = useState({}); // Track selected stock for each widget
//   const [widgetColors, setWidgetColors] = useState({}); // Track widget colors by widget ID

//   // function to update widget color
//   const updateWidgetColor = (widgetId, colorId) => {
//     setWidgetColors((prevColors) => ({
//       ...prevColors,
//       [widgetId]: colorId,
//     }));
//   };

//   // function to remove widget color of the removed widget
//   const removeWidgetColor = (widgetId) => {
//     setWidgetColors((prevColors) => {
//       const updatedColors = { ...prevColors };
//       delete updatedColors[widgetId];
//       return updatedColors;
//     });
//   };

//   console.log('Widget Colors:', widgetColors);

//   //#region state updt logic
//   const updateSelectedStock = (stock, widgetId) => {
//     const widgetColor = widgetColors[widgetId];
//     console.log(`Widget ID: ${widgetId}, Color ID: ${widgetColor}`);
//     console.log('Current Widget Colors:', widgetColors);

//     // Find all widgets with the same color
//     const matchingWidgets = Object.keys(widgetColors).filter(
//       (id) => widgetColors[id] === widgetColor
//     );

//     //update the states for all the matching color widgets
//     if (matchingWidgets.length > 1) {
//       console.log(`Matching Widgets Found: ${matchingWidgets}`);
//       setWidgetStocks((prevStocks) => {
//         const updatedStocks = { ...prevStocks };
//         matchingWidgets.forEach((id) => {
//           updatedStocks[id] = stock;
//         });
//         return updatedStocks;
//       });
//     } else {
//       console.log('No matching widgets with the same color.');
//     }
//   };

//   return (
//     <StockContext.Provider
//       value={{
//         widgetStocks,
//         widgetColors,
//         updateWidgetColor,
//         updateSelectedStock,
//         removeWidgetColor,
//       }}
//     >
//       {children}
//     </StockContext.Provider>
//   );
// };

// export const useStock = () => useContext(StockContext);
