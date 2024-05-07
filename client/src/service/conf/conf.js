const conf = {
  URL: import.meta.env.VITE_BASE_URL || "",
  RECAPTCHA: import.meta.env.VITE_PUBLIC_RECAPTCHA_SITE_KEY,
};

export default conf;
