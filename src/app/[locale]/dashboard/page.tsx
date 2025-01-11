import { useTranslations } from 'next-intl'
import Button from './components/Button'

export default function Dashboard() {
  const t = useTranslations('')
  return (
    <div className="px-32 py-24 text-center text-2xl">
    <div className="flex justify-center">
        If you can see this page you are logged in
    </div>
    </div>
  )
}
