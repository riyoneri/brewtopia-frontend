import dayjs from "dayjs";
import Image from "next/image";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { GoDotFill } from "react-icons/go";

export default function NewOrderItem({
  products,
  displayId,
  total,
  createdAt,
}: OrderDto) {
  const formatedDate = dayjs(createdAt).format("D MMM YYYY");
  return (
    <div className="space-y-3 bg-white p-2">
      <div className="flex items-start">
        <div className="flex flex-1 gap-2">
          <Image
            alt={`${products[0].product.imageUrl} Image`}
            src={products[0].product.imageUrl}
            height={50}
            width={50}
            className="size-10 rounded-full"
          />
          <div className="grid">
            <span className="font-medium">#{displayId}</span>
            <span className="text-sm text-neutral-500">
              {products.length} Items
            </span>
          </div>
        </div>
        <span className="border border-primary p-2 text-primary">
          <FaArrowUpRightFromSquare />
        </span>
      </div>
      <div className="flex items-center gap-1">
        <span className="font-medium text-primary">${total}</span>
        <GoDotFill className="text-xs" />
        <span className="text-neutral-500">{formatedDate}</span>
      </div>
    </div>
  );
}
