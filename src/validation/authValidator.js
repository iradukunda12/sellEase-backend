import { body } from "express-validator";

export const registerValidation = [
  body("name").trim().notEmpty().withMessage("name is required"),
  body("email")
    .contains("@")
    .withMessage("email must contains '@' ")
    .isEmail()
    .withMessage("email is not valid"),
  body("phone")
    .trim()
    .notEmpty()
    .withMessage("phone is required")
    .matches(/^\+\d{1,4}\d{7,14}$/)
    .withMessage("phone number should start with you country code")
    .isLength({ min: 12, max: 15 })
    .withMessage("phone number should be between 12 to 15 digits"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should be between 6 to 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "password should contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];
export const loginValidation = [
  body("email")
    .contains("@")
    .withMessage("email must contains '@' ")
    .isEmail()
    .withMessage("email is not valid"),
  body("password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("password should be between 6 to 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "password should contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

export const createNewPasswordValidation = [
  body("Password")
    .trim()
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 8 })
    .withMessage("Password should be minimum 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    )
    .withMessage(
      "password should contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
];

