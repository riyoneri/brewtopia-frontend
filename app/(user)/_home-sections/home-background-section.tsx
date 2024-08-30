"use client";

import Coffees from "@/app/data/coffees";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeBackgroundSection() {
  const triggerContainer = useRef<HTMLDivElement | null>(null);
  const imagesContainr = useRef<HTMLDivElement | null>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerContainer.current,
        start: "top 50px",
        end: "center 50px",
        scrub: true,
        pin: true,
      },
    });

    tl.to(imagesContainr.current, {
      x: "-110%",
      ease: "none",
    });
    return () => {
      for (const elt of ScrollTrigger.getAll()) elt.kill();
    };
  }, []);

  return (
    <section className="bg-tertiary py-10">
      <div
        className="maximum-width space-y-5 overflow-hidden"
        ref={triggerContainer}
      >
        <h1 className="main-heading text-pretty">
          We provide your space for your work or Mini event With Your Favorite
          coffee.
        </h1>
        <p className="gap-10 text-balance xs:columns-2">
          Our story begins in 2010 with a simple idea from our founder that the
          most confortable place to work is anywhere, because ideas are not
          limited by space and time, and the most confortable place is in a cafe
          where their favorite coffee is available Our story begins in 2010 with
          a simple idea from our founder that the most confortable place to work
          is anywhere, because ideas are not limited by space and time, and the
          most confortable place is in a cafe where their favorite coffee is
          available
        </p>
        <div
          className="flex gap-5 *:h-80 *:w-1/4 *:object-cover even:*:mt-20"
          ref={imagesContainr}
        >
          {Coffees.map((coffee) => (
            <Image
              key={coffee.id}
              src={coffee.imageUrl}
              alt="Image"
              height={500}
              width={500}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
