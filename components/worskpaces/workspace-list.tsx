"use client";

import Workspaces from "@/data/workspaces";
import { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import WorkspaceCard from "./workspace-card";

export default function WorkspaceCardList() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return;

  return (
    <div className="space-y-4 sm:space-y-5">
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
        {Workspaces.map((workspace) => (
          <SwiperSlide key={workspace.id}>
            <WorkspaceCard {...workspace} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        id="containerForBullets"
        className="flex justify-center gap-2 transition duration-300"
      ></div>
    </div>
  );
}
