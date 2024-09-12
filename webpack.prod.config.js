const path = require('path');

// CleanPlugin auto deletes everything in dist folder before new output is written to the folder.
// Install CleanPlugin first to use this plugin by running:
//      npm i --save-dev clean-webpack-plugin
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/app.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },

  // Do not generate source maps (debugging is only done in dev workflow)
  devtool: false,

  // Modules are applied per file level.
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },

  // Pligins are extensions added to Webpack work flow that is applied to entire project
  plugins: [new CleanPlugin.CleanWebpackPlugin()],
};
