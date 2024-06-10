"use client";

import React, { useState } from "react";
import { FormControl, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { ControllerRenderProps } from "react-hook-form";
import { EmailRegistrationFormData, LoginFormData } from "@/types";
import { Eye, EyeOff } from "lucide-react";

const PasswordInput = ({
  field,
  label,
  placeholder,
}: {
  field:
    | ControllerRenderProps<LoginFormData, "password">
    | ControllerRenderProps<
        EmailRegistrationFormData,
        "password" | "passwordConfirm"
      >;
  label: string;
  placeholder: string;
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <FormItem>
      <FormLabel>{label}</FormLabel>
      <div className="relative">
        <FormControl>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder={placeholder}
            {...field}
          />
        </FormControl>
        <FormMessage />

        <button
          type="button"
          onClick={toggleShowPassword}
          className="absolute inset-y-0 right-0 flex items-center pr-3"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </FormItem>
  );
};

export default PasswordInput;
