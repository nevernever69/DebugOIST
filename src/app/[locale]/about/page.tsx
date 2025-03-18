import { useTranslations } from 'next-intl'
import { AnimatedTooltipPreview } from '@/components/MembersProfilePage'

export default function About() {
  const t = useTranslations('')
  return (
    <div>
      <AnimatedTooltipPreview />
    </div>
  )
}
