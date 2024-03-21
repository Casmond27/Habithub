module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.jsx?$': require.resolve('babel-jest'), // This is for regular JS/JSX files
    '^.+\\.mjs$': 'babel-jest', // Add this line for handling .mjs files
  },
};
