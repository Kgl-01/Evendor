import { useContext } from "react"
import { EventsContext } from "../context/EventsContext/Events.context"

export const useEvents = () => {
  const value = useContext(EventsContext)
  if (value == null) {
    throw new Error("Wrap the component by eventsContextProvider")
  }
  return value
}
