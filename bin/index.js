#!/usr/bin/env node

const { existsSync, mkdirSync } = require('fs');
const { capitalizeFirstLetter, lowerCaseFirstLetter } = require('../lib/utils');
const { createFile } = require('../lib/templates');
const config = require('../lib/templates/config');

const args = process.argv;
const pathName = process.cwd();

if (args.length <= 0) {
  return;
}

var fileName =
  args.filter((arg) => {
    return arg.indexOf('--name') !== -1;
  })[0] || '';

if (fileName.length <= 0 || pathName.length <= 0) {
  return;
}

fileName = fileName.split('=')[1];

fileName = capitalizeFirstLetter(fileName);
let folderName = pathName + '/' + lowerCaseFirstLetter(fileName);

if (existsSync(folderName)) {
  console.log('directory already exist');
  return;
}

mkdirSync(folderName, {
  recursive: true,
});

config.forEach((config) => {
  createFile(config, folderName, fileName);
});
