import { useTranslations } from 'next-intl'
import Button from './components/Button'

export default function DashboardPage() {
  const t = useTranslations('')
  return (
    <div>
      <section className='flex flex-col items-center justify-center py-24'>
        <h1 className='text-center text-7xl font-extrabold leading-tight'>
          {t('')}{' '}
          <span className='flex flex-col items-center justify-center '>
            {t('DEBUG')}
          </span>
          </h1>
        <div className='my-6 px-20 text-center text-2xl text-text-secondary'>
          {t(
            'THINK. BUILD. DEPLOY.'
          )}
        </div>
        <div className='mt-4 flex flex-row gap-4'>
          <a
            href='https://github.com/Nev-Labs/Website.git'
            target='_blank'
          >
            <Button rounded size='large'>
              {t('Instagram')}
            </Button>
          </a>
          <a
            href='https://github.com/Nev-Labs/Website.git'
            target='_blank'
          >
            <Button rounded size='large' variant='secondary'>
              {t('Github')}
            </Button>
          </a>
        </div>
      </section>
      <section className='bg-background-secondary py-20 max-lg:py-10'>
        <div className='mx-auto grid max-w-screen-lg grid-cols-3 gap-7 px-8 py-5 max-lg:max-w-fit max-lg:grid-cols-1 max-lg:gap-10'>
          <div className='text-center'>
            <h2 className='mb-3  text-xl font-semibold'>{t('Approachable')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t(
                ''
              )}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>{t('Versatile')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t(
                ''
              )}
            </p>
          </div>
          <div className='text-center'>
            <h2 className='mb-3 text-xl font-semibold'>{t('Performant')}</h2>
            <p className='text-text-secondary max-lg:max-w-[500px]'>
              {t(
                ''
              )}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
