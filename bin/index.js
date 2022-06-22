#!/usr/bin/env node

const { existsSync, mkdirSync } = require('fs');
const {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
  getAttribute,
  getKeyExist,
} = require('../lib/utils');
const { createFile, getSettingsFile } = require('../lib/templates');

const main = (args, pathName) => {
  if (args.length <= 0) {
    return;
  }

  var fileName = getAttribute(args, '--name');
  const templateName = getAttribute(args, '--template', 'main');
  const isOverride = getKeyExist(args, '--force');

  if (fileName.length <= 0 || pathName.length <= 0) {
    console.log('filename not provided');
    return;
  }

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

  if (existsSync(folderName) && !isOverride) {
    console.log('directory already exist');
    return;
  }

  mkdirSync(folderName, {
    recursive: true,
  });

  console.log('templateName %s', templateName);

  config[templateName].forEach((config) => {
    createFile(configFilePath, config, folderName, fileName);
  });
};

const args = process.argv;
const pathName = process.cwd();

main(args, pathName);
