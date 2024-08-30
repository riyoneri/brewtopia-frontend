import { faker } from "@faker-js/faker";

const Workspaces: WorkspaceDto[] = [
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
  {
    id: faker.string.uuid(),
    imageUrl: faker.image.url(),
    name: faker.commerce.department(),
  },
];

export default Workspaces;
