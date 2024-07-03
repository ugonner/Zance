export type FormType = "login" | "emailRegistration" | null;

// User
export interface User {
  _id: number;
  email: string;
  profile: {
    fullName: string;
    profilePhoto: string;
    interests: string[];
    joiningDate: Date;
  };
}

// Login Form
export interface LoginFormData {
  email: string;
  // username: string;
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
