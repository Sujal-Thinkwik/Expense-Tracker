import { createTheme, MantineColorsTuple } from '@mantine/core';

const primary: MantineColorsTuple = [
  '#e5f3ff',
  '#cde2ff',
  '#9ac2ff',
  '#64a0ff',
  '#3884fe',
  '#1d72fe',
  '#0063ff',
  '#0058e4',
  '#004ecd',
  '#0043b5',
];

export const theme = createTheme({
  colors: {
    primary,
  },
  primaryColor: 'primary',
  primaryShade: 7,
});