"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
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
import { Button } from "../ui/button";
import Heading from "../common/Heading";
import PasswordInput from "./PasswordInput";
import { FormType } from "@/types";

const EmailRegistrationDialog = ({
  isOpen,
  setOpenForm,
}: {
  isOpen: boolean;
  setOpenForm: (formName: FormType) => void;
}) => {
  const formSchema = z
    .object({
      email: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(2, { message: "Email must be at least 2 characters long" })
        .max(50, { message: "Email must be at most 50 characters long" }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50),
      passwordConfirm: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .max(50),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords must match",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Registration Form Values", values);
    setOpenForm(null);
    form.reset();
  };

  // A handler that will be executed when a user clicks login with email in the bottom section of the form
  const handleOpenLoginForm = () => {
    setOpenForm("login");
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) =>
        open ? setOpenForm("emailRegistration") : setOpenForm(null)
      }
    >
      <DialogContent className="!py-12">
        <DialogHeader>
          <Heading type="secondary" className="text-center">
            Welcome to Zance
          </Heading>
          <DialogDescription className="text-center">
            Home to the brave
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
                <PasswordInput
                  label="Enter password"
                  placeholder="********"
                  field={field}
                />
              )}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => (
                <PasswordInput
                  label="Re-enter password"
                  placeholder="********"
                  field={field}
                />
              )}
            />

            <Button type="submit">Create Account</Button>
          </form>
        </Form>

        <DialogFooter className="!flex-col !items-center !justify-center">
          <DialogDescription className="text-center">
            Don&apos;t have an account?
          </DialogDescription>

          <Button
            variant="link"
            className="text-sm"
            size="sm"
            onClick={handleOpenLoginForm}
          >
            Login with Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EmailRegistrationDialog;
