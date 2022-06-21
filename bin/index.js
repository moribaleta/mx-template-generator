#!/usr/bin/env node

const { existsSync, mkdirSync, writeFile } = require('fs');
const { capitalizeFirstLetter, lowerCaseFirstLetter } = require('../lib/utils');
const {
  mainTemplate,
  typesTemplate,
  styleTemplate,
  indexTemplate,
} = require('../lib/templates');

const args = process.argv;
const pathName = process.cwd();

//console.log('get the current path %o', pathName);

if (args.length <= 0) {
  return;
}

var fileName =
  args.filter((arg) => {
    return arg.indexOf('--name') !== -1;
  })[0] || '';

if (fileName.length <= 0 || pathName.length <= 0) {
  return;
}

fileName = fileName.split('=')[1];
//pathName = ;

fileName = capitalizeFirstLetter(fileName);
let folderName = pathName + '/' + lowerCaseFirstLetter(fileName);

if (!existsSync(folderName)) {
  mkdirSync(folderName, {
    recursive: true,
  });

  writeFile(`${folderName}/${fileName}.tsx`, mainTemplate(fileName), () => {});
  writeFile(`${folderName}/Hooks.ts`, '', () => {});
  writeFile(`${folderName}/Styles.ts`, styleTemplate(), () => {});
  writeFile(`${folderName}/types.ts`, typesTemplate(fileName), () => {});
  writeFile(`${folderName}/index.ts`, indexTemplate(fileName), () => {});
} else {
  console.log('folder already exist');
}
