"use client";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import TimeAgo from "react-timeago";

export default function NewsHeadingCard({
  imageUrl,
  title,
  date,
  id,
}: NewsDto & { className?: string }) {
  const newsDate = dayjs(date);
  return (
    <Link href={`/news/${id}`} className="card-with-shadows flex flex-col">
      <Image
        src={imageUrl}
        className="max-h-96 w-full object-cover object-top"
        height={1000}
        width={1000}
        alt={title}
      />
      <h3 className="mt-3 text-lg font-medium xs:text-2xl">{title}</h3>
      <div className="flex flex-col gap-1 text-sm text-neutral-500 xs:flex-row xs:items-center">
        <>
          <TimeAgo date={newsDate.toISOString()} />
          <GoDotFill className="hidden text-xs xs:block" />
        </>
        <span>{newsDate.format("MMMM D, YYYY")}</span>
      </div>
    </Link>
  );
}
