import colors from "colors";

let log = {
  /**
   * 
   * @param {string} message 
   */
  info: (message) => {
    console.info(
      colors.red(`[${new Date().getTime()}]`),
      colors.cyan("[INFO]"),
      message
    );
  },
  /**
   * 
   * @param {string} message 
   */
  success: (message) => {
    console.log(
      colors.red(`[${new Date().getTime()}]`),
      colors.green("[SUCCESS]"),
      message
    );
  },
  /**
   * 
   * @param {string} message 
   */
  error: (message) => {
    console.error(
      colors.red(`[${new Date().getTime()}]`),
      colors.red("[ERROR]"),
      message
    );
  },
  /**
   * 
   * @param {string} message 
   */
  warn: (message) => {
    console.warn(
      colors.red(`[${new Date().getTime()}]`),
      colors.yellow("[WARN]"),
      message
    );
  },
  /**
   * 
   * @param {string} message 
   */
  debug: (message) => {
    console.debug(
      colors.red(`[${new Date().getTime()}]`),
      colors.magenta("[DEBUG]"),
      message
    );
  },
};

export default log;
