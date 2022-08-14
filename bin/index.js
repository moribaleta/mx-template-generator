#!/usr/bin/env node

const { existsSync, mkdirSync } = require('fs');
const {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
  getAttribute,
  getKeyExist,
  debugLog,
} = require('../lib/utils');
const { createFile, getSettingsFile } = require('../lib/templates');

const main = (args, pathName, logger) => {
  if (args.length <= 0) {
    return;
  }

  logger('executed path %o', pathName);

  var fileName = getAttribute(args, '--name');
  const templateName = getAttribute(args, '--template', 'template');
  let configPath = getAttribute(args, '--config');
  const isOverride = getKeyExist(args, '--force');

  if (fileName.length <= 0 || pathName.length <= 0) {
    console.error('filename not provided');
    return;
  }

  fileName = capitalizeFirstLetter(fileName);
  let folderName = pathName + '/' + lowerCaseFirstLetter(fileName);

  const settingsObject = getSettingsFile();

  if (!settingsObject) {
    console.error('config settings doesnt exist');
    return;
  }

  if (configPath) {
    configPath =
      __dirname.replaceAll('node_modules/mx-template-generator/bin', '') +
      '/' +
      configPath;
    //process.env.PROJECT_CWD + '/' + configPath
  }

  var configFilePath = configPath ?? settingsObject.configPath;

  if (configFilePath.length <= 0) {
    configFilePath =
      __dirname.replaceAll('/bin', '') + '/lib/templates/config.js';
  }
  logger('config file location: %o', configFilePath);

  const config = require(configFilePath);

  if (!config) {
    console.error('cannot find config.js from the given settings');
    return;
  }

  configFilePath = configFilePath.replace('/config.js', '').replace('../', '');

  if (existsSync(folderName) && !isOverride) {
    console.error('directory already exist');
    return;
  }

  let templateConfig = config[templateName];

  if (!templateConfig) {
    console.error('template not found %o', templateName);
    console.log('available templates %o', config);
    return;
  }

  logger('templateName %s', templateName);
  logger('config file path %s', configFilePath);
  logger('template config %o', templateConfig);

  mkdirSync(folderName, {
    recursive: true,
  });

  createFile(templateConfig, configFilePath, fileName, folderName, logger);
};

const args = process.argv;
const terminalPath = process.env.INIT_CWD;
const processPath = process.cwd();
const isDebug = getKeyExist(args, '--debug');
const logger = debugLog(isDebug);

logger('__dirname %o', __dirname);
logger('args %o', args);
logger('terminal %o \n process %o ', terminalPath, processPath);
logger('env %o', process.env);

main(args, terminalPath ?? processPath, logger);
