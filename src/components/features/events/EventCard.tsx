import Heading from "@/components/ui/common/Heading";
import { Bookmark, Share } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

// TODO: remove this any type from ts
const EventCard = ({ event }: { event: any }) => {
  return (
    <Link
      href={`/events/${event?.id}`}
      className="group col-span-full overflow-hidden rounded-sm md:col-span-2 lg:col-span-3"
    >
      <figure className="relative aspect-video overflow-hidden rounded-sm">
        <Image
          src={event.image}
          alt="Event Card"
          layout="fill"
          objectFit="cover"
          loading="lazy"
          className="transition-transform group-hover:scale-105"
        />
      </figure>

      <section className="flex items-start py-4">
        <div className="flex flex-[4] flex-col justify-center gap-0.5 text-base">
          <h2 className="text-lg font-medium">{event.title}</h2>
          <time className="text-primary">{event.time}</time>
          <p className="text-sm text-gray-400">{event.type}</p>
        </div>
        <div className="flex flex-1 justify-end">
          <Bookmark size={25} className="text-gray-800" />
        </div>
      </section>
    </Link>
  );
};

export default EventCard;
