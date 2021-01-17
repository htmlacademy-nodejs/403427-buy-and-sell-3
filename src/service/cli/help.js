'use strict';

const chalk = require(`chalk`);
const {
  CliCommand,
  MOCK_FILE_NAME
} = require(`../../constants`);

const helpText = `
Программа запускает http-сервер и формирует файл с данными для API.
    Гайд:
    service.js <command>
    Команды:
    ${CliCommand.VERSION}:            выводит номер версии
    ${CliCommand.HELP}:               печатает этот текст
    ${CliCommand.GENERATE} <count>    формирует файл ${MOCK_FILE_NAME}
    ${CliCommand.SERVER}   <port>     запускает http сервер
`;

module.exports = {
  name: CliCommand.HELP,
  run() {
    console.info(chalk.grey(helpText));
  }
};
