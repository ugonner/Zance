import AllEvents from '@/components/features/events/AllEvents'
import AttendingEvents from '@/components/features/events/AttendingEvents'
import MyEvents from '@/components/features/events/MyEvents'
import PastEvents from '@/components/features/events/PastEvents'
import SavedEvents from '@/components/features/events/SavedEvents'
import Description from '@/components/ui/common/Description'
import Heading from '@/components/ui/common/Heading'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { SendHorizontal } from 'lucide-react'

export default function Home() {
  return (
    <section className='flex min-h-screen flex-col gap-10'>
      {/* Home Page Zance Banner */}
      <div className='mx-auto w-11/12 rounded-sm bg-gray-200 px-4 py-8 dark:bg-gray-800'>
        <Heading type='secondary'>Welcome to Zance</Heading>
        <Description className='mt-1 max-w-2xl'>
          We have built a platform that feels more like a friendly assistant than a complicated
          software.
        </Description>
      </div>

      <div className='flex flex-col justify-center gap-2'>
        <Heading type='tertiary'>Event List</Heading>
        <Tabs defaultValue='mine'>
          <TabsList className='flex max-w-fit items-center justify-start gap-2'>
            <TabsTrigger value='mine'>My Events</TabsTrigger>
            <TabsTrigger value='all'>All</TabsTrigger>
            {/* <TabsTrigger value='attending'>Attending</TabsTrigger>
            <TabsTrigger value='saved'>Saved</TabsTrigger>
            <TabsTrigger value='past'>Past</TabsTrigger> */}
          </TabsList>

          {/* Search Input */}
          {/* <div className='relative max-w-xs'>
            <Input type='text' placeholder='Enter event code' className='mb-8 mt-4 px-4' />
            <SendHorizontal
              size={25}
              className='absolute right-4 top-1/2 z-10 -translate-y-1/2 cursor-pointer text-secondary/85'
            />
          </div> */}

          <TabsContent value='mine'>
            <MyEvents />
          </TabsContent>
          <TabsContent value='all'>
            <AllEvents />
          </TabsContent>
          {/* <TabsContent value='attending'>
            <AttendingEvents />
          </TabsContent>
          <TabsContent value='saved'>
            <SavedEvents />
          </TabsContent>
          <TabsContent value='past'>
            <PastEvents />
          </TabsContent> */}
        </Tabs>
      </div>
    </section>
  )
}
