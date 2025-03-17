'use client'
import React from 'react'
import { HeroHighlight, Highlight } from '@/src/components/ui/hero-highlight'
import { motion } from 'framer-motion'
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from '@/src/components/ui/animated-modal'
import EventForm from '@/src/components/EventForm'
import { ExpandableEvents } from '@/src/components/EventsList'

const EventsComponent: React.FC = () => {
  return (
    <div className='w-full rounded-lg'>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className='mx-auto mb-8 text-center text-2xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl'
      >
        <Highlight className='text-black dark:text-white'>
          Manage Events
        </Highlight>
      </motion.h1>
      <motion.div className='relative flex w-full items-center justify-center mb-8'>
        <Modal>
          <ModalTrigger className='group/modal-btn flex h-10 w-40 items-center justify-center rounded-md border border-black bg-black text-white transition hover:bg-gray-800 dark:border-white dark:bg-white dark:text-black dark:hover:bg-gray-300'>
            Create Event
          </ModalTrigger>
          <ModalBody className='max-h-[90vh] overflow-y-auto'>
            <ModalContent className='w-full p-4'>
              <h4 className='mb-8 text-center text-lg font-bold text-neutral-600 dark:text-neutral-100 md:text-2xl'>
                Create a new event!
              </h4>
              <EventForm />
            </ModalContent>
          </ModalBody>
        </Modal>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className='w-full'
      >
        <ExpandableEvents />
      </motion.div>
    </div>
  )
}

export default EventsComponent
