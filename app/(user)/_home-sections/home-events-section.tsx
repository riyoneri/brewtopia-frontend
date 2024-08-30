"use client";

import events from "@/app/data/events";
import Button from "@/components/button";
import EventCard from "@/components/events/event-card";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function HomeEventsSection() {
  const [eventsToDisplay, setEventsToDisplay] = useState<EventDto[]>([]);
  const eventsContainer = useRef<HTMLElement | null>(null);
  const eventsElement = useRef<HTMLDivElement | null>(null);
  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: eventsContainer.current,
        start: "top 50px",
        end: "center 50px",
        scrub: true,
        pin: true,
      },
    });

    tl.to(eventsElement.current, {
      x: "-50%",
      ease: "none",
    });

    return () => {
      for (const elt of ScrollTrigger.getAll()) elt.kill();
    };
  }, []);

  useEffect(() => {
    setEventsToDisplay(events.slice(0, 4));
  }, []);

  return (
    <section
      className="maximum-width flex flex-col gap-5 overflow-x-hidden"
      ref={eventsContainer}
    >
      <h3 className="main-heading capitalize">
        We grow together with our customer
      </h3>
      <div className="flex w-[200%] gap-5 *:w-1/4" ref={eventsElement}>
        <div className="flex flex-col">
          <p className="flex-1">
            We believe that we are big not because of us but because of them,
            they are the ones who motivate us to continue to innovate to provide
            a quality coffee taste and confortable space that is getting better
            every day.
          </p>
          <Link href="/">
            <Button className="capitalize">Explore other event</Button>
          </Link>
        </div>
        {eventsToDisplay.map((event) => (
          <EventCard key={event.id} {...event} />
        ))}
      </div>
    </section>
  );
}
