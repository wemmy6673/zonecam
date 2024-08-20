const config = {
  appName: "Zonecam",

  namedUrls: {
    signIn: "/login",
    signUp: "/register",
    authHome: "/predict",
  },

  apiUrl: "https://zonecam.onrender.com/api",

  endpoints: {
    login: "/u/sign-in",
    register: "/u",
    verifyEmailComplete: "/u/email/verify",
    verifyEmail: "/u/email/verify",
    sessionInfo: "/u/session",
    resetPassword: "/u/password/reset",
    confirmPasswordReset: "/u/password/reset/complete",
    queuePrediction: "/predict",
    getPredictionResult: "/results",
  },

  browserStorageKeys: {
    accessToken: "ZonecamToken",
    visitedAlready: "ZonecamFirstTimeUser",
  },
};

export default config;
