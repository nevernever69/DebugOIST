import React from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Button from '@/src/app/[locale]/components/Button'
import { MoreHorizontal } from 'lucide-react'

const EventsComponent: React.FC = () => {
  const events = [
    {
      id: 1,
      name: 'Event 1',
      description: 'Description 1',
      thumnail: 'https://via.placeholder.com/150',
      date: '2021-08-01',
      time: '12:00',
      registration: new Date('2021-07-01').getTime()
    },
    {
      id: 2,
      name: 'Event 2',
      description: 'Description 2',
      thumnail: 'https://via.placeholder.com/150',
      date: '2021-08-02',
      time: '12:00',
      registration: new Date('2025-07-02').getTime()
    },
    {
      id: 3,
      name: 'Event 3',
      description: 'Description 3',
      thumnail: 'https://via.placeholder.com/150',
      date: '2021-08-03',
      time: '12:00',
      registration: new Date('2021-07-03').getTime()
    },
    {
      id: 4,
      name: 'Event 4',
      description: 'Description 4',
      thumnail: 'https://via.placeholder.com/150',
      date: '2021-08-04',
      time: '12:00',
      registration: new Date('2025-07-04').getTime()
    }
  ]
  return (
    <Card>
      <CardHeader>
        <CardTitle className={'text-2xl'}>Events</CardTitle>
        <CardDescription className={'text-xl'}>Manage events</CardDescription>
      </CardHeader>
      <CardContent
        className={'flex flex-col items-center justify-center space-y-10'}
      >
        <div
          className={
            'flex h-72 w-1/2 cursor-pointer flex-col items-center justify-center space-y-4 rounded-lg border-4 border-dashed p-4'
          }
        >
          <h3 className={'text-center text-lg font-semibold'}>Create Event</h3>
        </div>

        <Table>
          <TableCaption>Events</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead colSpan={2}>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Registration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.map(event => (
              <TableRow key={event.id}>
                <TableCell colSpan={2}>{event.name}</TableCell>
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>
                  {event.registration > Date.now() ? 'Open' : 'Closed'}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant={'ghost'} className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal color={'black'} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      align={'end'}
                      className={'bg-dropdown'}
                    >
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator
                        className={'mx-auto bg-selected'}
                      />
                      <DropdownMenuItem className={'cursor-pointer'}>
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem className={'cursor-pointer'}>
                        Update
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4}>Total events: {events.length}</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  )
}

export default EventsComponent
