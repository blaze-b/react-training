const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  const minPLength = 10;
  const minPUpperCase = 1;
  const minPNumbers = 2;
  const minPSymbols = 1;
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.cPassword = !isEmpty(data.cPassword) ? data.cPassword : "";

  if (Validator.isEmpty(data.name)) errors.name = "Name cannot be empty";
  if (Validator.isEmpty(data.email)) errors.email = "Email cannot be empty";
  if (Validator.isEmpty(data.password))
    errors.password = "Password cannot be empty";
  if (Validator.isEmpty(data.cPassword))
    errors.cPassword = "Comfirm password cannot be empty";
  if (!Validator.equals(data.password, data.cPassword))
    errors.cPassword = "Password's must match";
  if (!Validator.isLength(data.name, { min: 2, max: 30 }))
    errors.name = "Name must be between 2 and 30 characters";
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
