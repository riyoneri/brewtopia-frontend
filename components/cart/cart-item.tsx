import Image from "next/image";
import Link from "next/link";
import { FaMinus, FaPlus } from "react-icons/fa6";

export default function CartItem({
  totalPrice,
  product: { id: productId, description, imageUrl, name },
  quantity,
}: CartItemDto) {
  return (
    <tr>
      <td className="flex gap-5">
        <Image
          src={imageUrl}
          height={100}
          width={100}
          alt={`${name} Image`}
          className="h-12 min-w-24 object-cover"
        />
        <div>
          <Link
            href={`menu/${productId}`}
            className="whitespace-nowrap text-lg font-medium hover:underline"
          >
            {name}
          </Link>
          <p className="line-clamp-1 text-neutral-400">{description}</p>
        </div>
      </td>
      <td>
        <div className="flex items-center gap-1 border-2 border-primary/50 p-1 ">
          <button className="self-stretch px-1 transition-colors hover:bg-tertiary">
            <FaPlus />
          </button>
          <input
            type="number"
            name=""
            className="max-w-10 flex-1 text-center outline-none"
            id=""
            value={quantity}
            max="999"
            readOnly
          />
          <button className="self-stretch px-1 transition-colors hover:bg-tertiary">
            <FaMinus />
          </button>
        </div>
      </td>
      <td className="text-center">${totalPrice}</td>
    </tr>
  );
}
