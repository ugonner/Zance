export type FormType = "login" | "emailRegistration" | null;

// User
export interface User {
  profile: {
    socialLinks: {
      linkedIn: string;
    };
    contactDetails: {
      phone: string;
    };
    profilePhoto: string;
    fullname: string;
    professionalTitle: string;
    location: string;
    bio: string;
    interests: string[];
    joiningDate: string;
  };
  _id: string;
  email: string;
}

// Login Form
export interface LoginFormData {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface EmailRegistrationResponse {
  status: string;
  message: string;
  user: User;
}

export interface EmailRegistrationFormData {
  email: string;
  password: string;
  passwordConfirm?: string;
}

export interface profileData {
  profile: {
    fullname: string;
    professionalTitle: string;
    workPlace?: string;
    location: string;
    bio?: string;
    interests: string[] | [];
    socialLinks: {
      linkedIn: string;
    };
    contactDetails: {
      phone: string;
    };
  };
}

export interface ProfileFormData {
  fullName: string;
  phoneNumber: string;
  professionalTitle: string;
  linkedInLink: string;
  workPlace?: string;
  location: string;
  bio?: string;
  interests: string[];
}

export interface ProfileResponse {
  status: string;
  message: string;
  data: {
    user: User;
  };
}
