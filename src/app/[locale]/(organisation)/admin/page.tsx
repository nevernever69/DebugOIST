'use client'
import { Skeleton } from '@/components/ui/skeleton'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import EventsComponent from '@/src/app/[locale]/components/admin/Events'

const AdminPage = () => {
  return (
    <section className={'mx-auto max-w-7xl py-6 sm:px-6 lg:px-8'}>
      <h1 className={'mb-6 text-3xl font-bold'}>Admin Dashboard</h1>
      <Tabs defaultValue={'events'}>
        <TabsList className={'my-4 grid w-full grid-cols-2 space-x-4'}>
          <TabsTrigger value={'events'} className={'p-4 text-center'}>
            Events
          </TabsTrigger>
          <TabsTrigger value={'members'} className={'p-4 text-center'}>
            Members
          </TabsTrigger>
        </TabsList>
        <TabsContent value={'events'} className={'p-4'}>
          <EventsComponent />
          <Skeleton />
        </TabsContent>
        <TabsContent value={'members'} className={'p-4'}>
          <h2>Members</h2>
          <Skeleton />
        </TabsContent>
      </Tabs>
    </section>
  )
}

export default AdminPage
