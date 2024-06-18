"use client";

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
import EventCard from "@/components/features/events/EventCard";
import { useParams } from "next/navigation";
import EVENTS from "@/consts/Events";

const EventDetailPage = () => {
  const params = useParams();

  const event = EVENTS.find((event) => event.id === +params.id);

  return (
    <GridContainer>
      <section className="col-span-full flex flex-col justify-center gap-4 md:gap-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-0">
          {/* Event name, time & location */}
          <div className="flex flex-col items-start gap-2 md:flex-1">
            <Heading type="secondary">{event?.title}</Heading>

            <div className="flex flex-col items-start gap-2">
              <time className="flex items-center justify-center gap-2">
                <CalendarDays
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description className="text-primary">
                  {event?.date}
                </Description>
              </time>

              <time className="flex items-center justify-center gap-2">
                <Clock9
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description>{event?.time}</Description>
              </time>

              <span className="flex items-center justify-center gap-2">
                <MapPin
                  className="text-white dark:text-background"
                  fill="#B7B7BB"
                  size={25}
                />
                <Description>{event?.location}</Description>
              </span>
            </div>
          </div>

          {/* Event Image */}
          <div className="relative aspect-video flex-1 overflow-hidden rounded-sm md:flex-[.6]">
            <Image
              src={event?.image ? event.image : ""}
              fill
              objectFit="cover"
              alt={`Image for event ${event?.title}`}
            />
          </div>
        </div>
        <Separator className="bg-secondary" />

        {/* Description & Tags */}
        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Description</Heading>
            <Description className="text-justify">
              {event?.description}
            </Description>
          </div>

          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Tags</Heading>

            <div className="flex flex-wrap items-center gap-2">
              {event?.tags.map((tag) => <TagCard key={tag} tag={tag} />)}
            </div>
          </div>
        </div>

        <Separator className="bg-secondary" />

        <div className="flex flex-col items-start gap-4">
          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Brochure</Heading>
            <Description className="flex items-center gap-2">
              <File className="cursor-pointer" size={20} />
              <span>{event?.eventBrochure}</span>
            </Description>
          </div>

          <div className="flex flex-col gap-2">
            <Heading type="tertiary">Event Code</Heading>
            <Description className="flex items-center gap-2">
              <span>{event?.id}</span>{" "}
              <Copy className="cursor-pointer" size={20} />
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
                {event?.attendees} Registered
              </p>
            </div>
          </div>
        </div>

        <Button className="max-w-72">Register for this event</Button>
      </section>

      <section className="col-span-full">
        <Heading type="tertiary" className="mb-4">
          Other events like this
        </Heading>
        <GridContainer>
          {EVENTS.map((event) => (
            <EventCard key={event?.title} event={event} />
          ))}
        </GridContainer>
      </section>

      {/* Event Recommendations */}
    </GridContainer>
  );
};

export default EventDetailPage;
