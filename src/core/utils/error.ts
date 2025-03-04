import { Notify } from "quasar";

/**
 * Centralized error handling utility that displays an error notification and logs to console
 * @param error The error to handle
 */
export const handleError = (error: Error) => {
  Notify.create({
    type: "negative",
    message: error.message,
  });
  console.error(error);
};
