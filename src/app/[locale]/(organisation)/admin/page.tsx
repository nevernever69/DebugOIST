import dynamic from 'next/dynamic'
import { Tabs } from '@/src/components/ui/tabs'
import { BackgroundBeamsWithCollision } from '@/src/components/ui/background-beams-with-collision'

// Dynamically import the EventsComponent to optimize loading
const EventsComponent = dynamic(
  () => import('@/src/app/[locale]/components/admin/Events'),
  {
    ssr: false
  }
)

const AdminPage = () => {
  const tabs = [
    {
      title: 'Events',
      value: 'events',
      content: <EventsComponent />
    },
    {
      title: 'Members',
      value: 'members',
      content: <Members />
    }
  ]

  return (
    <section className='min-h-screen mx-auto max-w-7xl py-6 antialiased sm:px-6 lg:px-8'>
      <h1 className='mb-6 text-3xl font-bold'>Admin Dashboard</h1>
      <Tabs tabs={tabs} />
    </section>
  )
}

export default AdminPage

function Members() {
  return (
    <BackgroundBeamsWithCollision>
      <h2 className='relative z-20 text-center font-sans text-2xl font-bold tracking-tight text-black dark:text-white md:text-4xl lg:text-7xl'>
        What&apos;s cooler than Beams?{' '}
        <div className='relative mx-auto inline-block w-max [filter:drop-shadow(0px_1px_3px_rgba(27,_37,_80,_0.14))]'>
          <div className='absolute left-0 top-[1px] bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent [text-shadow:0_0_rgba(0,0,0,0.1)]'>
            <span className=''>Exploding beams.</span>
          </div>
          <div className='relative bg-gradient-to-r from-purple-500 via-violet-500 to-pink-500 bg-clip-text bg-no-repeat py-4 text-transparent'>
            <span className=''>Exploding beams.</span>
          </div>
        </div>
      </h2>
    </BackgroundBeamsWithCollision>
  )
}
