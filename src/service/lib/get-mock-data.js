'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = null;

const getMockData = async () => {
  if (data !== null) {
    return Promise.resolve(data);
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    const buf = Buffer.from(JSON.stringify(fileContent));
    data = JSON.parse(buf.toString());
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }

  return Promise.resolve(data);
};

module.exports = getMockData;
