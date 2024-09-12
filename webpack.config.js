const path = require('path');

// Development workflow
module.exports = {
  // Define development mode
  mode: 'development',

  //Define entry point
  entry: './src/app.ts',

  // Define webpack-dev-server behaviour
  devServer: {
    static: [
      {
        directory: path.join(__dirname),
      },
    ],
  },

  // Define output file
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/',
  },

  // Specify generated source map to wire up correctly for convenient debugging
  devtool: 'inline-source-map',

  // Define how Webpack should handle the files in src code
  module: {
    // An array of rules that tells how Webpack should handle the files
    rules: [
      {
        test: /\.tsx?$/, // specify the file types that Webpack will perform tests on
        use: 'ts-loader', // specify tool to perform test
        exclude: /node_modules/, // specify modules to be excluded
      },
    ],
  },

  // Specify which file extension to add to the imports/files it finds.
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
