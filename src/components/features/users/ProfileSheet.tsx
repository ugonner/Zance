import React from "react";

import { Linkedin, Mail, MapPin, Phone } from "lucide-react";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import InterestCard from "@/components/features/users/InterestCard";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "@/store/reducers/authSlice";
import Heading from "@/components/ui/common/Heading";
import { DEFAULT_IMAGE_PLACEHOLDER } from "@/consts/Users";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { formatDateString } from "@/lib/DateTime";

const ProfileSheet = ({ trigger }: { trigger: React.ReactNode }) => {
  const loggedInUser = useSelector(getLoggedInUser);

  const email = loggedInUser?.email;

  const fallbackProfile = "User";

  const {
    fullname,
    profilePhoto,
    contactDetails,
    socialLinks,
    professionalTitle,
    bio,
    location,
    joiningDate,
    interests,
  } = loggedInUser?.profile || {
    _id: "",
    email: "",
    profile: {
      socialLinks: {
        linkedIn: "",
      },
      contactDetails: {
        phone: "",
      },
      profilePhoto: "",
      fullname: "",
      professionalTitle: "",
      location: "",
      bio: "",
      interests: [],
      joiningDate: `${new Date()}`,
    },
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-xl font-bold leading-6 tracking-tight lg:text-2xl lg:leading-8">
            Profile
          </SheetTitle>
        </SheetHeader>

        <Separator className="my-4" />

        <section>
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-lg font-semibold">Basic Information</h2>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={profilePhoto || DEFAULT_IMAGE_PLACEHOLDER}
                  />
                  <AvatarFallback>{fallbackProfile}</AvatarFallback>
                </Avatar>

                <div className="flex flex-col justify-center">
                  <p className="text-sm font-semibold">{fullname}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Joined {formatDateString(joiningDate as string)}
                  </p>
                </div>
              </div>

              <Separator className="py-4" orientation="vertical" />

              {/* Workplace */}
              <div className="flex flex-col justify-center">
                <h2 className="text-sm font-semibold">{professionalTitle}</h2>
                <h3 className="text-sm text-gray-600 dark:text-gray-400">
                  Sessami
                </h3>
              </div>
            </div>
          </div>

          <Separator className="my-4" />

          {/* Bio */}
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-lg font-semibold">Bio</h2>
            <p className="text-sm">{bio}</p>
          </div>

          <Separator className="my-4" />

          {/* Socials */}
          {socialLinks?.linkedIn && (
            <div className="flex flex-col justify-center gap-2">
              <h2 className="text-lg font-semibold">Socials</h2>
              <Link
                target="_blank"
                href={socialLinks.linkedIn}
                className="flex items-center gap-2"
              >
                <Linkedin size={18} className="text-primary" />
                <p className="text-sm font-medium hover:font-semibold">
                  {fullname}
                </p>
              </Link>
            </div>
          )}

          <Separator className="my-4" />

          {/* Professional Contact */}
          <div className="flex flex-col items-start justify-center gap-2">
            <h2 className="text-lg font-semibold">Professional Contact</h2>

            {/* Phone */}
            <p className="flex items-center gap-2">
              <Phone size={18} />
              <span className="text-sm">{contactDetails?.phone}</span>
            </p>

            {/* Location */}
            <p className="flex items-center gap-2">
              <MapPin size={18} />
              <span className="text-sm">{location}</span>
            </p>

            {/* Email */}
            <p className="flex items-center gap-2">
              <Mail size={18} />
              <span className="text-sm">{email}</span>
            </p>
          </div>

          <Separator className="my-4" />

          {/* Interests */}
          <div className="flex flex-col justify-center gap-2">
            <h2 className="text-lg font-semibold">Interests</h2>
            <div className="flex flex-wrap items-center gap-2">
              {interests?.map((interest) => (
                <InterestCard key={interest} interest={interest} />
              ))}
            </div>
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
};

export default ProfileSheet;
