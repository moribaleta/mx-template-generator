const { readFileSync, writeFile } = require('fs');

const createFile = (templatePath, templateConfig, path, fileName) => {
  let directory = __dirname
  let file = readFileSync(`${directory}/../${templatePath}/${templateConfig.templateFile}`);
  let template = file.toString();

  let templateFileContent = template.replaceAll('${fileName}', fileName);
  let templateFileName = templateConfig.templateName
    .replaceAll('${folderName}', path)
    .replaceAll('${fileName}', fileName);

  writeFile(templateFileName, templateFileContent, () => {});
};

const getSettingsFile = () => {
  let directory = __dirname
  const settingsPath = `${directory}/../settings.json`
  console.log("settings location %o", settingsPath)
  const settingsFile = readFileSync(settingsPath);
  const settingsVal = settingsFile.toString();
  return JSON.parse(settingsVal);
};

module.exports = {
  createFile,
  getSettingsFile,
};
