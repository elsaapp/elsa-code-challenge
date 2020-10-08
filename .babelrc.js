module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.ts', '.tsx', '.jsx', '.js', '.json'],
        alias: {
          '~': './src',
          '#assets': './assets',
        },
      },
    ],
  ],
}
