import Link from "next/link";

export default function CheckoutItem({
  product,
  quantity,
  totalPrice,
}: CartItemDto) {
  return (
    <div className="space-y-1">
      <Link
        href={`/menu/${product.id}`}
        className="line-clamp-1 text-neutral-500 underline"
      >
        {product.name}
      </Link>
      <div className="space-x-10 font-medium">
        <span>{quantity}x</span>
        <span>${totalPrice}</span>
      </div>
    </div>
  );
}
