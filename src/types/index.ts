export type FormType = "login" | "emailRegistration" | null;

// User
export interface User {
  id: number;
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
    user: {
      profile: {
        username: string;
        fullname: string;
        profilePhoto: string;
        interests: string[];
        joiningDate: string; // ISO 8601 date string
      };
      _id: string;
      email: string;
    };
    token: string;
  };
}

export interface EmailRegistrationFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}
