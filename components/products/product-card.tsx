import Image from "next/image";
import Link from "next/link";

export default function ProductCard({
  name,
  imageUrl,
  price,
  hasDiscountInApp,
  previousPrice,
}: ProductDto) {
  return (
    <Link href="/" className="flex flex-col gap-0.5">
      <Image
        src={imageUrl}
        className="max-h-72 w-full object-cover sm:max-h-60"
        height={500}
        width={500}
        alt={`${name} Image`}
      />
      <p className="mt-1 font-medium uppercase">{name}</p>
      <div className="flex items-center gap-1">
        <span className="text-lg font-medium sm:text-xl">${price}</span>
        {previousPrice && (
          <span className="text-sm line-through">${previousPrice}</span>
        )}
      </div>
      {hasDiscountInApp && (
        <p className="text-sm text-primary">Get 20% Off in App</p>
      )}
    </Link>
  );
}
