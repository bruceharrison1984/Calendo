import './EventLayout.scss';
import { CalendarEvent, useCalendar, useComponents } from 'src';

interface EventLayoutProps {
  events: CalendarEvent[];
  startOfWeek: Date;
  endOfWeek: Date;
}

/**
 * This component controls the layout of an individual events within a week
 * @returns EventLayout Component
 */
export const EventLayout = ({
  events,
  startOfWeek,
  endOfWeek,
}: EventLayoutProps) => {
  const {
    dateConvertor: { getDayOfWeek },
    dayOffset,
  } = useCalendar();
  const { eventComponent: EventComponent } = useComponents();

  const getStartIndex = (eventDate: Date) =>
    eventDate <= startOfWeek ? 1 : getDayOfWeek(eventDate) + 1; //offset by one due to getDayOfWeek being zero index'd

  const getEndIndex = (eventEndDate: Date) => {
    if (eventEndDate > endOfWeek) return 8;
    return getDayOfWeek(eventEndDate) + dayOffset;
  };

  return (
    <div className="nm--event-layout">
      {events.map((event) => (
        <div
          data-eventid={event.id}
          key={event.id}
          style={{
            gridColumnStart: getStartIndex(event.start),
            gridColumnEnd: getEndIndex(event.end),
            minWidth: 0,
          }}
        >
          <EventComponent event={event} />
        </div>
      ))}
    </div>
  );
};
