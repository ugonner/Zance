import MyEvents from "@/components/features/events/MyEvents";
import Heading from "@/components/ui/common/Heading";
import Title from "@/components/ui/common/Title";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col gap-10">
      {/* Home Page Zance Banner */}
      <div className="mx-auto w-11/12 rounded-sm bg-gray-200 px-4 py-8 dark:bg-gray-800">
        <Heading type="secondary">Welcome to Zance</Heading>
        <Title className="mt-1 max-w-2xl">
          We have built a platform that feels more like a friendly assistant
          than a complicated software.
        </Title>
      </div>

      <div className="flex flex-col justify-center gap-2">
        <Heading type="tertiary">Event List</Heading>
        <Tabs defaultValue="mine">
          <TabsList className="flex w-fit items-center justify-start gap-2">
            <TabsTrigger value="mine">My Events</TabsTrigger>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="attending">Attending</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
          </TabsList>
          <h2 className="mb-6 mt-4 w-fit rounded-sm border px-4 py-2">
            SEARCH INPUT HERE
          </h2>
          <TabsContent value="mine">
            <MyEvents />
          </TabsContent>
          <TabsContent value="all">All Events</TabsContent>
          <TabsContent value="attending">Attending</TabsContent>
          <TabsContent value="saved">Saved</TabsContent>
          <TabsContent value="past">Past</TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
