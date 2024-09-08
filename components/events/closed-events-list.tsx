import Events from "@/data/events";
import classNames from "classnames";

import Button from "../button";
import EventCard from "./event-card";

export default function ClosedEventsList() {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xs:grid-cols-2 md:grid-cols-3">
        {Events.map((event, index) => (
          <EventCard
            className={classNames({ "sm:col-span-2": index === 0 })}
            {...event}
            key={event.id}
          />
        ))}
      </div>
      <Button variant="outline" className="mx-auto block w-full xs:w-fit">
        Load more
      </Button>
    </div>
  );
}
