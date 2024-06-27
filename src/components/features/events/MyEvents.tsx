"use client";

import GridContainer from "@/components/ui/containers/GridContainer";
import React, { useEffect } from "react";
import EventCard from "./EventCard";
import EVENTS from "@/consts/Events";

const MyEvents = () => {
  useEffect(() => {
    console.log("MY EVENTS COMPONENT MOUNTED");
  }, []);

  return (
    <GridContainer>
      {EVENTS.map((event) => (
        <EventCard key={event?.title} event={event} />
      ))}
    </GridContainer>
  );
};

export default MyEvents;
