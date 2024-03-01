import { format } from "date-fns"
import styles from "./CalenderEvent.module.css"
import { EventsForm } from "../EventsForm/EventsForm.component"
import { useState } from "react"
import { useEvents } from "../../hooks/useEvents"

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
      >
        {event.allDay ? (
          <div className={styles.eventName}>{event.name}</div>
        ) : (
          <>
            <div className={`${styles.colorDot} ${styles[event.color]}`}></div>
            <div className={styles.eventTime}>
              {format(new Date(event.startTime), "p")}
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
        onDelete={() => deleteEvent(event.id)}
      />
    </>
  )
}
