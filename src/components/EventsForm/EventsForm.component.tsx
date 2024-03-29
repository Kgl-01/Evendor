import { format } from "date-fns"
import { Modal, ModalProps } from "../Modal/Modal.component"
import styles from "./EventsForm.module.css"
import { FormEvent, Fragment, useRef, useState } from "react"
import { UnionOmit } from "../../utilities/unionOmit"

type Event = {
  id: string
  name: string
  color: string
  date: Date
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime: never; endTime: never }
)

type EventFormProps = {
  onSubmit: (event: UnionOmit<Event, "id">) => void
} & (
  | {
      onDelete: () => void
      event: Event
      date?: never
    }
  | { onDelete?: never; event?: never; date: Date }
) &
  Omit<ModalProps, "children">

const eventsColor = ["blue", "red", "green"]

export const EventsForm = ({
  onSubmit,
  onDelete,
  event,
  date,
  ...modalProps
}: EventFormProps) => {
  const isNew = event == null
  const [selectedColor, setSelectedColor] = useState(
    event?.color || eventsColor[0]
  )
  const nameRef = useRef<HTMLInputElement>(null)
  const [allDay, setAllDay] = useState(event?.allDay || false)
  const [startTime, setStartTime] = useState(event?.startTime || "")
  const endTimeRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const name = nameRef.current?.value
    const endTime = endTimeRef.current?.value

    if (name == null || name === "") return

    const commonProps = {
      name,
      date: date || event.date,
      color: selectedColor,
    }

    let newEvent: UnionOmit<Event, "id">

    if (allDay) {
      newEvent = {
        ...commonProps,
        allDay: true,
      } as UnionOmit<Event, "id">
    } else {
      if (
        startTime == null ||
        startTime === "" ||
        endTime == null ||
        endTime === ""
      ) {
        return
      }
      newEvent = {
        ...commonProps,
        allDay: false,
        startTime,
        endTime,
      } as UnionOmit<Event, "id">
    }
    modalProps.onClose()
    onSubmit(newEvent)
  }

  return (
    <Modal {...modalProps}>
      <Modal.Overlay />
      <Modal.Body>
        <div className={styles.modalTitle}>
          <div>{isNew ? "Add Event" : "Epdate Event"}</div>
          <small>{format(date || event?.date, "d/M/yy")}</small>
          <button className={styles.closeBtn} onClick={modalProps.onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              required
              id="name"
              ref={nameRef}
              defaultValue={event?.name}
            />
          </div>
          <div className={`${styles.formGroup} ${styles.checkbox}`}>
            <input
              type="checkbox"
              name="all-day"
              id="all-day"
              checked={allDay}
              onChange={(e) => setAllDay(e.target.checked)}
            />
            <label htmlFor="all-day">All Day?</label>
          </div>
          <div className={styles.row}>
            <div className={styles.formGroup}>
              <label htmlFor="start-time">Start Time</label>
              <input
                type="time"
                name="start-time"
                id="start-time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                disabled={allDay}
                required={!allDay}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="end-time">End Time</label>
              <input
                ref={endTimeRef}
                min={startTime}
                defaultValue={event?.endTime}
                type="time"
                name="end-time"
                id="end-time"
                disabled={allDay}
                required={!allDay}
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Color</label>
            <div className={`${styles.row} ${styles.left}`}>
              {eventsColor.map((color, idx) => (
                <Fragment key={`${color}-${idx}`}>
                  <input
                    type="radio"
                    name={color}
                    value={color}
                    id={color}
                    className={styles.colorRadio}
                    onChange={() => setSelectedColor(color)}
                    checked={selectedColor === color}
                  />
                  <label htmlFor={color}>
                    <span className={styles.srOnly}>{color}</span>
                  </label>
                </Fragment>
              ))}
            </div>
          </div>

          <div className={styles.row}>
            <button
              className={`${styles.btn} ${styles.btnSuccess}`}
              type="submit"
            >
              {isNew ? "Add" : "Edit"}
            </button>
            {onDelete != null && (
              <button
                className={`${styles.btn} ${styles.btnDelete}`}
                type="button"
                onClick={onDelete}
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
