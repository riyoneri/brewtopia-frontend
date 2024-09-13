import { faker } from "@faker-js/faker";

const Products: ProductDto[] = [
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: 0,
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    hasDiscountInApp: true,
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    previousPrice: +faker.commerce.price({ min: 10, max: 20 }),
    hasDiscountInApp: true,
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
  {
    id: faker.string.uuid(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    price: +faker.commerce.price({ min: 1, max: 10 }),
    quantity: faker.number.int({ min: 0, max: 10_000 }),
  },
];

export default Products;
