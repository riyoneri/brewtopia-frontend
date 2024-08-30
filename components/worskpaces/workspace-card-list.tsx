"use client";

import workspaces from "@/app/data/workspaces";
import { useEffect, useState } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { PaginationOptions } from "swiper/types";

import WorkspaceCard from "./workspace-card";

export default function WorkspaceCardList() {
  const pagination: PaginationOptions = {
    clickable: true,
    renderBullet: function (_index: number, _className: string) {
      // return '<span class="' + "pagination-lion" + '">' + (_index + 1) + "</span>";
      return `<span class="custom-pagination-bullet">a</span>`;
    },
  };

  const [displayWorkspaces, setDisplayWorkspaces] = useState<WorkspaceDto[]>(
    [],
  );

  useEffect(() => {
    setDisplayWorkspaces(workspaces);
  }, []);

  return (
    <div className="">
      <Swiper
        loop
        slidesPerView={3}
        pagination={pagination}
        modules={[Pagination]}
      >
        {displayWorkspaces.map((workspace) => (
          <SwiperSlide key={workspace.id}>
            <WorkspaceCard {...workspace} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
