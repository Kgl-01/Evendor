import { format } from "date-fns"
import { Modal } from "../Modal/Modal.component"
import styles from "./EventsForm.module.css"
import { ChangeEvent, FormEvent, Fragment, useRef, useState } from "react"
type EventFormProps = {
  open: boolean
  onClose: () => void
  day: Date
}

const eventsColor = ["blue", "red", "green"]

export const EventsForm = ({ open, onClose, day }: EventFormProps) => {
  const [selectedColor, setSelectedColor] = useState(eventsColor[0])
  const nameRef = useRef<HTMLInputElement>(null)
  const [allDay, setAllDay] = useState(false)
  const [startTime, setStartTime] = useState("")
  const endTimeRef = useRef<HTMLInputElement>(null)

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(nameRef.current?.value)
  }

  return (
    <Modal open={open} onClose={onClose}>
      <Modal.Overlay />
      <Modal.Body>
        <div className={styles.modalTitle}>
          <div>Add Event</div>
          <small>{format(day, "d/M/yy")}</small>
          <button className={styles.closeBtn} onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={onSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" id="name" ref={nameRef} />
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
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="end-time">End Time</label>
              <input
                ref={endTimeRef}
                min={startTime}
                type="time"
                name="end-time"
                id="end-time"
                disabled={allDay}
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
                    checked={selectedColor === color && true}
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
              Add
            </button>
            <button
              className={`${styles.btn} ${styles.btnDelete}`}
              type="button"
            >
              Delete
            </button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  )
}
