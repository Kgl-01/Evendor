import { ReactNode } from "react"

import { UnionOmit } from "../../utilities/unionOmit"
import { EventsContext } from "./Events.context"
import { useLocalStorage } from "../../hooks/useLocalStorage"

type Event = {
  id: string
  name: string
  color: string
  date: Date
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime: never; endTime: never }
)

type EventsContextProviderProps = {
  children: ReactNode
}

export const EventsContextProvider = ({
  children,
}: EventsContextProviderProps) => {
  const [events, setEvents] = useLocalStorage("Events", [])

  const addEvent = (eventDetails: UnionOmit<Event, "id">) => {
    setEvents((currentEvents) => [
      ...currentEvents,
      { ...eventDetails, id: crypto.randomUUID() },
    ])
  }

  const updateEvent = (id: string, eventDetails: UnionOmit<Event, "id">) => {
    setEvents((currentEvents) =>
      currentEvents.map((event) => {
        if (event.id === id) {
          return { id, ...eventDetails }
        }
        return event
      })
    )
  }

  const deleteEvent = (id: string) => {
    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id)
    )
  }

  return (
    <EventsContext.Provider
      value={{ events, addEvent, updateEvent, deleteEvent }}
    >
      {children}
    </EventsContext.Provider>
  )
}
