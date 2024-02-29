import { format, isBefore, isSameDay, isSameMonth, subDays } from "date-fns"
import styles from "./Day.module.css"

import { useState } from "react"
import { EventsForm } from "../EventsForm/EventsForm.component"

type DayProps = {
  day: Date
  index: number
  month: Date
}

export const Day = ({ day, index, month }: DayProps) => {
  const [open, setOpen] = useState(false)

  const onClose = () => {
    setOpen(false)
  }

  const toggleModal = () => {
    setOpen(true)
  }

  return (
    <>
      <div
        className={`${styles.day} ${
          (isBefore(day, subDays(new Date(), 1)) || !isSameMonth(day, month)) &&
          styles.nonMonthDay
        } ${!isSameMonth(day, month) && styles.oldMonthDay}`}
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

            <button className={styles.addEventBtn} onClick={toggleModal}>
              +
            </button>
          </div>
        </div>
        <EventsForm
          // key={`${day}-${index}`}
          open={open}
          onClose={onClose}
          day={day}
        />
      </div>
    </>
  )
}
