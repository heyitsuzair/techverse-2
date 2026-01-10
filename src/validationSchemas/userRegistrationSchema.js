import * as Yup from "yup";

/**
 * Validation schema for user registration form
 * Includes validation for personal information, account security, and additional fields
 */
export const userRegistrationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters")
    .required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .required("Phone number is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Please confirm your password"),
  age: Yup.number()
    .min(18, "You must be at least 18 years old")
    .max(100, "Please enter a valid age")
    .required("Age is required"),
  bio: Yup.string()
    .max(500, "Bio must be less than 500 characters")
    .required("Bio is required"),
  country: Yup.string().required("Please select a country"),
  gender: Yup.string().required("Please select a gender"),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
  newsletter: Yup.boolean(),
  birthDate: Yup.date()
    .max(new Date(), "Birth date cannot be in the future")
    .required("Birth date is required"),
});

/**
 * Initial values for user registration form
 */
export const userRegistrationInitialValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  age: "",
  bio: "",
  country: "",
  gender: "",
  terms: false,
  newsletter: false,
  birthDate: null,
};
