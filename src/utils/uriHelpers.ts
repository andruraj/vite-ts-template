/**
 * Encodes a URI, but does not encode `+@?=:#;,$&` to their HTTP-encoded equivalents
 * (as `&` and `+` are common URL operators).
 *
 * @param {string} str - The string to encode.
 * @returns {string} The encoded string, with `[ ]` brackets not encoded.
 */
export function fixedEncodeURI(str: string): string {
  return encodeURI(str).replace(/%5B/g, "[").replace(/%5D/g, "]");
}

/**
 * Encodes a URI component, and additionally encodes `+@?=:#;,$&` and also characters
 * like `!'()*` to their HTTP-encoded equivalents.
 *
 * @param {string} str - The string to encode.
 * @returns {string} The fully encoded URI component.
 */
export function fixedEncodeURIComponent(str: string): string {
  return encodeURIComponent(str).replace(/[!'()*]/g, (c) => {
    return "%" + c.charCodeAt(0).toString(16);
  });
}
