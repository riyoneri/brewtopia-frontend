import Events from "@/data/events";

import EventCard from "./event-card";

export default function UpcomingEventsList() {
  return (
    <div className="grid gap-5 xs:grid-cols-2 md:grid-cols-3">
      {Events.slice(0, 3).map((event) => (
        <EventCard {...event} key={event.id} />
      ))}
    </div>
  );
}
