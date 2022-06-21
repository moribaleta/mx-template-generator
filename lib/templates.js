const indexTemplate = (fileName) => {
  return `import ${fileName} from './${fileName}';
export default ${fileName};
`;
};

const mainTemplate = (fileName) => {
  return `import React from 'react';
import { ${fileName}Props } from './types';
import { View } from 'react-native';
import { useTheme } from 'src/lib/theme/Theme';
import stylesCreator from './Styles';

const ${fileName} = ({}: ${fileName}Props) => {
  const [styles, theme] = useTheme(stylesCreator);
  return (
    <View/>
  );
};

export default ${fileName};
`;
};

const styleTemplate = () => {
  return `import { StyleSheet } from 'react-native';
import { StylesCreator } from 'src/lib/theme/Theme';

const stylesCreator : StylesCreator = (theme, scale) => StyleSheet.create({

  main: {},

});

export default stylesCreator;
`;
};

const typesTemplate = (fileName) => {
  return `export interface ${fileName}Props {
  //add your props here
}
`;
};

module.exports = {
  mainTemplate,
  typesTemplate,
  styleTemplate,
  indexTemplate,
};
