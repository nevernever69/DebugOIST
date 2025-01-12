import { useTranslations } from 'next-intl'

export default function Dashboard() {
  const t = useTranslations('')
  return (
    <div className='px-32 py-24 min-h-screen text-center text-2xl'>
      <div className='flex justify-center'>
        If you can see this page you are logged in
      </div>
    </div>
  )
}
