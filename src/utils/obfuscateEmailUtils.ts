export const emailMailToRedirect = () => {
  const user = "ionas.neonakis";
  const domain = "gmail.com";
  const at = "\u0040";

  window.location.href = `mailto:${user}${at}${domain}`;
};
