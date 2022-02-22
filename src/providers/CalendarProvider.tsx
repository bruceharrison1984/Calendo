import {
  CalendarEvent,
  CalendarState,
  DateConvertor,
  EventWeek,
} from '@/types/index';
import {
  ReactNode,
  createContext,
  useCallback,
  useMemo,
  useState,
} from 'react';
import useScreenSize from '@/hooks/useScreenSize';

export const CalendarContext = createContext<CalendarState | null>(null);
CalendarContext.displayName = 'CalendarContext';

interface CalendarProviderProps {
  dateConvertor: DateConvertor;
  initialDate?: Date;
  calendarEvents: CalendarEvent[];
  children: ReactNode;
}

/**
 * The provides access to data and behaviors that control the calendar
 * @param param0 CalendarProviderProps
 * @returns CalendarContext.Provider component
 */
export const CalendarProvider = ({
  dateConvertor,
  initialDate = new Date(),
  calendarEvents,
  children,
}: CalendarProviderProps) => {
  const [currentMonth, setCurrentMonth] = useState(initialDate);
  const screenSize = useScreenSize();

  const daysOfWeek = useMemo(
    () => dateConvertor.getDaysOfWeek(screenSize),
    [screenSize, dateConvertor]
  );

  const weeksInMonth = useMemo(
    () => dateConvertor.getCalendarViewInWeeks(currentMonth),
    [currentMonth, dateConvertor]
  );

  const events = useMemo(
    () =>
      calendarEvents.filter(
        (event) =>
          dateConvertor.areSameMonth(event.start, currentMonth) ||
          dateConvertor.areSameMonth(event.end, currentMonth)
      ),
    [currentMonth, calendarEvents, dateConvertor]
  );

  const calendarWithEvents = useMemo<EventWeek[]>(
    () =>
      weeksInMonth.map<EventWeek>((week) => ({
        weekStart: week[0],
        weekEnd: week[6],
        daysInWeek: week,
        events: events.filter((event) =>
          dateConvertor.eventFallsWithinWeek(event.start, event.end, week)
        ),
      })),
    [weeksInMonth, events, dateConvertor]
  );

  const onNextMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.addMonthsToDate(month, 1)),
    [dateConvertor]
  );

  const onPrevMonth = useCallback(
    () => setCurrentMonth((month) => dateConvertor.subMonthsToDate(month, 1)),
    [dateConvertor]
  );

  const contextValue: CalendarState = {
    currentMonth,
    dateConvertor,
    daysOfWeek: daysOfWeek,
    onNextMonth,
    onPrevMonth,
    calendarWithEvents,
  };

  return (
    <CalendarContext.Provider value={contextValue}>
      {children}
    </CalendarContext.Provider>
  );
};
