import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

type EventProps = {
  name: string
  description: string
  date: number
  time: number
  registration: number
}

interface EventStoreProps {
  events: EventProps[] | []
  loading: boolean
  error: string | null
  hydrated: boolean
  setHydrated: () => void
  addEvent: (event: string) => void
  updateEvent: (oldEvent: string, newEvent: string) => void
}

const useEvent = create<EventStoreProps>()(
  devtools(
    persist(
      immer((set, get) => ({
        loading: false,
        error: null,
        hydrated: false,
        events: [],
        setHydrated: () => {
          set({
            hydrated: true
          })
        },
        addEvent: event => {
          set(state => {
            state.events.push(event)
          })
        },
        updateEvent: (oldEvent, newEvent) => {
          set(state => {
            state.events = state.events.map(event => {
              if (event.name === oldEvent) {
                return {
                  ...event,
                  name: newEvent
                }
              }
              return event
            })
          })
        }
      })),
      {
        name: 'event-storage',
        version: 1,
        onRehydrateStorage: () => {
          return state => {
            state?.setHydrated()
          }
        },
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export default useEvent
