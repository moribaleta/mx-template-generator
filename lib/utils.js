const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const lowerCaseFirstLetter = (string) => {
  return string.charAt(0).toLowerCase() + string.slice(1);
};

const getAttribute = (args = [], paramKey, defaultValue = '') => {
  const value = args.filter((arg) => arg.indexOf(paramKey) !== -1)[0];
  if (value && value.length > 0) {
    return value.split('=')[1] || defaultValue;
  } else {
    return defaultValue;
  }
};

const getKeyExist = (args = [], paramKey) => {
  const value = args.filter((arg) => arg.indexOf(paramKey) !== -1)[0];
  if (value) {
    return true;
  } else {
    return false;
  }
};

const getFoldername = (path, filename, isAdd) => {
  if (!isAdd) return capitalizeFirstLetter(filename);
  const paths = path.split('/');
  const folderName = paths[paths.length - 1];
  return capitalizeFirstLetter(folderName);
};

const debugLog = (isDebug) => {
  if (isDebug) {
    return (message, options) => {
      console.log(message, options);
    };
  }
  return Logger;
};

const Logger = (message, options) => {};

module.exports = {
  capitalizeFirstLetter,
  lowerCaseFirstLetter,
  getAttribute,
  getKeyExist,
  debugLog,
  Logger,
  getFoldername,
};
