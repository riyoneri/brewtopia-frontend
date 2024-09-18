import Image from "next/image";
import Link from "next/link";

export default function OrderProductItem({
  id,
  product,
  quantity,
}: CartItemDto) {
  return (
    <div className="flex items-center gap-5">
      <Image
        src={product.imageUrl}
        className="size-16 object-cover sm:size-20"
        height={100}
        width={100}
        alt={`${product.name} Image`}
      />
      <div className="flex flex-1 items-center py-1">
        <div className="grid flex-1 gap-1">
          <Link
            href={`/menu/${id}`}
            className="w-fit font-medium hover:underline xs:text-lg sm:text-xl"
          >
            {product.name}
          </Link>
          <p className="line-clamp-1 text-sm text-neutral-400 xs:text-base">
            {product.description}
          </p>
          <p className="text-sm font-medium">
            {quantity} x ${product.price}
          </p>
        </div>
        <span className="text-lg">${quantity * product.price}</span>
      </div>
    </div>
  );
}
