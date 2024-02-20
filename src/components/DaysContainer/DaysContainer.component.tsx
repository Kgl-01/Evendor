import { format } from "date-fns"
import { Day } from "../Day/Day.component"
import styles from "./DaysContainer.module.css"

export const DaysContainer = ({
  currentMonthDates,
  month,
}: {
  currentMonthDates: Date[]
  month: Date
}) => {
  return (
    <div className={styles.days}>
      {currentMonthDates.map((day, index) => (
        <Day
          day={day}
          index={index}
          key={`${format(day, "dd MM")}-${index}`}
          month={month}
        />
      ))}
    </div>
  )
}
