'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  MOCK_TITLES,
  MOCK_SENTENCES,
  MOCK_CATEGORIES,
  MAX_MOCK_ITEMS,
  OfferType,
  SumRestrict,
  PictureRestrict,
  SentencesRestrict,
  ExitCode
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const getPictureFileName = (number) => {
  return number < 10 ? `item0${number}.jpg` : `item${number}.jpg`;
};

const generateOffers = (count) => {
  return Array(count).fill({}).map(() => ({
    title: MOCK_TITLES[getRandomInt(0, MOCK_TITLES.length - 1)],
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(MOCK_SENTENCES).slice(SentencesRestrict.MIN, SentencesRestrict.MAX).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    category: shuffle(MOCK_CATEGORIES).slice(getRandomInt(0, MOCK_CATEGORIES.length - 1)),
  }));
};

const writeOffers = async (offers) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, JSON.stringify(offers));
  } catch (err) {
    console.info(chalk.red(`Ошибка при создании данных`, err));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
  await console.info(chalk.green(`Данные в количестве [${offers.length}] успешно сформированы в файл ${MOCK_FILE_NAME}`));
  await process.exit(ExitCode.SUCCESS);
};

module.exports = {
  name: CliCommand.GENERATE,
  run(args = []) {
    const [userCount] = args;
    const count = Number.parseInt(userCount, 10);
    const countOffer = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countOffer > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      process.exit(ExitCode.FATAL_EXCEPTION);
    }

    const offers = generateOffers(countOffer);
    writeOffers(offers);
  }
};
