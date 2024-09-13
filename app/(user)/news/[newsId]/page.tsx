"use client";

import NewsCard from "@/components/news/news-card";
import News from "@/data/news";
import dayjs from "dayjs";
import Image from "next/image";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function NewsDetails() {
  const news = News[0];
  const newsDate = dayjs(news.date);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <div className="*:py-10">
      <div className="maximum-width flex flex-col items-center gap-3 text-center xs:gap-5">
        <h3 className="main-heading text-pretty">{news.title}</h3>
        <p className="text-neutral-500 sm:text-xl xl:text-2xl">
          {newsDate.format("MMMM D, YYYY")}
        </p>
        <Image
          src={news.imageUrl}
          className="max-h-96 w-full object-cover object-top"
          height={1000}
          width={1000}
          alt={news.title}
        />
        <p className="text-left">{news.description}</p>
      </div>
      <div className="bg-tertiary">
        <div className="maximum-width space-y-7 divide-y-2">
          <h1 className="main-heading">Other News</h1>
          <div className="space-y-4 pt-5 sm:space-y-5">
            <Swiper
              breakpoints={{
                768: {
                  slidesPerView: 3,
                },
                640: {
                  slidesPerView: 2,
                },
              }}
              autoplay={true}
              loop
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                el: "#containerForBullets",
                type: "bullets",
                bulletClass: "swiper-custom-bullet",
                bulletActiveClass: "swiper-custom-bullet-active",
                clickable: true,
              }}
              modules={[Pagination]}
            >
              {News.slice(1, -1).map((singleNews) => (
                <SwiperSlide key={singleNews.id}>
                  <NewsCard {...singleNews} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div
              id="containerForBullets"
              className="flex justify-center gap-2 transition duration-300"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
