'use client'
import Image from 'next/image'
import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '@/src/hooks/use-outside-click'
import useEvent, { EventProps } from '@/src/store/Event'
import { useRouter } from 'next/navigation'

// Icon components
const CloseIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

// Default image URL for when publicId is missing
const DEFAULT_IMAGE_URL = "https://res.cloudinary.com/duhapidbx/image/upload/v1/placeholder-event";

export function ExpandableEvents() {
  const router = useRouter()
  const { deleteEvent, events, loading, getEvents } = useEvent()
  const [active, setActive] = useState<EventProps | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date')
  const [isAscending, setIsAscending] = useState(false)
  const [imageError, setImageError] = useState<Record<string, boolean>>({})
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  // Close modal on 'Escape' key press and manage body overflow
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setActive(null)
      }
    }

    document.body.style.overflow = active ? 'hidden' : 'auto'
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [active])

  // Fetch events once on component mount
  useEffect(() => {
    ;(async () => {
      try {
        await getEvents()
      } catch (error) {
        console.error("Failed to fetch events:", error)
      }
    })()
  }, [getEvents])

  // Close modal when clicking outside
  useOutsideClick(ref, () => setActive(null))

  // Use event's publicId for deletion
  const handleDeleteEvent = async (publicId: string | undefined) => {
    try {
      console.log('Deleting event with publicId client:', publicId)
      if (!publicId) return
      await deleteEvent(publicId)
      setActive(null)
      router.refresh()
    } catch (e: any) {
      console.error(e, 'Error deleting event')
    }
  }

  // Get image URL with fallback for missing publicId
  const getImageUrl = (eventId: string, publicId?: string) => {
    if (imageError[eventId] || !publicId) {
      return DEFAULT_IMAGE_URL;
    }
    return `https://res.cloudinary.com/duhapidbx/image/upload/${publicId}`;
  };

  // Handle image error
  const handleImageError = (eventId: string) => {
    setImageError(prev => ({...prev, [eventId]: true}));
  };

  // Filter and sort events - ensure date values exist before sorting 
  const filteredAndSortedEvents = events
    .filter(event => 
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'date') {
        // Handle missing dates gracefully
        const dateA = a.date ? new Date(a.date).getTime() : 0
        const dateB = b.date ? new Date(b.date).getTime() : 0
        return isAscending ? dateA - dateB : dateB - dateA
      } else {
        // Handle possible undefined titles
        const titleA = a.title || '';
        const titleB = b.title || '';
        return isAscending 
          ? titleA.localeCompare(titleB)
          : titleB.localeCompare(titleA)
      }
    })

  const handleToggleSort = (field: 'date' | 'title') => {
    if (sortBy === field) {
      setIsAscending(!isAscending)
    } else {
      setSortBy(field)
      setIsAscending(true)
    }
  }

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-10 h-full w-full bg-black/40 backdrop-blur-sm'
          />
        )}
      </AnimatePresence>
      
      {/* Search and filter controls */}
      <div className="w-full mb-6 space-y-3 px-2" style={{ width: '100%', maxWidth: '100%' }}>
        <div className="relative">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pl-10 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
            >
              <CloseIcon />
            </button>
          )}
        </div>
        
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="text-neutral-500 dark:text-neutral-400 pt-1">Sort by:</span>
          <button 
            onClick={() => handleToggleSort('date')}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              sortBy === 'date' 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            Date
            {sortBy === 'date' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAscending ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            )}
          </button>
          <button 
            onClick={() => handleToggleSort('title')}
            className={`px-3 py-1 rounded-full flex items-center gap-1 ${
              sortBy === 'title' 
                ? 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300' 
                : 'bg-gray-100 text-gray-700 dark:bg-neutral-800 dark:text-neutral-300'
            }`}
          >
            Title
            {sortBy === 'title' && (
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isAscending ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <div className='fixed inset-0 z-[100] grid place-items-center p-4'>
            <motion.button
              key={`button-${active._id}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className='absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-white dark:bg-neutral-800 shadow-md'
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active._id}-${id}`}
              ref={ref}
              className='flex h-full w-full max-w-3xl flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%] shadow-2xl'
            >
              <motion.div layoutId={`image-${active._id}-${id}`}>
                <div className="relative w-full h-60 sm:h-80">
                  <Image
                    priority
                    fill
                    src={getImageUrl(active._id || '', active.publicId)}
                    alt={active.title || 'Event image'}
                    className='object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg'
                    onError={() => handleImageError(active._id || '')}
                  />
                </div>
              </motion.div>
              <div>
                <div className='flex flex-col md:flex-row md:items-start justify-between p-6 gap-4'>
                  <div>
                    <motion.h3
                      layoutId={`title-${active._id}-${id}`}
                      className='text-xl md:text-2xl font-bold text-neutral-700 dark:text-neutral-200 mb-2'
                    >
                      {active.title || 'Untitled Event'}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active._id}-${id}`}
                      className='text-neutral-600 dark:text-neutral-400'
                    >
                      {active.description || 'No description provided'}
                    </motion.p>
                  </div>
                  <div className='flex items-center justify-center gap-3 self-end md:self-start'>
                    <motion.button
                      layoutId={`button-del-${active._id}-${id}`}
                      className='rounded-full bg-red-500 hover:bg-red-600 px-4 py-2 text-sm font-bold text-white transition-colors'
                      onClick={() => handleDeleteEvent(active._id)}
                      disabled={loading}
                    >
                      {loading ? 'Deleting...' : 'Delete'}
                    </motion.button>
                    <motion.a
                      layoutId={`button-edit-${active._id}-${id}`}
                      href={`/events/${active._id}`}
                      target='_blank'
                      className='rounded-full bg-green-500 hover:bg-green-600 px-4 py-2 text-sm font-bold text-white transition-colors'
                    >
                      Modify
                    </motion.a>
                  </div>
                </div>
                <div className='relative px-6 pt-4 pb-6'>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex flex-col items-start gap-4 overflow-auto pb-6 text-sm text-neutral-600 dark:text-neutral-400'
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">Date</p>
                          <p>{active.date || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">Time</p>
                          <p>{active.time || 'Not specified'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 md:col-span-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <div>
                          <p className="text-xs text-neutral-500 dark:text-neutral-500">Registration Deadline</p>
                          <p>{active.registration || 'Not specified'}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      {loading && events.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="h-10 w-10 animate-spin rounded-full border-b-2 border-t-2 border-purple-500 mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">Loading events...</p>
        </div>
      ) : (
        <motion.ul 
          className="w-full gap-4 divide-y divide-gray-100 dark:divide-neutral-800"
          style={{ width: '100%', maxWidth: '100%' }}
          layout
        >
          {filteredAndSortedEvents.length > 0 ? (
            filteredAndSortedEvents.map(event => (
              <motion.li
                layoutId={`card-${event._id}-${id}`}
                key={`card-${event._id}-${id}`}
                onClick={() => setActive(event)}
                className='flex cursor-pointer flex-col items-start justify-between rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row md:items-center transition-colors group'
                whileHover={{ scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              >
                <div className='flex flex-col gap-4 md:flex-row md:items-center w-full'>
                  <motion.div layoutId={`image-${event._id}-${id}`} className="w-full md:w-auto">
                    <div className="relative h-40 w-full md:h-20 md:w-20 rounded-lg overflow-hidden">
                      <Image
                        fill
                        src={getImageUrl(event._id || '', event.publicId)}
                        alt={event.title || 'Event image'}
                        className='object-cover object-top'
                        onError={() => handleImageError(event._id || '')}
                      />
                    </div>
                  </motion.div>
                  <div className="w-full pl-0 md:pl-4">
                    <div className="flex justify-between items-start">
                      <motion.h3
                        layoutId={`title-${event._id}-${id}`}
                        className='font-medium text-neutral-800 dark:text-neutral-200'
                      >
                        {event.title || 'Untitled Event'}
                      </motion.h3>
                      <div className="md:hidden">
                        <motion.button
                          layoutId={`button-${event._id}-${id}`}
                          className='rounded-full bg-gray-100 dark:bg-neutral-800 px-3 py-1.5 text-xs font-medium text-black dark:text-white group-hover:bg-purple-500 group-hover:text-white dark:group-hover:bg-purple-600 transition-colors'
                        >
                          View
                        </motion.button>
                      </div>
                    </div>
                    <motion.p
                      layoutId={`description-${event._id}-${id}`}
                      className='text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mt-1'
                    >
                      {event.description || 'No description provided'}
                    </motion.p>
                    {event.date && (
                      <p className="text-xs text-purple-600 dark:text-purple-400 mt-2 flex items-center gap-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {event.date}
                      </p>
                    )}
                  </div>
                </div>
                <div className="hidden md:block">
                  <motion.button
                    layoutId={`button-${event._id}-${id}`}
                    className='rounded-full bg-gray-100 dark:bg-neutral-800 px-4 py-2 text-sm font-medium text-black dark:text-white group-hover:bg-purple-500 group-hover:text-white dark:group-hover:bg-purple-600 transition-colors'
                  >
                    View
                  </motion.button>
                </div>
              </motion.li>
            ))
          ) : (
            <motion.div 
              className='text-center py-12 rounded-lg bg-neutral-50 dark:bg-neutral-800/50'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <p className='text-lg text-neutral-600 dark:text-neutral-400 mb-2'>
                {searchTerm ? 'No matching events found' : 'No events found'}
              </p>
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="text-sm text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Clear search
                </button>
              )}
            </motion.div>
          )}
        </motion.ul>
      )}
    </>
  )
}
