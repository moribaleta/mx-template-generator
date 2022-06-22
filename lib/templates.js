const { readFileSync, writeFile } = require('fs');

const createFile = (templatePath, templateConfig, path, fileName) => {
  let file = readFileSync(`${templatePath}/${templateConfig.templateFile}`);
  let template = file.toString();

  let templateFileContent = template.replaceAll('${fileName}', fileName);
  let templateFileName = templateConfig.templateName
    .replaceAll('${folderName}', path)
    .replaceAll('${fileName}', fileName);

  writeFile(templateFileName, templateFileContent, () => {});
};

const getSettingsFile = () => {
  const settingsFile = readFileSync('./settings.json');
  const settingsVal = settingsFile.toString();
  return JSON.parse(settingsVal);
};

module.exports = {
  createFile,
  getSettingsFile,
};
