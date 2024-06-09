"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "./ui/button";
import Heading from "./Heading";
import Title from "./Title";
import EmailRegistrationForm from "./EmailRegistrationForm";
import { cn } from "@/lib/utils";

const LoginForm = ({
  isLink = false,
  className = "",
}: {
  isLink?: boolean;
  className?: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formSchema = z.object({
    email: z
      .string()
      .email({ message: "Please enter a valid email address" })
      .min(2, { message: "Email must be at least 2 characters long" })
      .max(50, { message: "Email must be at most 50 characters long" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(50),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Login Form Values", values);
    setIsOpen(false);
    form.reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size={isLink ? "sm" : "lg"}
          className={cn("flex-1", className)}
          variant={isLink ? "link" : "secondary"}
        >
          Login with Email
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <Heading type="secondary" className="text-center">
            Welcome back
          </Heading>
          <DialogDescription className="text-center">
            Create, Share, and Experience Extraordinary Events
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full max-w-[80%] flex-col justify-center gap-6 py-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter email address</FormLabel>
                  <FormControl>
                    <Input placeholder="camelia@zance.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="********" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Login</Button>
          </form>
        </Form>

        <DialogFooter className="!flex-col !items-center !justify-center gap-2">
          <Title className="!text-sm text-gray-600 dark:text-gray-400">
            Don&apos;t have an account?
          </Title>
          <EmailRegistrationForm isLink className="text-sm" />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
