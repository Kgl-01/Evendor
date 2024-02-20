import {
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns"
import { useState } from "react"
import styles from "./Calender.module.css"
import { DaysContainer } from "../../components/DaysContainer/DaysContainer.component"
import { addMonths } from "date-fns/addMonths"

export const Calender = () => {
  const [month, setMonth] = useState<Date>(new Date())

  const currentMonthDates = eachDayOfInterval({
    start: startOfWeek(startOfMonth(month)),
    end: endOfWeek(endOfMonth(month)),
  })

  const nextMonth = () => {
    setMonth((currentMonth) => addMonths(currentMonth, 1))
  }

  const previousMonth = () => {
    setMonth((currentMonth) => subMonths(currentMonth, 1))
  }

  const resetToCurrent = () => {
    setMonth(new Date())
  }

  return (
    <div className={styles.calender}>
      <header className={styles.header}>
        <button className={styles.btn} onClick={resetToCurrent}>
          Today
        </button>
        <div>
          <button className={styles.monthChangeBtn} onClick={previousMonth}>
            &lt;
          </button>
          <button className={styles.monthChangeBtn} onClick={nextMonth}>
            &gt;
          </button>
        </div>
        <span className={styles.monthTitle}>{format(month, "MMMM yyyy")}</span>
      </header>

      {/** Days Container */}
      <DaysContainer currentMonthDates={currentMonthDates} month={month} />
    </div>
  )
}
