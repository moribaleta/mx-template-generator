const { readFileSync, writeFile, mkdir } = require('fs');
const { String, Context, Template, TemplateConfig } = require('./types');
const { exec } = require('child_process');
const { Logger } = require('./utils');

const createFile = (
  config = TemplateConfig,
  templatePath = String,
  fileName = String,
  folderName = String,
  logger = Logger
) => {
  let context = {
    directory: __dirname,
    templatePath: templatePath.replaceAll('config.js', ''),
    fileName: fileName,
  };

  logger("context %o", context)

  config.items.map((item) => {
    generateItem(context, folderName, item, logger);
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
};

const getSettingsFile = (logger = Logger) => {
  let directory = __dirname;
  const settingsPath = `${directory}/../settings.json`;
  logger('settings location %o', settingsPath);
  const settingsFile = readFileSync(settingsPath);
  const settingsVal = settingsFile.toString();
  return JSON.parse(settingsVal);
};

const generateItem = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger
) => {
  if (template.type === 'folder') {
    generateFolder(context, path, template, logger);
  } else {
    generateFile(context, path, template, logger);
  }
};

const generateFolder = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger
) => {
  let folderName = template.name.replaceAll('${fileName}', context.fileName);
  let folderPath = path + '/' + folderName;

  logger("generate folder name: %s - path: %s", folderName, folderPath)

  mkdir(folderPath, () => {
    if (!template.files) return;
    template.files.map((template) => {
      generateItem(context, folderPath, template);
    });
  });
};

const generateFile = (
  context = Context,
  path = String,
  template = Template,
  logger = Logger
) => {
  const { directory, fileName, templatePath } = context;
  const { name, location } = template;
  const templateLocation = `${templatePath}/${location}`; //.replace('lib/../lib', 'lib');

  let fileObject = readFileSync(templateLocation).toString();
  let newFileContent = fileObject.replaceAll('${fileName}', fileName);
  let newFileName = (path + '/' + name).replaceAll('${folderName}', path).replaceAll('${fileName}', fileName);

  writeFile(newFileName, newFileContent, () => {
    //logger("generate file path:%o \n fileName: %s \n content: %o", path, newFileName, newFileContent);
    logger("generate file path:%o", path);
    logger("generate fileName: %s", newFileName);
    logger("generate content: %o", newFileContent);
  });
};

module.exports = {
  createFile,
  getSettingsFile,
};
