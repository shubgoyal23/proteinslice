const conf = {
  URL: import.meta.env.VITE_BASE_URL || "",
  RECAPTCHA: process.env.PS_RECAPTCHA_SITE_KEY,
};

export default conf;
