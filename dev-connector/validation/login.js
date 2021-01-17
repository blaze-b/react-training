const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};
  const minPLength = 10;
  const minPUpperCase = 1;
  const minPNumbers = 2;
  const minPSymbols = 1;
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (Validator.isEmpty(data.email)) errors.email = "Email cannot be empty";
  if (Validator.isEmpty(data.password))
    errors.password = "Password cannot be empty";

  if (!Validator.isEmail(data.email))
    errors.email = "Please provide a valid email id";
  if (
    !Validator.isStrongPassword(data.password, {
      minLength: minPLength,
      minUppercase: minPUpperCase,
      minNumbers: minPNumbers,
      minSymbols: minPSymbols,
    })
  )
    errors.password = `Make sure it's at least ${minPLength} characters including a uppercase letter and ${minPNumbers} numbers and ${minPSymbols} symbols.`;

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
