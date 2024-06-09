"use client";

import EmailRegistrationForm from "@/components/EmailRegistrationForm";
import Heading from "@/components/Heading";
import LoginForm from "@/components/LoginForm";
import Title from "@/components/Title";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/components/ui/use-toast";
import React from "react";

const AuthPage = () => {
  const { toast } = useToast();
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Heading className="text-center">Set up your account</Heading>

      <Title className="text-center">
        Create events, manage attendee lists and expand your horizon
      </Title>

      <div className="my-4 flex flex-wrap items-center gap-4">
        <Button
          size="lg"
          className="flex-1"
          onClick={() => {
            toast({
              variant: "destructive",
              title: "Coming soon!",
              description:
                "Registering with LinkedIn will be available soon. Stay tuned!",
            });
          }}
        >
          Register with LinkedIn
        </Button>
        <EmailRegistrationForm />
      </div>

      <Separator />

      <Title className="text-gray-600 dark:text-gray-400">
        Already have an account?
      </Title>

      <LoginForm isLink />
    </div>
  );
};

export default AuthPage;
