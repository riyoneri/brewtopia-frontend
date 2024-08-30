import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const minimumDate = dayjs().subtract(3, "months").toISOString();
const maximumDate = dayjs().add(7, "months").toISOString();

const Events: EventDto[] = [
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    date: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    date: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    date: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    date: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.productName(),
    date: faker.date
      .between({ from: minimumDate, to: maximumDate })
      .toISOString(),
  },
];

export default Events;
