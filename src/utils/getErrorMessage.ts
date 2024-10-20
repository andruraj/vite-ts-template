/**
 * Extracts a user-friendly error message from an error object.
 * @param {unknown} error - The error object to extract the message from.
 * @returns {string} - The extracted error message or a default message.
 */
export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String((error as { message: unknown }).message);
  } else if (typeof error === "string") {
    message = error;
  } else if (typeof error === "object" && Array.isArray(error)) {
    message = error.join(", ");
  } else {
    message = "Something went wrong!";
  }

  return message;
};
