import { format, isBefore, isSameDay, isSameMonth, subDays } from "date-fns"
import styles from "./Day.module.css"

type DayProps = {
  day: Date
  index: number
  month: Date
}

export const Day = ({ day, index, month }: DayProps) => {
  return (
    <div
      className={`${styles.day} ${
        (isBefore(day, subDays(new Date(), 1)) || !isSameMonth(day, month)) &&
        styles.nonMonthDay
      }`}
    >
      <div className={styles.dayHeader}>
        {index < 7 ? (
          <div className={styles.weekName}>{format(day, "EEE")}</div>
        ) : null}
        <div
          className={`${styles.dayNumber} ${
            isSameDay(new Date(), day) && styles.today
          }`}
        >
          {format(day, "d")}
        </div>
        <button className={styles.addEventBtn}>+</button>
      </div>
    </div>
  )
}
