import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react"
import styles from "./Modal.module.css"
import { createPortal } from "react-dom"

export type ModalProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

type ModalContext = {
  onClose: () => void
}

const ModalContext = createContext<ModalContext | null>(null)

export const Modal = ({ open, onClose, children }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)
  const isPrevModalOpen = useRef<boolean>()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }

    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [onClose])

  useLayoutEffect(() => {
    if (!open && isPrevModalOpen.current) {
      setIsClosing(true)
    }

    isPrevModalOpen.current = open
  }, [open])

  if (!open && !isClosing) return null

  return createPortal(
    <ModalContext.Provider value={{ onClose }}>
      <div
        onAnimationEnd={() => setIsClosing(false)}
        className={`${styles.modal} ${isClosing ? styles.closing : null}`}
      >
        {children}
      </div>
    </ModalContext.Provider>,
    document.querySelector("#modal-container") as HTMLElement
  )
}

const useModalContext = () => {
  const result = useContext(ModalContext)
  if (result == null) {
    throw new Error("Must be wrapped inside modal context")
  }

  return result
}

const Overlay = () => {
  const { onClose } = useModalContext()
  return <div className={styles.overlay} onClick={onClose} />
}

const Body = ({ children }: { children: ReactNode }) => {
  return <div className={styles.modalBody}>{children}</div>
}

Modal.Overlay = Overlay
Modal.Body = Body
