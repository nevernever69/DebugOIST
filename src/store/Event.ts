import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import axios from 'axios'

export type EventProps = {
  _id?: string
  title: string
  description: string
  date: number
  time: number
  registration: number
  publicId: string
}

interface EventStoreProps {
  events: EventProps[]
  loading: boolean
  error: string | null
  hydrated: boolean
  setHydrated: () => void
  addEvent: (event: FormData) => Promise<void>
  updateEvent: (publicId: string, newEvent: FormData) => Promise<void>
  getEvents: () => Promise<void>
  deleteEvent: (publicId: string) => Promise<void>
}

const useEvent = create<EventStoreProps>()(
  devtools(
    persist(
      immer((set, get) => {
        const setLoading = (loading: boolean) => set({ loading })

        return {
          events: [],
          loading: false,
          error: null,
          hydrated: false,
          setHydrated: () => set({ hydrated: true }),

          addEvent: async (event: FormData) => {
            setLoading(true)
            try {
              const { data } = await axios.post('/api/events', event, {
                headers: { 'Content-Type': 'multipart/form-data' }
              })
              // Push new event into state
              set(state => {
                state.events.push(data)
                state.error = null
              })
              get().getEvents()
            } catch (error: any) {
              set({ error: error.message })
            } finally {
              setLoading(false)
            }
          },

          updateEvent: async (publicId: string, newEvent: FormData) => {
            setLoading(true)
            try {
              // Assuming a RESTful PATCH endpoint for updating an event
              const { data } = await axios.patch(
                `/api/events/${publicId}`,
                newEvent,
                {
                  headers: { 'Content-Type': 'multipart/form-data' }
                }
              )
              set(state => {
                const index = state.events.findIndex(
                  event => event.publicId === publicId
                )
                if (index !== -1) {
                  state.events[index] = data
                }
                state.error = null
              })
              get().getEvents()
            } catch (error: any) {
              set({ error: error.message })
            } finally {
              setLoading(false)
            }
          },

          getEvents: async () => {
            setLoading(true)
            try {
              const { data } = await axios.get('/api/events')
              set(state => {
                state.events = data.events
                state.error = null
              })
            } catch (error: any) {
              set({ error: error.message })
            } finally {
              setLoading(false)
            }
          },

          deleteEvent: async (publicId: string) => {
            setLoading(true)
            try {
              console.log('Deleting event with publicId:', publicId)
              await axios.delete('/api/events', {
                headers: { 'Content-Type': 'application/json' },
                data: { eventId: publicId }
              })
              console.log('Deleted event with publicId:', publicId)
              set(state => {
                state.events = state.events.filter(
                  event => event.publicId !== publicId
                )
                state.error = null
              })
              get().getEvents()
            } catch (error: any) {
              set({ error: error.message })
            } finally {
              setLoading(false)
            }
          }
        }
      }),
      {
        name: 'event-storage',
        version: 1,
        onRehydrateStorage: () => state => {
          state?.setHydrated()
        },
        storage: createJSONStorage(() => localStorage)
      }
    )
  )
)

export default useEvent
