const { readFileSync, writeFile, mkdir, existsSync } = require('fs');
const { String, Context, Template, TemplateConfig } = require('./types');
const { exec } = require('child_process');
const { Logger } = require('./utils');

const createFile = (
  config = TemplateConfig,
  templatePath = String,
  fileName = String,
  folderName = String,
  logger = Logger,
  isAppend = false,
) => {
  let context = {
    directory: __dirname,
    templatePath: templatePath.replaceAll('config.js', ''),
    fileName: fileName,
  };

  logger('context %o', context);

  config.items.map((item) => {
    generateItem(context, folderName, item, logger, isAppend);
  });

  if (config.post_execute && config.post_execute.length > 0) {
    exec(config.post_execute, (error, stdout, stderr) => {
      if (error) {
        console.error(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        logger(`stderr: ${stderr}`);
        return;
      }
      logger(`stdout: ${stdout}`);
    });
  }
}; //createFile

const getSettingsFile = (logger = Logger) => {
  let directory = __dirname;
  const settingsPath = `${directory}/../settings.json`;
  logger('settings location %o', settingsPath);
  const settingsFile = readFileSync(settingsPath);
  const settingsVal = settingsFile.toString();
  return JSON.parse(settingsVal);
}; //getSettingsFile

/**
 * initial generation based on the template.type
 * @param {*} context
 * @param {*} path
 * @param {*} template
 * @param {*} logger
 * @param {*} isAppend
 */
const generateItem = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger,
  isAppend = false,
) => {
  if (template.type === 'folder') {
    generateFolder(context, path, template, logger, isAppend);
  } else {
    generateFile(context, path, template, logger, isAppend);
  }
}; //generateItem

/**
 * generate the folder and calls on generateItem for the files after
 * @param {*} context
 * @param {*} path
 * @param {*} template
 * @param {*} logger
 * @param {*} isAppend
 * @returns
 */
const generateFolder = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger,
  isAppend = false,
) => {
  let folderName = template.name.replaceAll('${fileName}', context.fileName);
  let folderPath = path + '/' + folderName;

  logger('generate folder name: %s - path: %s', folderName, folderPath);

  if (existsSync(folderPath) && isAppend) {
    if (!template.files) return;
    template.files.map((template) => {
      generateItem(context, folderPath, template);
    });
  } else {
    mkdir(folderPath, () => {
      if (!template.files) return;
      template.files.map((template) => {
        generateItem(context, folderPath, template);
      });
    });
  }
}; //generateFolder

/**
 * generate a single file based on the template
 * @param {*} context
 * @param {*} path
 * @param {*} template
 * @param {*} logger
 * @param {*} isAppend
 * @returns
 */
const generateFile = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger,
  isAppend = false,
) => {
  const { directory, fileName, templatePath } = context;
  const { name, location } = template;
  const templateLocation = `${templatePath}/${location}`; //.replace('lib/../lib', 'lib');

  let fileObject = readFileSync(templateLocation).toString();
  let newFileContent = fileObject.replaceAll('${fileName}', fileName);
  let newFileName = (path + '/' + name)
    .replaceAll('${folderName}', path)
    .replaceAll('${fileName}', fileName);

  if (existsSync(newFileName) && isAppend) {
    return;
  }

  writeFile(newFileName, newFileContent, () => {
    //logger("generate file path:%o \n fileName: %s \n content: %o", path, newFileName, newFileContent);
    logger('generate file path:%o', path);
    logger('generate fileName: %s', newFileName);
    logger('generate content: %o', newFileContent);
  });
}; //generateFile

module.exports = {
  createFile,
  getSettingsFile,
};
