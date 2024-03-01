import { parse } from "date-fns"
import styles from "./CalenderEvent.module.css"
import { EventsForm } from "../EventsForm/EventsForm.component"
import { useState } from "react"
import { useEvents } from "../../hooks/useEvents"
import { formatDate } from "../../utilities/formatDate"

type Event = {
  id: string
  name: string
  color: string
  date: Date
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime: never; endTime: never }
)

export const CalenderEvent = ({ event }: { event: Event }) => {
  const [isEditModalopen, setIsEditModalOpen] = useState(false)
  const { updateEvent, deleteEvent } = useEvents()
  return (
    <>
      <button
        className={`${styles.event} ${styles[event.color]} ${
          event.allDay && styles.allDayEvent
        }`}
        onClick={() => setIsEditModalOpen(true)}
      >
        {event.allDay ? (
          <div className={styles.eventName}>{event.name}</div>
        ) : (
          <>
            <div className={`${styles.colorDot} ${styles[event.color]}`}></div>
            <div className={styles.eventTime}>
              {formatDate(parse(event.startTime, "HH:mm", event.date), {
                timeStyle: "short",
              })}
            </div>
            <div className={styles.eventName}>{event.name}</div>
          </>
        )}
      </button>
      <EventsForm
        event={event}
        open={isEditModalopen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={(eventDetails) => updateEvent(event.id, eventDetails)}
        onDelete={() => {
          deleteEvent(event.id)
        }}
      />
    </>
  )
}
