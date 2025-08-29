import log4js from "log4js";

/**
 * Determines the log level based on custom input or default to INFO.
 * @param customLogLevel - optional override log level
 * @returns string log level (e.g., 'INFO', 'ERROR')
 */
const getLogLevel = (customLogLevel?: string): string => {
  return customLogLevel || log4js.levels.INFO.levelStr;
};

const LoggerUtils = {
  getLogLevel,
};

export default LoggerUtils;
