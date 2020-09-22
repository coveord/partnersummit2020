import React from 'react';
import {ThemeProvider} from 'react-native-elements';

export const themeSettings = {
  SearchBar: {
    platform: 'ios' as any,
  },
};

export const Theme: React.FunctionComponent = (props) => (
  <ThemeProvider useDark={false} theme={themeSettings}>
    {props.children}
  </ThemeProvider>
);
