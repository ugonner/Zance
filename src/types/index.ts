export type FormType = 'login' | 'emailRegistration' | null

// User
export interface User {
  profile: {
    socialLinks: {
      linkedIn: string
    }
    contactDetails: {
      phone: string
    }
    profilePhoto: string
    fullname: string
    workplace?: string
    professionalTitle: string
    location: string
    bio: string
    interests: string[]
    joiningDate: string
  }
  _id: string
  email: string
}

// Login Form
export interface LoginFormData {
  email: string
  password: string
}

export interface LoginResponse {
  status: string
  message: string
  data: {
    user: User
    token: string
  }
}

// Email registration form
export interface EmailRegistrationResponse {
  status: string
  message: string
  user: User
}

export interface EmailRegistrationFormData {
  email: string
  password: string
  passwordConfirm?: string
}

// user Profile form
export interface ProfileData {
  profile: {
    fullname: string
    professionalTitle: string
    workplace?: string
    location: string
    bio?: string
    profilePhoto?: string
    interests: string[] | []
    socialLinks: {
      linkedIn?: string
    }
    contactDetails: {
      phone: string
    }
  }
}

export interface ProfileFormData {
  fullName: string
  phoneNumber: string
  professionalTitle: string
  linkedInLink: string
  workPlace?: string
  location: string
  bio?: string
  profilePhoto?: string
  profilePhotoFile?: string | File
  imageString?: string
  interests: string[]
}

export interface ProfileResponse {
  status: string
  message: string
  data: User
}

// Event
export interface Event {
  name: string
  description: string
  tags: string[]
  eventDate: Date
  startTime: string
  endTime: string
  startDate?: Date
  endDate?: Date
  banner?: File | string
  brochure?: File | string
  timezone: string
  location: {
    type: 'online' | 'physical'
    meetingLink?: string
    address?: string
    postcode?: string
  }
  creator?: string
  _id?: string
  attendeeCount?: Number
  eventCode?: string
  // attendees?: string[]
  attendeeIds?: string[]
  attendeeProfiles?: any[]
}

export interface EventCreationResponse {
  status: string
  message: string
  data: Event
}

export interface EventListResponse {
  status: string
  message: string
  data: Event[]
}
