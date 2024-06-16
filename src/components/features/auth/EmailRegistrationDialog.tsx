"use client";

import React, { useState } from "react";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { CircleArrowLeft } from "lucide-react";

import { cn } from "@/lib/utils";
import { FormType } from "@/types";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";

import { Button } from "../../ui/button";
import Heading from "../../ui/common/Heading";
import PasswordInput from "./PasswordInput";
import Link from "next/link";
import CustomPhoneInput from "./CustomPhoneInput";

const EmailRegistrationDialog = ({
  isOpen,
  setOpenForm,
}: {
  isOpen: boolean;
  setOpenForm: (formName: FormType) => void;
}) => {
  // A state that will track the form steps - for multi step form.
  const [step, setStep] = useState<1 | 2>(1);

  // Helpful derived states for reusability
  const isFirstStep = step === 1;
  const isSecondStep = step === 2;

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
      terms: z.literal(true, {
        errorMap: () => ({
          message: "You must agree to the terms of use",
        }),
      }),
      fullName: z
        .string()
        .min(2, { message: "Full name must be at least 2 characters long" })
        .max(100, { message: "Full name must be at most 100 characters long" }),
      professionalEmail: z
        .string()
        .email({ message: "Please enter a valid email address" })
        .min(2, { message: "Email must be at least 2 characters long" })
        .max(50, { message: "Email must be at most 50 characters long" }),
      phoneNumber: z.string().regex(/^\+?[1-9]\d{1,14}$/, {
        message: "Please enter a valid phone number",
      }),
      professionalLink: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional(),
      portfolioWebsite: z
        .string()
        .url({ message: "Please enter a valid URL" })
        .optional(),
      workPlace: z
        .string()
        .min(2, { message: "Work place must be at least 2 characters long" })
        .max(100, { message: "Work place must be at most 100 characters long" })
        .optional(),
      location: z
        .string()
        .min(2, { message: "Location must be at least 2 characters long" })
        .max(100, { message: "Location must be at most 100 characters long" }),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      path: ["passwordConfirm"],
      message: "Passwords must match",
    });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  const handleNextClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const isStepValid = await form.trigger([
      "email",
      "password",
      "passwordConfirm",
      "terms",
    ]);
    if (isStepValid) setStep(2);
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Registration Form Values", values);
    setStep(1);
    setOpenForm(null);
    form.reset();
  };

  // A handler that will be executed when a user clicks login with email in the bottom section of the form
  const handleOpenLoginForm = () => {
    form.reset();
    setOpenForm("login");
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) =>
        open ? setOpenForm("emailRegistration") : setOpenForm(null)
      }
    >
      <DialogContent>
        {isSecondStep && (
          <CircleArrowLeft
            size={28}
            className="cursor-pointer transition-transform hover:scale-105"
            onClick={() => {
              setStep(1);
            }}
          />
        )}
        <DialogHeader>
          <Heading
            type="secondary"
            className={cn(isFirstStep ? "text-center" : "text-left")}
          >
            {isFirstStep ? "Welcome to Zance" : "Setup your account"}
          </Heading>
          <DialogDescription
            className={cn(isFirstStep ? "text-center" : "text-left")}
          >
            {isFirstStep
              ? "Home to the brave"
              : "Please fill in your correct details"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col justify-center gap-4 py-4 md:gap-6"
          >
            {/* Inputs in first step form */}
            {isFirstStep && (
              <>
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

                <FormField
                  control={form.control}
                  name="terms"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormLabel>
                          I have read and agreed to the{" "}
                          <Link href="/" className="text-blue-500">
                            Terms of use
                          </Link>
                        </FormLabel>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {/* Inputs in second step form */}
            {isSecondStep && (
              <>
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Start with your first name"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* TODO: Implement react phone number instead of text field */}
                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <CustomPhoneInput
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <FormField
                    control={form.control}
                    name="professionalEmail"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Professional Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter your professional email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="workPlace"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Work Place
                          <span className="ml-1 text-gray-500">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter company/startup name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col gap-6 md:flex-row md:items-center">
                  <FormField
                    control={form.control}
                    name="professionalLink"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Professional Link
                          <span className="ml-1 text-gray-500">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Professional Link"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="portfolioWebsite"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>
                          Portfolio Website
                          <span className="ml-1 text-gray-500">(optional)</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Enter Portfolio website"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input placeholder="Merryside, London" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            {isFirstStep && <Button onClick={handleNextClick}>Next</Button>}
            {isSecondStep && <Button type="submit">Create Account</Button>}
          </form>
        </Form>

        {isFirstStep && (
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
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailRegistrationDialog;
