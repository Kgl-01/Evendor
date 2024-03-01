import { format, isSameDay } from "date-fns"
import { Day } from "../Day/Day.component"
import styles from "./DaysContainer.module.css"
import { useEvents } from "../../hooks/useEvents"

export const DaysContainer = ({
  currentMonthDates,
  month,
}: {
  currentMonthDates: Date[]
  month: Date
}) => {
  const { events } = useEvents()

  return (
    <div className={styles.days}>
      {currentMonthDates.map((day, index) => (
        <Day
          day={day}
          index={index}
          key={`${format(day, "dd MM")}-${index}`}
          month={month}
          events={events.filter((event) => isSameDay(day, event.date))}
        />
      ))}
    </div>
  )
}
