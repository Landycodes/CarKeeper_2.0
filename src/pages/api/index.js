export const signIn = (logInData) => {
  return fetch("/api/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(logInData),
  });
};

export const signUp = (signUpData) => {
  return fetch("/api/newuser", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(signUpData),
  });
};

export const getMe = (token) => {
  return fetch("/api/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};

export const saveInterval = (token, interval) => {
  return fetch("/api/saveinterval", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(interval),
  });
};

export const saveMiles = (token, maintVal) => {
  return fetch("/api/savemiles", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(maintVal),
  });
};

export const saveSpecifications = (token, specs) => {
  return fetch("/api/savespecifications", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(specs),
  });
};
