import { faker } from "@faker-js/faker";
import dayjs from "dayjs";

const minimumDate = dayjs().subtract(3, "months").toISOString();
const maximumDate = dayjs().add(7, "months").toISOString();

const startDate = faker.date
  .between({ from: minimumDate, to: maximumDate })
  .toISOString();

const Discounts: DiscountDto[] = [
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
  {
    id: faker.string.uuid(),
    startDate,
    endDate: dayjs(startDate).add(1, "month").toISOString(),
    name: faker.word.words(2),
    status: faker.word.words(1),
  },
];

export default Discounts;
