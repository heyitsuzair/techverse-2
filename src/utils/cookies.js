/**
 * Cookie utility functions
 */

export function setInCookie(name, value, days = 7) {
  try {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
    const cookieValue = encodeURIComponent(value);
    document.cookie = `${name}=${cookieValue};expires=${expires.toUTCString()};path=/;SameSite=Lax`;
    return true;
  } catch (error) {
    console.error("Error setting cookie:", error);
    return false;
  }
}

export function getFromCookie(name, defaultValue = null) {
  try {
    if (typeof document === "undefined") {
      return defaultValue;
    }
    const nameEQ = name + "=";
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1, cookie.length);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(
          cookie.substring(nameEQ.length, cookie.length)
        );
      }
    }
    return defaultValue;
  } catch (error) {
    console.error("Error getting cookie:", error);
    return defaultValue;
  }
}

export function removeCookie(name) {
  try {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    return true;
  } catch (error) {
    console.error("Error removing cookie:", error);
    return false;
  }
}

export function getAllCookies() {
  try {
    if (typeof document === "undefined") {
      return {};
    }
    const cookies = {};
    document.cookie.split(";").forEach((cookie) => {
      const [name, value] = cookie.trim().split("=");
      if (name && value) {
        cookies[name] = decodeURIComponent(value);
      }
    });
    return cookies;
  } catch (error) {
    console.error("Error getting all cookies:", error);
    return {};
  }
}
