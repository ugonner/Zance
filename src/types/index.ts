export type FormType = "login" | "emailRegistration" | null;

export interface LoginFormData {
  email: string;
  password: string;
}

export interface EmailRegistrationFormData {
  email: string;
  password: string;
  passwordConfirm: string;
}
