import { EventsContextProvider } from "./context/EventsContext/EventsContext.provider"
import { Calender } from "./pages/Calender/Calender.page"

function App() {
  return (
    <EventsContextProvider>
      <Calender />
    </EventsContextProvider>
  )
}

export default App
