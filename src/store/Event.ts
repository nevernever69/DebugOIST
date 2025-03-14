import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'
import { FormDataType } from '@/src/Schema/Event'

export type EventProps = {
  title: string
  description: string
  date: number
  time: number
  registration: number
  publicId: string
}

interface EventStoreProps {
  events: EventProps[] | []
  loading: boolean
  error: string | null
  hydrated: boolean
  setHydrated: () => void
  addEvent: (event: FormData) => Promise<void>
  updateEvent: (publicId: string, newEvent: FormData) => Promise<void>
  getEvents: () => Promise<void>
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
        addEvent: async (event: FormData) => {
          try {
            set({ loading: true })
            const req = await axios.post(`/api/events`, event, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            })
            set({
              events: [...get().events, req.data],
              error: null
            })
          } catch (e: any) {
            set({
              error: e.message
            })
          } finally {
            set({
              loading: false
            })
          }
        },
        updateEvent: async (publicId, newEvent) => {
          set(state => {
            state.events = state.events.map(event => {
              if (event.title === publicId) {
                return {
                  ...event,
                  name: newEvent
                }
              }
              return event
            })
          })
        },
        getEvents: async () => {
          try {
            set({ loading: true })
            const req = await axios.get('/api/events')
            set({
              events: req.data.events,
              error: null
            })
          } catch (e: any) {
            set({
              error: e.message
            })
          } finally {
            set({
              loading: false
            })
          }
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
