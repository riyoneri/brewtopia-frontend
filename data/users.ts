import { faker } from "@faker-js/faker";

const Users: UserDto[] = [
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    active: faker.datatype.boolean(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    active: faker.datatype.boolean(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    active: faker.datatype.boolean(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    active: faker.datatype.boolean(),
  },
  {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    email: faker.internet.email().toLowerCase(),
    active: faker.datatype.boolean(),
  },
];

export default Users;
