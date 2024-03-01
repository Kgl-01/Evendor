import { createContext } from "react"
import { UnionOmit } from "../../utilities/unionOmit"

export type Event = {
  id: string
  name: string
  color: string
  date: Date
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime: never; endTime: never }
)

type EventsContext = {
  events: Event[]
  addEvent: (event: UnionOmit<Event, "id">) => void
  updateEvent: (id: string, event: UnionOmit<Event, "id">) => void
  deleteEvent: (id: string) => void
}

export const EventsContext = createContext<EventsContext | null>(null)
