"use client";

import GridContainer from "@/components/ui/containers/GridContainer";
import React, { useEffect } from "react";
import EventCard from "./EventCard";
import EVENTS from "@/consts/Events";

const AttendingEvents = () => {
  useEffect(() => {
    console.log("ATTENDING EVENTS COMPONENT MOUNTED");
  }, []);

  const getRandomizedEvents = (events: any) => {
    const shuffledEvents = [...events].sort(() => 0.5 - Math.random());
    const randomLength = Math.floor(Math.random() * events.length) + 1;
    return shuffledEvents.slice(0, randomLength);
  };

  const randomEvents = getRandomizedEvents(EVENTS);

  return (
    <GridContainer>
      {randomEvents.map((event) => (
        <EventCard key={event?.title} event={event} />
      ))}
    </GridContainer>
  );
};

export default AttendingEvents;
