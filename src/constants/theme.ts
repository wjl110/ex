import { DefaultTheme } from 'react-native-paper';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#FF6B00',    // 主色调是橙色
    accent: '#FFD700',
    background: '#F5F5F5',
    text: '#333333',
    placeholder: '#9E9E9E',
    surface: '#FFFFFF',
  },
};

export default theme; 