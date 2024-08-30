import { faker } from "@faker-js/faker";

const News: NewsDto[] = [
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
  {
    id: faker.string.uuid(),
    title: faker.lorem.lines(1),
    description: faker.lorem.paragraphs(),
    date: faker.date.past().toJSON(),
    imageUrl: faker.image.url(),
  },
];

export default News;
