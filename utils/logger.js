import chalk from "chalk";

const logger = {
  info: (...args) => console.log(chalk.cyan("[INFO]"), ...args),
  success: (...args) => console.log(chalk.green("[SUCCESS]"), ...args),
  warn: (...args) => console.log(chalk.yellow("[WARN]"), ...args),
  error: (...args) => console.log(chalk.red("[ERROR]"), ...args)
};

export default logger;