import { format, isBefore, isSameDay, isSameMonth, subDays } from "date-fns"
import styles from "./Day.module.css"

import { useMemo, useState } from "react"
import { EventsForm } from "../EventsForm/EventsForm.component"
import { useEvents } from "../../hooks/useEvents"
import { Event } from "../../context/EventsContext/Events.context"
import { OverflowContainer } from "../OverflowContainer/OverFlowContainer.component"
import { CalenderEvent } from "../CalenderEvent/CalenderEvent.component"
import { ViewMoreCalendarEventsModal } from "../ViewMoreCalenderEventsModal/ViewMoreCalenderEventsModal.component"

type DayProps = {
  day: Date
  index: number
  month: Date
  events: Event[]
}

export const Day = ({ day, index, month, events }: DayProps) => {
  const [open, setOpen] = useState(false)
  const [isViewMoreEventModalOpen, setIsViewMoreEventModalOpen] =
    useState(false)
  const { addEvent } = useEvents()

  const onClose = () => {
    setOpen(false)
  }

  const toggleModal = () => {
    setOpen(true)
  }

  const sortedEvents = useMemo(() => {
    const timeToNumber = (time: string) => parseFloat(time.replace(":", "."))
    return [...events].sort((a, b) => {
      if (a.allDay && b.allDay) {
        return 0
      } else if (a.allDay) {
        return -1
      } else if (b.allDay) {
        return 1
      } else {
        return timeToNumber(a.startTime) - timeToNumber(b.startTime)
      }
    })
  }, [events])

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

        {events.length > 0 && (
          <>
            <OverflowContainer
              className="events"
              items={events}
              renderItem={(event) => <CalenderEvent event={event} />}
              getKey={(event) => event.id}
              renderOverflow={(amount) => (
                <>
                  <button
                    onClick={() => setIsViewMoreEventModalOpen(true)}
                    className={styles.eventsViewMoreBtn}
                  >
                    +{amount} More
                  </button>
                </>
              )}
            />
            <ViewMoreCalendarEventsModal
              events={sortedEvents}
              onClose={() => setIsViewMoreEventModalOpen(false)}
              open={isViewMoreEventModalOpen}
            />
          </>
        )}

        <EventsForm
          open={open}
          onClose={onClose}
          date={day}
          onSubmit={addEvent}
        />
      </div>
    </>
  )
}
