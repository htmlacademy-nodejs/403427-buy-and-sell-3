'use strict';

const DEFAULT_COUNT = 1;
const USER_ARGV_INDEX = 2;
const MOCK_FILE_NAME = `mocks.json`;

const MOCK_TITLES = [
  `Продам книги Стивена Кинга`,
  `Продам новую приставку Sony Playstation 5`,
  `Продам отличную подборку фильмов на VHS`,
  `Куплю антиквариат`,
  `Куплю породистого кота`,
];

const MOCK_SENTENCES = [
  `Товар в отличном состоянии.`,
  `Пользовались бережно и только по большим праздникам.`,
  `Продаю с болью в сердце...`,
  `Бонусом отдам все аксессуары.`,
  `Даю недельную гарантию.`,
  `Если товар не понравится — верну всё до последней копейки.`,
  `Это настоящая находка для коллекционера!`,
  `Если найдёте дешевле — сброшу цену.`,
  `Таких предложений больше нет!`,
  `При покупке с меня бесплатная доставка в черте города.`,
];

const MOCK_CATEGORIES = [
  `Книги`,
  `Разное`,
  `Посуда`,
  `Игры`,
  `Животные`,
  `Журналы`,
];

const OfferType = {
  OFFER: `offer`,
  SALE: `sale`,
};

const SumRestrict = {
  MIN: 1000,
  MAX: 100000,
};

const PictureRestrict = {
  MIN: 1,
  MAX: 16,
};

const SentencesRestrict = {
  MIN: 1,
  MAX: 5,
};

const CliCommand = {
  HELP: `--help`,
  VERSION: `--version`,
  GENERATE: `--generate`
};

const ExitCode = {
  FATAL_EXCEPTION: 1,
  SUCCESS: 0,
};

const DEFAULT_CLI_COMMAND = CliCommand.HELP;

module.exports = {
  SumRestrict,
  PictureRestrict,
  SentencesRestrict,
  OfferType,
  MOCK_CATEGORIES,
  MOCK_SENTENCES,
  MOCK_TITLES,
  MOCK_FILE_NAME,
  DEFAULT_COUNT,
  ExitCode,
  CliCommand,
  DEFAULT_CLI_COMMAND,
  USER_ARGV_INDEX
};
