
// NOTE will need to update for prod
export const PROD_EMAIL_REGEX  = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/);
export const DEV_EMAIL_REGEX   = new RegExp(/^[A-Za-z\d]{2,}$/);
export const PROD_EMAIL_REGEX_TEXT  = "Your password must be 8 characters and contain a number.";
export const DEV_EMAIL_REGEX_TEXT = "Your password must be at least 2 characters (non prod)";



export function validEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}

export function getPasswordErrorSettings() {
  var pwRegex;
  var pwErrorText;

  // Minimum 8 characters at least 1 Alphabet and 1 Number:
  if (process.env.NODE_ENV === "production") {
    pwRegex = this.PROD_EMAIL_REGEX;
    pwErrorText = this.PROD_EMAIL_REGEX_TEXT;
  } else {
    pwRegex = this.DEV_EMAIL_REGEX;
    pwErrorText = this.DEV_EMAIL_REGEX_TEXT;
  }
  return {pwRegex: pwRegex, pwErrorText: pwErrorText};
}
