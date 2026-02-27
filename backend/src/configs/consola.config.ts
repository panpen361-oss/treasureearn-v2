import { consola } from "consola";
import chalk from "chalk";

consola.level = 5;

export const logger_success = (message: string): void => {
  consola.success(chalk.green.bold(message));
};

export const logger_error = (message: string): void => {
  consola.error(chalk.red.bold(message));
};

export const logger_info = (message: string): void => {
  consola.info(chalk.cyan(message));
};

export const logger_warn = (message: string): void => {
  consola.warn(chalk.yellow.bold(message));
};

export const logger_log = (message: string): void => {
  consola.log(chalk.white(message));
};

export const logger_trace = (message: string): void => {
  consola.trace(chalk.gray(message));
};
