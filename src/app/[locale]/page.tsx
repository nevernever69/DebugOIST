'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { SplineSceneBasic } from '@/components/ModelThreeD';

export default function DashboardPage() {
  const t = useTranslations('');

  return (
    <div>
      <SplineSceneBasic />
    </div>
  );
}
