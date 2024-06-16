"use client";

import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const CustomPhoneInput = ({
  value,
  onChange,
  placeholder,
}: PhoneInputProps) => {
  return (
    <PhoneInput
      country="us"
      value={value}
      onChange={onChange}
      placeholder={placeholder || "Enter phone number"}
      buttonClass="!rounded-md !border !border-slate-200 !bg-white dark:!border-slate-800 dark:!bg-slate-950"
      inputClass="!flex !h-12 !w-full !rounded-md !border !border-slate-200 !bg-white !text-sm !ring-offset-white placeholder:!text-slate-500 focus-visible:!outline-none focus-visible:!ring-2 focus-visible:!ring-slate-950 focus-visible:!ring-offset-2 dark:!border-slate-800 dark:!bg-slate-950 dark:!ring-offset-slate-950 dark:!placeholder:text-slate-400 dark:!focus-visible:ring-slate-300"
      containerClass="!w-full"
      dropdownClass="!text-slate-800"
    />
  );
};

export default CustomPhoneInput;
