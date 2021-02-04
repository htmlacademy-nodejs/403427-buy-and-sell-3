'use strict';

const fs = require(`fs`).promises;
const FILENAME = `mocks.json`;
let data = null;

const getMockData = async () => {
  console.log(`data`, data);
  if (data !== null) {
    return data;
  }

  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
  return data;
};

(async () => {
  try {
    const fileContent = await fs.readFile(FILENAME);
    data = JSON.parse(fileContent);
  } catch (err) {
    console.log(err);
  }
})();

module.exports = getMockData;
