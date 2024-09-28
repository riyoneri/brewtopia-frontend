import { ORDER_STATUS } from "./enums";

export const productsPriceRanges = [
  { key: "0", text: "Price range", min: 0, max: 0 },
  { key: "1", text: "$1 - $10", min: 1, max: 10 },
  { key: "2", text: "$10 - $20", min: 10, max: 20 },
  { key: "4", text: "$20 - $30", min: 20, max: 30 },
  { key: "5", text: "$30 - $40", min: 30, max: 40 },
  { key: "6", text: "$40 - $50", min: 40, max: 50 },
];

export const productsSorts = [
  {
    key: "0",
    direction: 1,
    property: "none",
    text: "Sorts",
  },
  { key: "1", direction: 1, property: "name", text: "Name (A-Z)" },
  { key: "2", direction: -1, property: "name", text: "Name (Z-A)" },
  { key: "3", direction: 1, property: "price", text: "Price: Low to High" },
  { key: "4", direction: -1, property: "price", text: "Price: High to Low" },
  { key: "5", direction: 1, property: "sellCount", text: "Best Seller" },
  { key: "6", direction: 1, property: "createdAt", text: "Newest Arrivals" },
];

export const orderStatus = [
  { key: "all", text: "All" },
  { key: "processed", text: ORDER_STATUS.PROCESSED },
  { key: "new", text: "New Orders" },
];

export const rowsPerPageSelections = [
  { key: "5", text: "5" },
  { key: "10", text: "10" },
  { key: "15", text: "15" },
];
