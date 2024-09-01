import { faker } from "@faker-js/faker";

const Notifications: NotificationDto[] = [
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
  { id: faker.string.uuid(), link: "", message: faker.lorem.lines(1) },
];

export default Notifications;
