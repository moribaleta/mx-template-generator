const { readFileSync, writeFile, mkdir } = require('fs');
const { String, Context, Template, TemplateConfig } = require('./types');

const createFile = (
  config = TemplateConfig,
  templatePath = String,
  fileName = String,
) => {
  let context = {
    directory: __dirname,
    templatePath: templatePath.replaceAll('config.js', ''),
    fileName: fileName,
  };

  config.items.map((item) => {
    generateItem(context, fileName, item);
  });

  if (config.post_execute && config.post_execute.length > 0) {
    const { exec } = require('child_process');
    exec(config.post_execute, (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.log(`stderr: ${stderr}`);
        return;
      }
      console.log(`stdout: ${stdout}`);
    });
  }
};

const getSettingsFile = () => {
  let directory = __dirname;
  const settingsPath = `${directory}/../settings.json`;
  console.log('settings location %o', settingsPath);
  const settingsFile = readFileSync(settingsPath);
  const settingsVal = settingsFile.toString();
  return JSON.parse(settingsVal);
};

const generateItem = (
  context = Context,
  path = String,
  template = Template,
) => {
  if (template.type === 'folder') {
    generateFolder(context, path, template);
  } else {
    generateFile(context, path, template);
  }
};

const generateFolder = (
  context = Context,
  path = String,
  template = Template,
) => {
  let folderName = template.name.replaceAll('${fileName}', context.fileName);
  let folderPath = path + '/' + folderName;

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
) => {
  const { directory, fileName, templatePath } = context;
  const { name, location } = template;
  const templateLocation = `${templatePath}/${location}`; //.replace('lib/../lib', 'lib');

  let fileObject = readFileSync(templateLocation).toString();

  let newFileContent = fileObject.replaceAll('${fileName}', fileName);
  let newFileName = (path + '/' + name)
    .replaceAll('${folderName}', path)
    .replaceAll('${fileName}', fileName);

  writeFile(newFileName, newFileContent, () => {});
};

module.exports = {
  createFile,
  getSettingsFile,
};
