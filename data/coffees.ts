import { faker } from "@faker-js/faker";

const Coffees: { id: string; imageUrl: string }[] = [
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
  { id: faker.string.uuid(), imageUrl: faker.image.url() },
];

export default Coffees;
