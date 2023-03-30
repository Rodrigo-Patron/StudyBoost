import { body, validationResult } from "express-validator";

// Register validator for both teachers and students
export const registerValidator = [
  body("email").isEmail().withMessage("Please enter a valid email address"),
  body("name")
    .isLength({ min: 2 })
    .withMessage("Please enter your full name, initials not allowed"),
  body("password")
    .isLength({ min: 8, max: 16 })
    .withMessage("Password must be in range of 8-16 characters")
    .not()
    .isLowercase()
    .withMessage("Password must contain an uppercase character")
    .not()
    .isUppercase()
    .withMessage("Password must contain a lowercase character")
    .not()
    .isNumeric()
    .withMessage("Password must contain a number"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      next({
        status: 422,
        message: errors.errors.map((err) => {
          return { message: err.msg, param: err.param };
        }),
      });
    } else {
      next();
    }
  },
];
