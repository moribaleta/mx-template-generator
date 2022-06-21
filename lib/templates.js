const { readFileSync, writeFile } = require('fs');

const createFile = (config, path, fileName) => {
  let file = readFileSync(`lib/templates/${config.template}`);
  let template = file.toString();

  let templateFileContent = template.replaceAll('${fileName}', fileName);
  let templateFileName = config.fileName
    .replaceAll('${folderName}', path)
    .replaceAll('${fileName}', fileName);
  writeFile(templateFileName, templateFileContent, () => {});
};

module.exports = {
  createFile,
};
