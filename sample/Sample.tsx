import React from 'react';
import { SampleProps } from './types';
import { View } from 'react-native';
import { useTheme } from 'src/lib/theme/Theme';
import stylesCreator from './Styles';

const Sample = ({}: SampleProps) => {
  const [styles, theme] = useTheme(stylesCreator);
  return (
    <View style={styles.main}/>
  );
};

export default Sample;