import { faker } from "@faker-js/faker";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({}) {
  return (
    <Link href="/" className="flex flex-col gap-1">
      <Image
        src={faker.image.url()}
        className="max-h-48 w-full object-cover sm:max-h-60"
        height={500}
        width={500}
        alt="Image"
      />
      <p className="font-medium uppercase">{faker.commerce.productName()}</p>
      <p className="text-lg font-medium sm:text-xl">
        ${faker.commerce.price({ min: 1, max: 50 })}
      </p>
      <p className="text-primary">Get 20% Off in App</p>
    </Link>
  );
}
