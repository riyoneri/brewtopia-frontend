import ClosedEventsList from "@/components/events/closed-events-list";
import UpcomingEventsList from "@/components/events/upcoming-events-list";

export default function EventsPage() {
  return (
    <>
      <title>Our events</title>
      <div className="maximum-width space-y-10 py-5">
        <div className="flex flex-col gap-5 md:flex-row">
          <h2 className="main-heading flex-1 text-center sm:text-left">
            Upcoming Events
          </h2>
          <p className="md:w-1/3">
            We believe that we are big not because of us but because of them,
            they are the ones who motivate us to continue to innovate to provide
            a quality coffee taste and confortable space that is getting better
            every day.
          </p>
        </div>
        <UpcomingEventsList />
        <h2 className="main-heading">Events Closed</h2>
        <ClosedEventsList />
      </div>
    </>
  );
}
