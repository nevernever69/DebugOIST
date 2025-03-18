import { useTranslations } from 'next-intl'
import { AnimatedTooltipPreview } from '@/components/MembersProfilePage'
import { TimelineDemo } from '@/components/TimeLinePage'


export default function About() {
  const t = useTranslations('')
  return (
    <div>
      <AnimatedTooltipPreview />
      <TimelineDemo />
    </div>
  )
}


