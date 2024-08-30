"use client";

import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { GoDotFill } from "react-icons/go";
import ReactTimeago from "react-timeago";

export default function NewsCard({ id, title, date, imageUrl }: NewsDto) {
  const newsDate = dayjs(date);

  return (
    <Link
      href={`${id}`}
      className="flex w-full flex-col items-stretch gap-5 xs:flex-row"
    >
      <Image
        src={imageUrl}
        width={500}
        height={500}
        className="max-h-40 object-cover xs:w-fit"
        alt={title}
      />
      <div className="flex-1">
        <p className="text-lg font-medium sm:text-2xl">{title}</p>
        <div className="flex flex-col gap-1 text-xs text-neutral-500 xs:flex-row xs:items-center xs:text-sm">
          <>
            <ReactTimeago date={newsDate.toISOString()} />
            <GoDotFill className="hidden text-xs xs:block" />
          </>
          <span>{newsDate.format("MMMM D, YYYY")}</span>
        </div>
      </div>
    </Link>
  );
}
