import { useEffect, useState, useCallback } from "react";

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

/**
 * Removes an item from an array using its name
 * @param {Array<any>} arr
 * @param {any} value
 * @returns New array
 */
export const removeItemFromArray = (arr, value) => {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

/**
 * Removes duplicates from an array
 * @param {Array<any>} arr
 * @return {Array<any>} out array
 */
export const removeDuplicationsArray = (arr) => {
  var seen = {};
  return arr.filter(function (item) {
    // eslint-disable-next-line no-prototype-builtins
    return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};

/**
 * A react hook to check if the current screen is mobile or not
 * @link https://github.com/tufantunc/useIsMobile
 * @param {*} mobileScreenSize
 * @returns boolean
 */
export const useIsMobile = (mobileScreenSize = 768) => {
  if (typeof window.matchMedia !== "function") {
    throw Error("matchMedia not supported by browser!");
  }
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(`(max-width: ${mobileScreenSize}px)`).matches,
  );

  const checkIsMobile = useCallback((event) => {
    setIsMobile(event.matches);
  }, []);

  useEffect(() => {
    const mediaListener = window.matchMedia(
      `(max-width: ${mobileScreenSize}px)`,
    );
    try {
      mediaListener.addEventListener("change", checkIsMobile);
    } catch {
      mediaListener.addListener(checkIsMobile);
    }

    return () => {
      try {
        mediaListener.removeEventListener("change", checkIsMobile);
      } catch {
        mediaListener.removeListener(checkIsMobile);
      }
    };
  }, [mobileScreenSize]);

  return isMobile;
};
