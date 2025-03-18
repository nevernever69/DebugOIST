'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function DashboardPage() {
  const t = useTranslations('');

  return (
    <div>
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-24">
        <motion.h1
          className="text-center text-6xl md:text-7xl font-extrabold leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {t('Welcome to')}{' '}
          <span className="flex flex-col items-center justify-center bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            {t('DEBUG')}
          </span>
        </motion.h1>

        <motion.p
          className="my-6 px-10 md:px-20 text-center text-xl md:text-2xl text-neutral-500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {t('THINK. BUILD. DEPLOY.')}
        </motion.p>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-20">
        <div className="mx-auto grid max-w-screen-lg grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-12">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="mb-3 text-2xl font-semibold text-blue-500">Approachable</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              The Debug Programming Club fosters a welcoming environment for all coders, from beginners to experts.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <h2 className="mb-3 text-2xl font-semibold text-purple-500">Versatile</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              From competitive programming to real-world projects, we cover a wide range of tech domains.
            </p>
          </motion.div>

          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="mb-3 text-2xl font-semibold text-pink-500">Performant</h2>
            <p className="text-neutral-600 dark:text-neutral-400">
              We focus on building high-performance solutions and improving coding efficiency.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
