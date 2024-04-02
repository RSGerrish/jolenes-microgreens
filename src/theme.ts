import { createTheme, Button } from "@mantine/core";

export const theme = createTheme({
  components: {
    Button: Button.extend({
      defaultProps: {
        variant: "gradient",
        gradient: {from: 'pear', to: 'teal', deg: 210},
        color: 'teal'
      },
    }),
  },

  colors: {
    tan: [
      '#F8F6F0',
      '#F1EEE0',
      '#EAE5D1',
      '#E3DDC2',
      '#DCD4B3',
      '#D4CBA3',
      '#CDC394',
      '#C6BA85',
      '#BFB275',
      '#B8A966'
    ],
    'off-tan': [
      '#d4cca4',
      '#d8d1ad',
      '#ddd6b6',
      '#e1dbbf',
      '#e5e0c8',
      '#eae6d2',
      '#eeebdb',
      '#f2f0e4',
      '#f6f5ed',
      '#fbfaf6'
    ],
    brown: [
      '#f0efea',
      '#e1dfd6',
      '#d2cfc1',
      '#c3bfac',
      '#b4af98',
      '#a49e83',
      '#958e6e',
      '#867e59',
      '#776e45',
      '#685e30'
    ],
    'dark-green': [
      '#e9edeb',
      '#d2dbd8',
      '#bcc9c4',
      '#a5b7b0',
      '#8fa69d',
      '#789489',
      '#628275',
      '#4b7061',
      '#355e4e',
      '#1e4c3a'
    ],
    'light-green': [
      '#eef4ed',
      '#dde8db',
      '#ccddc9',
      '#bbd1b7',
      '#aac6a6',
      '#98ba94',
      '#87af82',
      '#76a370',
      '#65985e',
      '#548c4c'
    ],
    teal: [
      '#ecf0ed',
      '#d8e2db',
      '#c5d3c9',
      '#b1c4b7',
      '#9eb6a6',
      '#8aa794',
      '#779882',
      '#638970',
      '#507b5e',
      '#3c6c4c'
    ],
    'green-yellow': [
      '#f5feeb',
      '#ebfdd6',
      '#e1fbc2',
      '#d7faae',
      '#cef99a',
      '#c4f885',
      '#baf771',
      '#b0f55d',
      '#a6f448',
      '#9cf334'
    ],
    pear: [
      '#fbfbe9',
      '#f7f7d3',
      '#f3f3be',
      '#efefa8',
      '#eceb92',
      '#e8e77c',
      '#e4e366',
      '#e0df51',
      '#dcdb3b',
      '#d8d725'
    ],
    lemon: [
      '#fdfae8',
      '#fbf5d1',
      '#faf0ba',
      '#f8eba3',
      '#f6e68c',
      '#f4e074',
      '#f2db5d',
      '#f1d646',
      '#efd12f',
      '#edcc18'
    ],
  },

  primaryColor: 'lemon',
});
