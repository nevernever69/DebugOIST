'use client'
import Image from 'next/image'
import React, { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { useOutsideClick } from '@/src/hooks/use-outside-click'
import axios from 'axios'

type EventType = {
  _id: string
  title: string
  description: string
  date: string
  time: string
  registration: string
  publicId: string
  createdAt: string
  updatedAt: string
  __v: number
}

export function ExpandableEvents() {
  const [events, setEvents] = useState<EventType[]>([])
  const [active, setActive] = useState<EventType | null>(null)
  const ref = useRef<HTMLDivElement>(null)
  const id = useId()

  // Fetch events from the API on component mount
  useEffect(() => {
    axios
      .get('/api/events')
      .then(response => {
        if (response.data && response.data.events) {
          setEvents(response.data.events)
        }
      })
      .catch(error => {
        console.error('Error fetching events:', error)
      })
  }, [])

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

  useOutsideClick(ref, () => setActive(null))

  return (
    <>
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 z-10 h-full w-full bg-black/20'
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active ? (
          <div className='fixed inset-0 z-[100] grid place-items-center'>
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
                transition: { duration: 0.05 }
              }}
              className='absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white lg:hidden'
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className='flex h-full w-full max-w-[500px] flex-col overflow-hidden bg-white dark:bg-neutral-900 sm:rounded-3xl md:h-fit md:max-h-[90%]'
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={200}
                  height={200}
                  src={`https://res.cloudinary.com/duhapidbx/image/upload/${active.publicId}`}
                  alt={active.title}
                  className='h-80 w-full object-cover object-top sm:rounded-tl-lg sm:rounded-tr-lg lg:h-80'
                />
              </motion.div>
              <div>
                <div className='flex items-start justify-between p-4'>
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className='font-bold text-neutral-700 dark:text-neutral-200'
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className='text-neutral-600 dark:text-neutral-400'
                    >
                      {active.description}
                    </motion.p>
                  </div>
                  <div className={"flex gap-4 items-center justify-center"}>
                  <motion.button
                    layoutId={`button-del-${active.title}-${id}`}
                    className='rounded-full bg-red-500 px-4 py-3 text-sm font-bold text-white'
                  >
                    Delete
                  </motion.button>
                  <motion.a
                    layoutId={`button-edit-${active.title}-${id}`}
                    href={`/events/${active._id}`}
                    target='_blank'
                    className='rounded-full bg-green-500 px-4 py-3 text-sm font-bold text-white'
                  >
                    Modify
                  </motion.a>
                  </div>
                </div>
                <div className='relative px-4 pt-4'>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className='flex h-40 flex-col items-start gap-4 overflow-auto pb-10 text-xs text-neutral-600 [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch] [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] dark:text-neutral-400 md:h-fit md:text-sm lg:text-base'
                  >
                    <p>
                      <strong>Date:</strong> {active.date}
                    </p>
                    <p>
                      <strong>Time:</strong> {active.time}
                    </p>
                    <p>
                      <strong>Registration Deadline:</strong>{' '}
                      {active.registration}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className='mx-auto w-full max-w-2xl gap-4'>
        {events.map(event => (
          <motion.div
            layoutId={`card-${event.title}-${id}`}
            key={`card-${event._id}-${id}`}
            onClick={() => setActive(event)}
            className='flex cursor-pointer flex-col items-center justify-between rounded-xl p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800 md:flex-row'
          >
            <div className='flex flex-col gap-4 md:flex-row'>
              <motion.div layoutId={`image-${event.title}-${id}`}>
                <Image
                  width={100}
                  height={100}
                  src={`https://res.cloudinary.com/duhapidbx/image/upload/${event.publicId}`}
                  alt={event.title}
                  className='h-40 w-40 rounded-lg object-cover object-top md:h-14 md:w-14'
                />
              </motion.div>
              <div>
                <motion.h3
                  layoutId={`title-${event.title}-${id}`}
                  className='text-center font-medium text-neutral-800 dark:text-neutral-200 md:text-left'
                >
                  {event.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${event.description}-${id}`}
                  className='text-center text-neutral-600 dark:text-neutral-400 md:text-left'
                >
                  {event.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${event.title}-${id}`}
              className='mt-4 rounded-full bg-gray-100 px-4 py-2 text-sm font-bold text-black hover:bg-green-500 hover:text-white md:mt-0'
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  )
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className='h-4 w-4 text-black'
    >
      <path stroke='none' d='M0 0h24v24H0z' fill='none' />
      <path d='M18 6l-12 12' />
      <path d='M6 6l12 12' />
    </motion.svg>
  )
}
