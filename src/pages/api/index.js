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

export const getHome = (token) => {
  return fetch("/api/me", {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
};
