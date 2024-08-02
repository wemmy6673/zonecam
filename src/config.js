const config = {
  appName: "Zonecam",

  namedUrls: {
    signIn: "/login",
    signUp: "/register",
    authHome: "/predict",
  },

  apiUrl: import.meta.env.VITE_API_URL || "http://localhost:7000/api",

  endpoints: {
    login: "/u/sign-in",
    register: "/u",
    verifyEmailComplete: "/u/email/verify",
    verifyEmail: "/u/email/verify",
    sessionInfo: "/u/session",
    resetPassword: "/u/password/reset",
    confirmPasswordReset: "/u/password/reset/complete",
  },

  browserStorageKeys: {
    accessToken: "ZonecamToken",
    visitedAlready: "ZonecamFirstTimeUser",
  },
};

export default config;
