"use client";

import GridContainer from "@/components/ui/containers/GridContainer";
import React, { useEffect } from "react";
import EventCard from "./EventCard";
import EVENTS from "@/consts/Events";

const AllEvents = () => {
  useEffect(() => {
    console.log("ALL EVENTS COMPONENT MOUNTED");
  }, []);

  return (
    <GridContainer>
      {EVENTS.map((event) => (
        <EventCard key={event?.title} event={event} />
      ))}
    </GridContainer>
  );
};

export default AllEvents;
