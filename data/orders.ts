import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

import CartItems from "./cart-items";

const minimumDate = dayjs().subtract(3, "months").toISOString();
const maximumDate = dayjs().add(7, "months").toISOString();
const status = ["Processed", "Shipped", "Delivered"];

const Orders: OrderDto[] = [
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
    paymentMethod: faker.helpers.arrayElement([
      "Credit or Debit Card",
      "MTN Mobile Money",
    ]),
    status: faker.helpers.arrayElement(status),
    products: faker.helpers.arrayElements(CartItems, {
      min: 3,
      max: CartItems.length - 1,
    }),
    total: faker.number.int({ min: 50, max: 150 }),
  },
];

export default Orders;
