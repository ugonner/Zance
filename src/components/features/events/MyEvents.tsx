"use client";

import GridContainer from "@/components/ui/containers/GridContainer";
import React, { useEffect } from "react";
import EventCard from "./EventCard";

const EVENTS = [
  {
    id: 1,
    image: "https://github.com/shadcn.png",
    title: "Leadership Conference",
    time: "Monday, 9th February",
    type: "Online event (Zoom)",
  },
  {
    id: 2,
    image: "https://github.com/shadcn.png",
    title: "Party Night with girls (Don't bring your kids with you please)",
    time: "Tuesday, 10th February",
    type: "Night club",
  },
  {
    id: 3,
    image: "https://github.com/shadcn.png",
    title: "JavaScript Hackathon",
    time: "Wednesday, 11th July",
    type: "Online event (Zoom)",
  },
  {
    id: 4,
    image: "https://github.com/shadcn.png",
    title: "Tech Exihibition",
    time: "Monday, 9th February",
    type: "Physical Event",
  },
];

const MyEvents = () => {
  useEffect(() => {
    console.log("MY EVENTS COMPONENT MOUNTED");
  }, []);

  return (
    <GridContainer className="sm:px-8 md:px-0">
      {EVENTS.map((event) => (
        <EventCard key={event?.title} event={event} />
      ))}
    </GridContainer>
  );
};

export default MyEvents;
