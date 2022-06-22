#!/usr/bin/env node

const { existsSync, mkdirSync } = require('fs');
const { capitalizeFirstLetter, lowerCaseFirstLetter } = require('../lib/utils');
const { createFile, getSettingsFile } = require('../lib/templates');

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
  console.log('filename not provided');
  return;
}

fileName = fileName.split('=')[1];

fileName = capitalizeFirstLetter(fileName);
let folderName = pathName + '/' + lowerCaseFirstLetter(fileName);

const settingsObject = getSettingsFile();

if (!settingsObject) {
  console.log('config settings doesnt exist');
  return;
}

var configFilePath = settingsObject.configPath;

if (configFilePath.length <= 0) {
  configFilePath = '../lib/templates/config.js';
}

const config = require(configFilePath);

if (!config) {
  console.log('cannot find config.js from the given settings');
  return;
}

configFilePath = configFilePath.replace('/config.js', '').replace('../', '');

console.log(config);

if (existsSync(folderName)) {
  console.log('directory already exist');
  return;
}

mkdirSync(folderName, {
  recursive: true,
});

config.forEach((config) => {
  createFile(configFilePath, config, folderName, fileName);
});
