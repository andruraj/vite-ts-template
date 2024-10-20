/**
 * Generates a unique identifier (UUID-like) string.
 * @returns {string} A unique identifier string.
 */
export const uuid = (): string => {
  return String(Date.now().toString(32) + Math.random().toString(16)).replace(
    /\./g,
    ""
  );
};

/**
 * Generates a version 4 UUID (Universally Unique Identifier).
 * @returns {string} A randomly generated UUID.
 */
export const uuid4 = () => {
  // Create a random hexadecimal number for each segment of the UUID
  const randomHex = () =>
    Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);

  // Construct the UUID string
  return (
    randomHex() +
    randomHex() +
    "-" +
    randomHex() +
    "-" +
    "4" +
    randomHex().substring(1) +
    "-" + // 4 indicates this is a version 4 UUID
    (8 + Math.floor(Math.random() * 4)).toString(16) +
    randomHex().substring(1) +
    "-" +
    randomHex() +
    randomHex() +
    randomHex()
  );
};
