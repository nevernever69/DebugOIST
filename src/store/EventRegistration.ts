import { create } from 'zustand'
import { createJSONStorage, devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

// Registration type
export interface EventRegistration {
  _id?: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: number;
  attended?: boolean;
}

// Store type
interface EventRegistrationStoreProps {
  registrations: EventRegistration[];
  loading: boolean;
  error: string | null;
  registering: boolean;
  // Fetch all registrations for a user
  getRegistrations: (userId: string) => Promise<void>;
  // Register a user for an event
  registerForEvent: (eventId: string, userId: string) => Promise<void>;
  // Check if a user is registered for an event
  checkIfRegistered: (eventId: string, userId: string) => boolean;
  // Get registrations for an event (admin)
  getEventRegistrations: (eventId: string) => Promise<EventRegistration[]>;
  // Mark attendance for an event (admin)
  markAttendance: (registrationId: string, attended: boolean) => Promise<void>;
}

const useEventRegistration = create<EventRegistrationStoreProps>()(
  devtools(
    persist(
      immer((set, get) => {
        const setLoading = (loading: boolean) => set({ loading });
        const setRegistering = (registering: boolean) => set({ registering });

        return {
          registrations: [],
          loading: false,
          error: null,
          registering: false,

          // Fetch all registrations for the user
          getRegistrations: async (userId: string) => {
            setLoading(true);
            try {
              const response = await fetch(`/api/registrations/user/${userId}`);
              
              if (!response.ok) {
                throw new Error('Failed to fetch registrations');
              }
              
              const data = await response.json();
              
              set(state => {
                state.registrations = data.registrations;
                state.error = null;
              });
            } catch (error: any) {
              set({ error: error.message });
              console.error('Error fetching user registrations:', error);
            } finally {
              setLoading(false);
            }
          },

          // Register a user for an event
          registerForEvent: async (eventId: string, userId: string) => {
            setRegistering(true);
            try {
              // Fetch user data from Clerk (this will be done in the API)
              const response = await fetch('/api/registrations', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  eventId,
                  userId,
                }),
              });

              if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to register for event');
              }

              const data = await response.json();
              
              // Add the new registration to state
              set(state => {
                // Ensure we don't add duplicate registrations
                if (!state.registrations.some(reg => reg._id === data.registration._id)) {
                  state.registrations.push(data.registration);
                }
                state.error = null;
              });
              
              return data.registration;
            } catch (error: any) {
              set({ error: error.message });
              throw error;
            } finally {
              setRegistering(false);
            }
          },

          // Check if user is registered for event
          checkIfRegistered: (eventId: string, userId: string) => {
            if (!userId) return false;
            
            const { registrations } = get();
            
            // Check if we can find any registration with matching eventId and userId
            return registrations.some(reg => {
              // Handle both direct string comparison and ObjectId embedded in populated fields
              const regEventId = typeof reg.eventId === 'string' 
                ? reg.eventId 
                : (reg.eventId as any)?._id || '';
                
              return (regEventId === eventId) && (reg.userId === userId);
            });
          },

          // Get all registrations for an event (admin)
          getEventRegistrations: async (eventId: string) => {
            setLoading(true);
            try {
              const response = await fetch(`/api/registrations/event/${eventId}`);
              
              if (!response.ok) {
                throw new Error('Failed to fetch event registrations');
              }
              
              const data = await response.json();
              return data.registrations;
            } catch (error: any) {
              set({ error: error.message });
              throw error;
            } finally {
              setLoading(false);
            }
          },

          // Mark attendance for an event (admin)
          markAttendance: async (registrationId: string, attended: boolean) => {
            setLoading(true);
            try {
              const response = await fetch(`/api/registrations/${registrationId}`, {
                method: 'PATCH',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  attended,
                }),
              });

              if (!response.ok) {
                throw new Error('Failed to update attendance');
              }

              const data = await response.json();
              
              // Update the registration in state
              set(state => {
                const index = state.registrations.findIndex(reg => reg._id === registrationId);
                if (index !== -1) {
                  state.registrations[index].attended = attended;
                }
                state.error = null;
              });
            } catch (error: any) {
              set({ error: error.message });
              throw error;
            } finally {
              setLoading(false);
            }
          },
        };
      }),
      {
        name: 'event-registration-storage',
        version: 1,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          registrations: state.registrations,
        }),
      }
    )
  )
);

export default useEventRegistration; 