export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:8000"
    : "https://aresuno-server.vercel.app";

export const ToastParams = {
  position: "top-center",
  autoClose: 1000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: false,
  progress: undefined,
  theme: "light",
  closeButton: false,
};

/**
 * Validates phone number using regex.
 * @param  {string} phoneNumber
 * @return {boolean}
 */
export const validatePhoneNumber = (phoneNumber) => {
  const phoneNumberRegex =
    /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/gm;

  return phoneNumberRegex.test(phoneNumber);
};

/**
 * Validates password using regex.
 * @param  {string} password
 * @return {boolean}
 */
export const validatePassword = (password) => {
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  return passwordRegex.test(password);
};

/**
 * Validates email address using regex.
 * @param  {string} email
 * @return {boolean}
 */
export const validateEmailAddress = (email) => {
  const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/;
  return emailRegex.test(email);
};

/**
 * Safe way to check if a string is empty or not.
 * @param {string} str
 * @return {boolean}
 */
export const isEmptyString = (str) => !str?.length;
