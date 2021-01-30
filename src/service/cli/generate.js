'use strict';

const chalk = require(`chalk`);
const fs = require(`fs`).promises;
const {nanoid} = require(`nanoid`);

const {
  CliCommand,
  DEFAULT_GENERATE_COUNT,
  MOCK_FILE_NAME,
  FILE_TITLES_PATH,
  FILE_CATEGORIES_PATH,
  FILE_SENTENCES_PATH,
  FILE_COMMENTS_PATH,
  MAX_MOCK_ITEMS,
  MAX_COMMENTS,
  OfferType,
  SumRestrict,
  PictureRestrict,
  SentencesRestrict,
  ExitCode,
  MAX_ID_LENGTH
} = require(`../../constants`);

const {
  getRandomInt,
  shuffle
} = require(`../../utils`);

const getPictureFileName = (number) => {
  return number < 10 ? `item0${number}.jpg` : `item${number}.jpg`;
};

const generateOffers = async (count, titles, categories, sentences, comments) => {
  return Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    title: titles[getRandomInt(0, titles.length - 1)],
    category: shuffle(categories).slice(getRandomInt(0, categories.length - 1)),
    picture: getPictureFileName(getRandomInt(PictureRestrict.MIN, PictureRestrict.MAX)),
    description: shuffle(sentences).slice(SentencesRestrict.MIN, SentencesRestrict.MAX).join(` `),
    type: Object.keys(OfferType)[Math.floor(Math.random() * Object.keys(OfferType).length)],
    sum: getRandomInt(SumRestrict.MIN, SumRestrict.MAX),
    comments: generateComments(getRandomInt(1, MAX_COMMENTS), comments),
  }));
};

const generateComments = (count, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid(MAX_ID_LENGTH),
    text: shuffle(comments)
      .slice(0, getRandomInt(1, 3))
      .join(` `),
  }))
);

const readContent = async (filePath) => {
  try {
    const content = await fs.readFile(filePath, `utf8`);
    const result = content.trim()
                          .split(`\n`)
                          .map((el) => el.trim())
                          .filter((el) => el);
    console.info(chalk.green(`Данные в количестве ${result.length} фраз успешно считаны`));
    return result;
  } catch (err) {
    console.error(chalk.red(err));
    return [];
  }
};

const writeOffers = async (offers) => {
  try {
    await fs.writeFile(MOCK_FILE_NAME, JSON.stringify(offers));
    console.info(chalk.green(`Данные в количестве ${offers.length} успешно сформированы в файл ${MOCK_FILE_NAME}`));
    process.exit(ExitCode.SUCCESS);
  } catch (err) {
    console.info(chalk.red(`Ошибка при создании данных`, err));
    process.exit(ExitCode.FATAL_EXCEPTION);
  }
};

module.exports = {
  name: CliCommand.GENERATE,
  async run(args = []) {
    const [userCount] = args;
    const count = Number.parseInt(userCount, 10);
    const countOffer = count && count > 0 ? count : DEFAULT_GENERATE_COUNT;

    if (countOffer > MAX_MOCK_ITEMS) {
      console.info(chalk.red(`Не больше ${MAX_MOCK_ITEMS} объявлений`));
      process.exit(ExitCode.FATAL_EXCEPTION);
    }
    const titles = await readContent(FILE_TITLES_PATH);
    const categories = await readContent(FILE_CATEGORIES_PATH);
    const sentences = await readContent(FILE_SENTENCES_PATH);
    const comments = await readContent(FILE_COMMENTS_PATH);
    const offers = await generateOffers(countOffer, titles, categories, sentences, comments);
    writeOffers(offers);
  }
};
