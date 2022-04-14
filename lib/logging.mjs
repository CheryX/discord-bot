import colors from "colors";

// TODO: Add support for logging to file
// TODO: make this from stratch beacuse its bad
let log = {
  info: (message) => {
    console.info(
      colors.red(`[${new Date().getTime()}]`),
      colors.cyan("[INFO]"),
      message
    );
  },
  success: (message) => {
    console.log(
      colors.red(`[${new Date().getTime()}]`),
      colors.green("[SUCCESS]"),
      message
    );
  },
  error: (message) => {
    console.error(
      colors.red(`[${new Date().getTime()}]`),
      colors.red("[ERROR]"),
      message
    );
  },
  warn: (message) => {
    console.warn(
      colors.red(`[${new Date().getTime()}]`),
      colors.yellow("[WARN]"),
      message
    );
  },
  debug: (message) => {
    console.debug(
      colors.red(`[${new Date().getTime()}]`),
      colors.magenta("[DEBUG]"),
      message
    );
  },
};

export default log;
