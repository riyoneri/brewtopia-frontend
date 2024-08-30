import classNames from "classnames";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";

export default function EventCard({
  date,
  imageUrl,
  name,
  className,
}: EventDto & { className?: string }) {
  const formatedDate = dayjs(date).format("D MM YYYY");
  return (
    <Link href="/" className={classNames(className, "relative")}>
      <div className="absolute left-0 top-0 grid max-w-full bg-white p-1 xs:px-2">
        <span className="font-medium uppercase">{name}</span>
        <span className="text-xs text-primary xs:text-sm">{formatedDate}</span>
      </div>
      <Image
        src={imageUrl}
        className="max-h-72 w-full object-cover"
        height={800}
        width={500}
        alt={`${name} image`}
      />
    </Link>
  );
}
