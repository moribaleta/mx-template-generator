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

  console.log('executed path %o', pathName)

  var fileName = getAttribute(args, '--name');
  const templateName = getAttribute(args, '--template', 'template');
  let configPath = getAttribute(args, '--config');
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

  if (configPath) {
    configPath = process.env.PROJECT_CWD + '/' + configPath 
  }

  var configFilePath = configPath ?? settingsObject.configPath;

  if (configFilePath.length <= 0) {
    configFilePath =
      __dirname.replaceAll('/bin', '') + '/lib/templates/config.js';
  }
  console.log('config file location: %o', configFilePath);

  const config = require(configFilePath);

  if (!config) {
    console.log('cannot find config.js from the given settings');
    return;
  }

  configFilePath = configFilePath.replace('/config.js', '').replace('../', '');

  if (existsSync(folderName) && !isOverride) {
    console.log('directory already exist');
    return;
  }

  mkdirSync(folderName, {
    recursive: true,
  });

  let templateConfig = config[templateName];
  
  console.log('templateName %s', templateName);
  console.log('config file path %s', configFilePath);
  console.log('template config %o', templateConfig);
  
  createFile(templateConfig, configFilePath, fileName, folderName);
};

const args = process.argv;
const terminalPath = process.env.INIT_CWD;
const processPath = process.cwd()
console.log('args %o', args)
console.log('terminal %o \n process %o ', terminalPath, processPath );
console.log('env %o', process.env)

main(args, terminalPath ?? processPath);
