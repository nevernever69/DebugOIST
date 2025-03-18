'use client';
import React from 'react';
import { Highlight } from '@/src/components/ui/hero-highlight';
import { motion } from 'framer-motion';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger
} from '@/src/components/ui/animated-modal';
import EventForm from '@/src/components/EventForm';
import { ExpandableEvents } from '@/src/components/EventsList';

const EventsComponent: React.FC = () => {
  return (
    <div className="w-full rounded-lg bg-black text-white p-6">
      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="mx-auto mb-8 text-center text-3xl font-semibold md:text-4xl lg:text-5xl"
      >
        <Highlight className="text-white">
          Manage Events
        </Highlight>
      </motion.h1>

      {/* Create Event Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        className="flex justify-center mb-6"
      >
        <Modal>
          <ModalTrigger className="flex h-12 w-44 items-center justify-center rounded-lg bg-gray-800 text-white transition hover:bg-gray-700">
            + Create Event
          </ModalTrigger>
          <ModalBody className="max-h-[90vh] overflow-y-auto">
            <ModalContent className="w-full p-6 bg-gray-900 rounded-lg">
              <h4 className="mb-6 text-center text-xl font-medium text-gray-300">
                Create a new event!
              </h4>
              <EventForm />
            </ModalContent>
          </ModalBody>
        </Modal>
      </motion.div>

      {/* Events List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      >
        <ExpandableEvents />
      </motion.div>
    </div>
  );
};

export default EventsComponent;
