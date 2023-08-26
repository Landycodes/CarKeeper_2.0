export const signIn = (logInData) => {
  return fetch("/api/signin", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(logInData),
  });
  // .then((response) => {
  //   if (response.status === 400) {
  //     return response.json();
  //   } else {
  //     return response;
  //   }
  // });
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

export const googleLogin = (results) => {
  return fetch("/api/loginwithgoogle", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(results),
  }).then((response) => {
    if (response.status === 400) {
      return response.json();
    } else {
      return response;
    }
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

export const saveBrakes = (token, brake) => {
  return fetch("/api/savebrake", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(brake),
  });
};

export const saveTread = (token, tread) => {
  return fetch("/api/savetread", {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(tread),
  });
};
