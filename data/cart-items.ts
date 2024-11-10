import { faker } from "@faker-js/faker";

const CartItems: CartItemDto[] = [
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
  {
    id: faker.string.uuid(),
    product: {
      id: faker.string.uuid(),
      description: faker.commerce.productDescription(),
      imageUrl: faker.image.url(),
      name: faker.commerce.productName(),
      price: +faker.commerce.price({ min: 1, max: 10 }),
      quantity: 0,
      category: {
        id: faker.string.uuid(),
        name: faker.commerce.department(),
      },
    },
    quantity: faker.number.int({ min: 1, max: 20 }),
    totalPrice: faker.number.int({ min: 50, max: 150 }),
  },
];

export default CartItems;
