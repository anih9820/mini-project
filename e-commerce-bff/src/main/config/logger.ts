import log4js from "log4js";
import LoggerUtils from "../utils/LoggerUtils";

import dotenv from "dotenv";
dotenv.config();

const customLogLevel = process.env.LOG_LEVEL;
const logLevel = LoggerUtils.getLogLevel(customLogLevel);

log4js.configure({
  appenders: {
    console: { type: "console" },
  },
  categories: {
    default: {
      appenders: ["console"],
      level: logLevel,
    },
  },
});

const logger = log4js.getLogger();
export default logger;
