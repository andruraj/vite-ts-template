/**
 * Fallback function to copy text to clipboard for older browsers that don't support the Clipboard API.
 *
 * @param {string} text - The text to copy.
 * @param {string} success - The message to show on successful copy.
 * @param {string} failure - The message to show on failure to copy.
 */
function fallbackCopyTextToClipboard(
  text: string,
  success: string,
  failure: string
): void {
  const textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    const successful = document.execCommand("copy");
    const msg = successful ? success : failure;
    console.log("Fallback: " + msg);
    alert(msg);
  } catch (err) {
    console.error("Fallback: " + failure, err);
  }

  document.body.removeChild(textArea);
}

/**
 * Copies text to the clipboard, using the Clipboard API when available, and falls back to the `execCommand` method if not.
 *
 * @export
 * @param {string} text - The text to be copied.
 * @param {string} [success="Copying to clipboard was successful!"] - The success message.
 * @param {string} [failure="Oops, Unable to Copy"] - The failure message.
 */
export function copyTextToClipboard(
  text: string,
  success: string = "Copying to clipboard was successful!",
  failure: string = "Oops, Unable to Copy"
): void {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text, success, failure);
    return;
  }

  navigator.clipboard.writeText(text).then(
    () => {
      console.log("Async: " + success);
      alert(success);
    },
    (err) => {
      console.error("Async: " + failure, err);
    }
  );
}
