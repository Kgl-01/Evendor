import { useEffect, useState } from "react"

type Event = {
  id: string
  name: string
  color: string
  date: Date
} & (
  | { allDay: false; startTime: string; endTime: string }
  | { allDay: true; startTime: never; endTime: never }
)

export const useLocalStorage = (key: string, initialValue: Event[]) => {
  const [value, setValue] = useState<Event[]>(() => {
    const jsonValue = localStorage.getItem(key)
    if (jsonValue == null) return initialValue
    return (JSON.parse(jsonValue) as Event[]).map((event) => {
      if (event.date instanceof Date) return event
      return { ...event, date: new Date(event.date) }
    })
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
