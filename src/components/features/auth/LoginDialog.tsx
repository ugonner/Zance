"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Button } from "../../ui/button";
import PasswordInput from "./PasswordInput";

import { useToast } from "@/components/ui/use-toast";
import { FormType, LoginFormData, LoginResponse } from "@/types";
import useApi from "@/hooks/useApi";
import Loader from "@/components/ui/common/Loader";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/reducers/authSlice";
import { useRouter } from "next/navigation";
import ROUTES from "@/consts/Routes";
import { setCookie } from "@/lib/cookies";

const LoginDialog = ({
  isOpen,
  setOpenForm,
}: {
  isOpen: boolean;
  setOpenForm: (formName: FormType) => void;
}) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();
  const { createData, loading: isSubmitting } = useApi<
    LoginFormData,
    LoginResponse
  >();

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

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const loginCredentials: LoginFormData = {
        email: values.email,
        password: values.password,
      };
      const res = await createData("auth/login", loginCredentials);

      const token = res.data.token;

      const userData = res.data.user;

      // @ts-ignore
      setCookie("token", token, { expires: "forever", path: "/" });

      // @ts-ignore
      dispatch(setUser({ user: userData, token }));

      setOpenForm(null);
      form.reset();

      toast({
        title: res.message,
      });

      router.push(ROUTES.HOME);
    } catch (err) {
      toast({
        variant: "destructive",
        title: `${err}`,
      });
    }
  };

  // A handler that will be executed when a user clicks register with email in the bottom section of the form
  const handleOpenEmailRegistrationForm = () => {
    setOpenForm("emailRegistration");
    form.reset();
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => (open ? setOpenForm("login") : setOpenForm(null))}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Welcome back</DialogTitle>
          <DialogDescription className="text-center">
            Please login into your account to continue
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="mx-auto flex w-full flex-col justify-center gap-6 py-4"
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
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  Logging in
                  <Loader />
                </span>
              ) : (
                "Login"
              )}
            </Button>
          </form>
        </Form>

        <DialogFooter className="!flex-col !items-center !justify-center">
          <DialogDescription className="text-center">
            Don&apos;t have an account?
          </DialogDescription>

          <Button
            variant="link"
            size="sm"
            className="text-sm"
            onClick={handleOpenEmailRegistrationForm}
          >
            Register with Email
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default LoginDialog;
