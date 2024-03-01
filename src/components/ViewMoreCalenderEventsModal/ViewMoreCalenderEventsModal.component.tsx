import { Event } from "../../context/EventsContext/Events.context"
import { formatDate } from "../../utilities/formatDate"
import { CalenderEvent } from "../CalenderEvent/CalenderEvent.component"
import { Modal, ModalProps } from "../Modal/Modal.component"
import styles from "./ViewMoreCalendarEvents.module.css"

type ViewMoreProps = {
  events: Event[]
} & Omit<ModalProps, "children">

export const ViewMoreCalendarEventsModal = ({
  events,
  ...modalProps
}: ViewMoreProps) => {
  return (
    <Modal {...modalProps}>
      <Modal.Overlay />
      <Modal.Body>
        <div className={styles.modalTitle}>
          <small>{formatDate(events[0].date, { dateStyle: "short" })}</small>
          <button className={styles.closeBtn} onClick={modalProps.onClose}>
            &times;
          </button>
        </div>
        <div className={styles.events}>
          {events.map((event) => (
            <CalenderEvent event={event} key={event.id} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}
