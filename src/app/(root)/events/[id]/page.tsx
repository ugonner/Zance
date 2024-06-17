import Heading from "@/components/ui/common/Heading";
import Description from "@/components/ui/common/Description";
import GridContainer from "@/components/ui/containers/GridContainer";
import { CalendarDays, Clock9, Copy, File, MapPin } from "lucide-react";
import React from "react";
import { Separator } from "@/components/ui/separator";
import TagCard from "@/components/features/events/TagCard";
import AvatarStack from "@/components/features/users/AvatarStack";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const EventDetailPage = () => {
  return (
    <GridContainer>
      <section className="col-span-full flex flex-col justify-center gap-4 md:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          {/* Event name, time & location */}
          <div className="flex flex-col items-start gap-2 md:flex-1">
            <Heading type="secondary">Leadership Conference</Heading>

            <div className="flex flex-col items-start gap-2">
              <time className="flex items-center justify-center gap-2">
                <CalendarDays
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description className="text-primary">
                  Tue, 20th April 2024
                </Description>
              </time>

              <time className="flex items-center justify-center gap-2">
                <Clock9
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description>12pm - 3pm</Description>
              </time>

              <span className="flex items-center justify-center gap-2">
                <MapPin
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description>Online event (Zoom)</Description>
              </span>
            </div>
          </div>

          {/* Event Image */}
          <div className="relative aspect-video flex-1 overflow-hidden rounded-sm md:flex-[.6]">
            <Image
              src="/images/seminar.jpg"
              fill
              objectFit="cover"
              alt="Seminar"
            />
          </div>
        </div>
        <Separator className="bg-secondary" />

        {/* Description & Tags */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Description</Heading>
            <Description className="text-justify">
              Join us at the Global Leadership Conference 2024, an unparalleled
              gathering of leaders, innovators, and change-makers from around
              the world. This prestigious three-day event, held from July 10 to
              July 12 at the luxurious Grand Hyatt Hotel in New York City,
              promises to be a transformative experience designed to empower and
              inspire current and future leaders. Hear from world-renowned
              leaders and visionaries across various industries who will share
              their insights on leadership, innovation, and strategic thinking.
              Interactive Workshops: Participate in hands-on workshops that
              cover essential leadership skills, including effective
              communication, decision-making, and team building. Panel
              Discussions: Engage with experts in panel discussions addressing
              the most pressing leadership challenges and opportunities in
              today&apos;s dynamic environment.
            </Description>
          </div>

          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Tags</Heading>

            <div className="flex flex-wrap items-center gap-2">
              {["Technology", "AI", "Global market", "development", "idea"].map(
                (tag) => (
                  <TagCard key={tag} tag={tag} />
                ),
              )}
            </div>
          </div>
        </div>

        <Separator className="bg-secondary" />

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Brochure</Heading>
            <Description className="flex items-center gap-2">
              <File className="cursor-pointer" size={20} />
              <span>Q2 Board meeting Review</span>
            </Description>
          </div>

          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Code</Heading>
            <Description className="flex items-center gap-2">
              <span>XYZ-123</span> <Copy className="cursor-pointer" size={20} />
            </Description>
          </div>

          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Attendees</Heading>

            <div className="flex items-center gap-2">
              <AvatarStack
                size={10}
                images={[
                  {
                    src: "https://github.com/torvalds.png",
                    alt: "User 1",
                  },
                  {
                    src: "https://github.com/johnpapa.png",
                    alt: "User 2",
                  },
                  {
                    src: "https://github.com/jessfraz.png",
                    alt: "User 3",
                  },
                ]}
              />
              <p className="text-sm text-gray-400 dark:text-gray-200">
                500 Registered
              </p>
            </div>
          </div>
        </div>

        <Button className="mt-4 max-w-72">Register for this event</Button>
      </section>
    </GridContainer>
  );
};

export default EventDetailPage;
