// cookies.ts
type CookieAttributes = {
  path?: string;
  expires?: Date | string; // Can be a Date object or a string in a valid format
  maxAge?: number; // in seconds
  secure?: boolean; // True if the cookie should only be sent over HTTPS
  sameSite?: "Strict" | "Lax" | "None"; // Control when cookies are sent
};

const setCookie = (
  name: string,
  value: string,
  attributes?: CookieAttributes
): void => {
  const cookieParts: string[] = [];
  cookieParts.push(`${encodeURIComponent(name)}=${encodeURIComponent(value)}`);

  if (attributes) {
    if (attributes.expires) {
      const expires =
        typeof attributes.expires === "string"
          ? new Date(attributes.expires)
          : attributes.expires;
      cookieParts.push(`expires=${expires.toUTCString()}`);
    }

    if (attributes.maxAge) {
      cookieParts.push(`max-age=${attributes.maxAge}`);
    }

    if (attributes.path) {
      cookieParts.push(`path=${attributes.path}`);
    }

    if (attributes.secure) {
      cookieParts.push(`secure`);
    }

    if (attributes.sameSite) {
      cookieParts.push(`SameSite=${attributes.sameSite}`);
    }
  }

  document.cookie = cookieParts.join("; ");
};

const getCookie = (name: string): string | null => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split("=");
    if (cookieName === encodeURIComponent(name)) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null; // Return null if the cookie is not found
};

const updateCookie = (
  name: string,
  value: string,
  attributes?: CookieAttributes
): void => {
  // Simply call setCookie to update the cookie
  setCookie(name, value, attributes);
};

const deleteCookie = (name: string, attributes?: CookieAttributes): void => {
  const cookieAttributes = { ...attributes, expires: new Date(0) }; // Set expires to 0 to delete the cookie
  setCookie(name, "", cookieAttributes);
};

const findCookie = (name: string): boolean => {
  return getCookie(name) !== null; // Returns true if the cookie exists
};

const clearCookies = (): void => {
  const cookies = document.cookie.split("; ");
  for (const cookie of cookies) {
    const [cookieName] = cookie.split("=");
    deleteCookie(decodeURIComponent(cookieName)); // Delete each cookie
  }
};

export {
  setCookie,
  getCookie,
  updateCookie,
  deleteCookie,
  findCookie,
  clearCookies,
};
