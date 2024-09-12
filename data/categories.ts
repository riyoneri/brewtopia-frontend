import { faker } from "@faker-js/faker";

const Categories: CategoryDto[] = [
  {
    id: faker.string.uuid(),
    createdAt: faker.date.recent().toISOString(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date.recent().toISOString(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    createdAt: faker.date.recent().toISOString(),
    name: faker.commerce.department(),
  },
];

export default Categories;
